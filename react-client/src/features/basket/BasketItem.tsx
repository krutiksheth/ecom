import {item} from "../../app/models/basket.ts";
import {Box, Grid2, IconButton, Paper, Typography} from "@mui/material";
import {currencyFormat} from "../../lib/util.ts";
import {Add, Close, Remove} from "@mui/icons-material";

type Props ={
    item: item
}
const BasketItem = ({item}: Props) => {
    return (
        <Paper sx={{height:140, borderRadius: 4, display:"flex" ,justifyContent: "space-between", alignItems: "center", mb:2}}>
            <Box display="flex" alignItems="center">
                <Box 
                    component="img" 
                    src={item.pictureUrl} 
                    alt={item.name} 
                    sx={{
                        width:100, 
                        height:100,
                        borderRadius: "4px",
                        mr: 8,
                        ml:4,
                        objectFit:"cover"}} />
                <Box display="flex" flexDirection="column" gap={1}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Box display="flex" alignItems="center" gap={3}>
                        <Typography sx={{fontSize:"1.1rem"}}>{currencyFormat(item.price)} x {item.quantity}</Typography>
                        <Typography sx={{fontSize:"1.1rem"}}>${(item.price/100)*item.quantity}</Typography>
                    </Box>
                    <Grid2 container spacing={1} alignItems="center">
                        <IconButton color="error" size="small" sx={{border:1, borderRadius:1, minWidth:0}}>
                            <Remove></Remove>
                        </IconButton>
                        <Typography variant="h6">{item.quantity}</Typography>
                        <IconButton color="success" size="small" sx={{border:1, borderRadius:1, minWidth:0}}>
                            <Add></Add>
                        </IconButton>
                    </Grid2>
                </Box>
            </Box>
            <IconButton color="error" size="small" 
                        sx={{
                            mr:1,
                            mt:1,
                            border:1, 
                            borderRadius:1, 
                            minWidth:0, 
                            alignSelf:"start"}}>
                <Close></Close>
            </IconButton>
        </Paper>
    );
};

export default BasketItem;
