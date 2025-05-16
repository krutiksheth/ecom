import { LockOutlined } from "@mui/icons-material";
import {Box, Button, Container, Paper, TextField, Typography} from "@mui/material";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {loginSchema, LoginSchema} from "../../lib/schemas/loginSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {useLoginMutation} from "./accountApi.ts";

const LoginForm = () => {
    
    const [login, {isLoading}] = useLoginMutation();
    const location = useLocation();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm<LoginSchema>({
        mode:"onTouched",
        resolver: zodResolver(loginSchema)
    });
    
    const onSubmit = async(data: LoginSchema)=>{
        await login(data);
        navigate(location.state?.from || "/catalog");
    }
    
    return (
        <Container component={Paper} maxWidth="sm" sx={{borderRadius:3}}>
            <Box display="flex" flexDirection="column" alignItems="center" marginTop="8">
                <LockOutlined sx={{mt:3, color:"secondary.main", fontSize:40}}></LockOutlined>
                <Typography variant="h5" component="div">Sign In</Typography>
                <Box onSubmit={handleSubmit(onSubmit)} component="form" width="100%" display="flex" flexDirection="column" gap={3} marginY={3}>
                    <TextField {...register("email")} error={!!errors.email} helperText={errors.email?.message} fullWidth label="email" autoFocus></TextField>
                    <TextField {...register("password")} error={!!errors.password} helperText={errors.password?.message}  fullWidth label="password" type="password"></TextField>
                    <Button disabled={isLoading} type="submit" variant="contained">Sign In</Button>
                    <Typography sx={{textAlign: "center"}}>
                        Don't have an account?
                        <Typography component={Link} to="/register" color="primary">Sign Up</Typography>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginForm;
