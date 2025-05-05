import {useFetchBasketQuery} from "./basketApi.ts";
import {Typography} from "@mui/material";

const BasketPage = () => {

    const {data: basket, isLoading} = useFetchBasketQuery();
    
    if(isLoading) return <Typography>Loading...</Typography>;
    
    if(!basket) return <Typography variant="h3">Your basket is empty</Typography>;
    
    return (
        <div>
            {basket.basketId}
        </div>
    );
};

export default BasketPage;
