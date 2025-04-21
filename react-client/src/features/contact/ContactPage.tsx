import {useDispatch, useSelector} from "react-redux";
import {Button, ButtonGroup, Typography} from "@mui/material";

const ContactPage = () => {

    const data = useSelector((state:any) => state.data)
    const dispatch = useDispatch();
    
    return (
        <div>
            <Typography variant="body1">
                The data is {data}
            </Typography>
            <ButtonGroup variant="contained">
              <Button color="error" onClick={()=>dispatch({ type: "DECREMENT"})}>Decrement</Button>  
              <Button color="success" onClick={()=>dispatch({ type: "INCREMENT"})}>Increment</Button>  
            </ButtonGroup>
        </div>
    );
};

export default ContactPage;
