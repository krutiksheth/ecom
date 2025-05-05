import {AppBar, IconButton, List, ListItem, Toolbar, Typography, Badge, Box, LinearProgress} from "@mui/material";
import {DarkMode, LightMode, ShoppingCart} from "@mui/icons-material";
import {Link, NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store/store.ts";
import {setDarkMode} from "./uiSlice.ts";

const midLinks = [
    { title: "catalog", path: "/catalog" },
    { title: "about", path: "/about" },
    { title: "contact", path: "/contact" },
];

const rightLinks = [
    { title: "login", path: "/login" },
    { title: "register", path: "/register" },
];

const navStyles= {
    color:'inherit',
    typography:'h6',
    textDecoration:"none",
    "&:hover":{
        color:"grey.500"
    },
    "&.active":{
        color:"#baecf9"
    }
}

const NavBar = () => {
    
    const { isLoading, darkMode } = useAppSelector(state=>state.ui);
    const dispatch = useAppDispatch();
    
    return (
        <AppBar position="fixed">
            <Toolbar sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <Box sx={{display:"flex", alignItems:"center"}}>
                    <Typography sx={navStyles} component={NavLink} to="/" variant="h6">Ecom</Typography>
                    <IconButton onClick={()=> dispatch(setDarkMode())}>
                        {darkMode? <DarkMode />:<LightMode sx={{color:"yellow"}}/>}
                    </IconButton>
                </Box>

                <List sx={{display: "flex"}}>
                    {midLinks.map(({ title, path}) => (
                        <ListItem sx={navStyles} component={NavLink} to={path} key={path}>{title.toUpperCase()}</ListItem>
                    ))}
                </List>
                <Box sx={{display:"flex", alignItems:"center"}}>
                    <IconButton component={Link} to="/basket" size="large" sx={{color:'inherit'}} >
                        <Badge badgeContent="4" color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{display: "flex"}}>
                        {rightLinks.map(({ title, path}) => (
                            <ListItem sx={navStyles} component={NavLink} to={path} key={path}>{title.toUpperCase()}</ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
            { isLoading && (<Box sx={{ width:"100%" }}><LinearProgress color="secondary" /></Box>)}
        </AppBar>
    
    );
};

export default NavBar;
