import {Item as item} from "../../app/models/basket.ts";
import {Box, Grid2, IconButton, Paper, Typography} from "@mui/material";
import {currencyFormat} from "../../lib/util.ts";
import {Add, Close, Remove} from "@mui/icons-material";
import {useAddBasketItemMutation, useRemoveBasketItemMutation} from "./basketApi.ts";

type Props = {
    item: item
}
const BasketItem = ({item}: Props) => {
    
    const [removeBasketItem] = useRemoveBasketItemMutation();
    const [addBasketItem] = useAddBasketItemMutation();
    
    return (
        <Paper sx={{
            height: 140,
            borderRadius: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2
        }}>
            <Box display="flex" alignItems="center">
                <Box
                    component="img"
                    src={item.pictureUrl}
                    alt={item.name}
                    sx={{
                        width: 100,
                        height: 100,
                        borderRadius: "4px",
                        mr: 8,
                        ml: 4,
                        objectFit: "cover"
                    }}/>
                <Box display="flex" flexDirection="column" gap={1}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Box display="flex" alignItems="center" gap={3}>
                        <Typography
                            sx={{fontSize: "1.1rem"}}>{currencyFormat(item.price)} x {item.quantity}</Typography>
                        <Typography sx={{fontSize: "1.1rem"}}>${(item.price / 100) * item.quantity}</Typography>
                    </Box>
                    <Grid2 container spacing={1} alignItems="center">
                        <IconButton onClick={() => removeBasketItem({
                            productId: item.productId,
                            quantity: 1,
                        })} color="error" size="small" sx={{border: 1, borderRadius: 1, minWidth: 0}}>
                            <Remove></Remove>
                        </IconButton>
                        <Typography variant="h6">{item.quantity}</Typography>
                        <IconButton onClick={() => addBasketItem({
                            product: item,
                            quantity: 1,
                        })} color="success" size="small" sx={{border: 1, borderRadius: 1, minWidth: 0}}>
                            <Add></Add>
                        </IconButton>
                    </Grid2>
                </Box>
            </Box>
            <IconButton
                onClick={() => removeBasketItem({
                    productId: item.productId,
                    quantity: item.quantity,
                })}
                color="error"
                size="small"
                sx={{
                    mr: 1,
                    mt: 1,
                    border: 1,
                    borderRadius: 1,
                    minWidth: 0,
                    alignSelf: "start"
                }}>
                <Close></Close>
            </IconButton>
        </Paper>
    );
};

export default BasketItem;
