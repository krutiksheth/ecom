import {useRegisterMutation} from "./accountApi.ts";
import {Box, Button, Container, Paper, TextField, Typography} from "@mui/material";
import {LockOutlined} from "@mui/icons-material";
import {useForm} from "react-hook-form";
import {registerSchema, RegisterSchema} from "../../lib/schemas/registerSchema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Link} from "react-router-dom";

const RegisterForm = () => {
    const {register, formState: {isLoading, errors, isValid}, handleSubmit, setError} = useForm<RegisterSchema>({
        mode: "onTouched",
        resolver: zodResolver(registerSchema)
    })
    const [registerUser] = useRegisterMutation();

    const onSubmit = async (data: RegisterSchema) => {
        try{
            await registerUser(data).unwrap();
        }catch(error){
            console.log(error);
            const apiError = error as {message: string};
            if(apiError.message && typeof apiError.message === "string"){
                const errorArray = apiError.message.split(",");
                errorArray.forEach(error => {
                    if(error.includes("Password")){
                        setError("password", {message:error});
                    }
                    else if(error.includes("Email")){
                        setError("email", {message:error});
                    }
                })
            }
        }
    }

    return (
        <Container component={Paper} maxWidth="sm" sx={{borderRadius: 3}}>
            <Box display="flex" flexDirection="column" alignItems="center" marginTop="8">
                <LockOutlined sx={{mt: 3, color: "secondary.main", fontSize: 40}}></LockOutlined>
                <Typography variant="h5" component="div">Register</Typography>
                <Box onSubmit={handleSubmit(onSubmit)} component="form" width="100%" display="flex"
                     flexDirection="column" gap={3} marginY={3}>
                    <TextField {...register("email")} error={!!errors.email} helperText={errors.email?.message}
                               fullWidth label="email" autoFocus></TextField>
                    <TextField {...register("password")} error={!!errors.password} helperText={errors.password?.message}
                               fullWidth label="password" type="password"></TextField>
                    <Button disabled={isLoading || !isValid} type="submit" variant="contained">Register</Button>
                    <Typography sx={{textAlign: "center"}}>
                        Already have an account?
                        <Typography component={Link} to="/login" color="primary">Sign in here</Typography>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterForm;
