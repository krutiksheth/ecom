import {Button, ButtonGroup, Typography} from "@mui/material";
import {decrement, increment} from "./counterReducer.ts";
import {useAppDispatch, useAppSelector} from "../../app/store/store.ts";
const ContactPage = () => {

    const data = useAppSelector((state) => state.counter.data);
    const dispatch = useAppDispatch();
    
    return (
        <div>
            <Typography variant="body1">
                The data is {data}
            </Typography>
            <ButtonGroup variant="contained">
              <Button color="error" onClick={()=> dispatch(decrement(1))}>Decrement</Button>  
              <Button color="success" onClick={()=> dispatch(increment(1))}>Increment</Button>  
            </ButtonGroup>
        </div>
    );
};

export default ContactPage;
