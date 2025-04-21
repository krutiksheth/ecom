import {useDispatch, useSelector} from "react-redux";
import {Button, ButtonGroup, Typography} from "@mui/material";
import {decrement, increment} from "./counterReducer.ts";

const ContactPage = () => {

    const data = useSelector((state:any) => state.data)
    const dispatch = useDispatch();
    
    return (
        <div>
            <Typography variant="body1">
                The data is {data}
            </Typography>
            <ButtonGroup variant="contained">
              <Button color="error" onClick={()=> dispatch(decrement())}>Decrement</Button>  
              <Button color="success" onClick={()=> dispatch(increment())}>Increment</Button>  
            </ButtonGroup>
        </div>
    );
};

export default ContactPage;
