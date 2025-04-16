import {Product} from "../../app/models/product.ts";
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router-dom";

type Props = {
    product: Product;
}

const ProductCard = ({product}: Props) => {
    
    return (
        <Card elevation={3} sx={{width: 280, borderRadius: 2, display: "flex", flexDirection:"column" ,justifyContent: "space-between"}}>
            <CardMedia 
                sx={{height: "240px", backgroundSize: "cover"}} 
                image={product.pictureUrl} 
                title={product.name}/>
            <CardContent>
                <Typography variant="subtitle2" gutterBottom sx={{textTransform:"uppercase"}}>{product.name}</Typography>
                <Typography variant="h6" gutterBottom sx={{color:'secondary.main'}}>
                    ${(product.price / 100).toFixed(2)}
                </Typography>
            </CardContent>
            <CardActions sx={{justifyContent: "space-between"}}>
                <Button variant="text">Add to cart</Button>   
                <Button component={Link} to={`/catalog/${product.id}`} variant="text">View</Button>   
            </CardActions>
        </Card>
    );
};

export default ProductCard;
