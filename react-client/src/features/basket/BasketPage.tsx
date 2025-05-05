import {useFetchBasketQuery} from "./basketApi.ts";
import {Grid2, Typography} from "@mui/material";
import BasketItem from "./BasketItem.tsx";

const BasketPage = () => {

    const {data: basket, isLoading} = useFetchBasketQuery();
    
    if(isLoading) return <Typography>Loading...</Typography>;
    
    if(!basket) return <Typography variant="h3">Your basket is empty</Typography>;
    
    return (
        <Grid2 spacing={2} container>
           <Grid2 size={8}>
               {basket.items.map((item) => (
                   <BasketItem 
                       item={item} 
                       key={item.productId}></BasketItem>
               ))}
           </Grid2>
        </Grid2>
    );
};

export default BasketPage;
