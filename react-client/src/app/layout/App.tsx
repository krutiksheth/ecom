import {useEffect, useState} from "react";
import {Product} from "../models/product.ts";
import Catalog from "../../features/catalog/Catalog.tsx";
import {Box, Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import NavBar from "./NavBar.tsx";

function App() {
    const [darkMode, setDarkMode] = useState(true);
    const palleteType = darkMode ? 'dark' : 'light';
    const darkTheme = createTheme({
        palette: {
            mode: palleteType,
            background: {
                default:(palleteType === "dark") ? "#eaeaea" : "#121212",
            }
        },
    });
    
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch("https://localhost:5001/api/products")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.log(err));
    }, [])

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <NavBar darkMode={darkMode} toggleDarkMode={()=> setDarkMode(!darkMode)}></NavBar>
                <Box sx={{minHeight: '100vh', 
                    backgroundColor: (darkMode ?  '#121212':'#eaeaea' ), py:6}}>
                    <Container maxWidth="xl" sx={{mt:8}}>
                        <Catalog products={products}/>
                    </Container>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default App
