import {Product} from "../../app/models/product.ts";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAddBasketItemMutation} from "../basket/basketApi.ts";
import {currencyFormat} from "../../lib/util.ts";

type Props = {
    product: Product;
}

const ProductCard = ({product}: Props) => {

    const [addBasketItem, {isLoading}] = useAddBasketItemMutation();

    return (
        <Card elevation={3} sx={{
            width: 280,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
        }}>
            <CardMedia
                sx={{height: "240px", backgroundSize: "cover"}}
                image={product.pictureUrl}
                title={product.name}/>
            <CardContent>
                <Typography variant="subtitle2" gutterBottom
                            sx={{textTransform: "uppercase"}}>{product.name}</Typography>
                <Typography variant="h6" gutterBottom sx={{color: 'secondary.main'}}>
                    {currencyFormat(product.price)}
                </Typography>
            </CardContent>
            <CardActions sx={{justifyContent: "space-between"}}>
                <Button disabled={isLoading} variant="text" onClick={() =>
                    addBasketItem({product: product, quantity: 1})}>Add to cart</Button>
                <Button component={Link} to={`/catalog/${product.id}`} variant="text">View</Button>
            </CardActions>
        </Card>
    );
};

export default ProductCard;
