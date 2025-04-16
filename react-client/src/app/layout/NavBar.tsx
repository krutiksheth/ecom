import {AppBar, IconButton, List, ListItem, Toolbar, Typography, Badge} from "@mui/material";
import {DarkMode, LightMode, ShoppingCart} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const midLinks = [
    { title: "catalog", path: "/catalog" },
    { title: "about", path: "/about" },
    { title: "contact", path: "/contact" },
];

const rightLinks = [
    { title: "login", path: "/login" },
    { title: "register", path: "/register" },
];

type Props = {
    darkMode: boolean;
    toggleDarkMode:()=>void
}

const NavBar = ({ darkMode, toggleDarkMode}: Props) => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography component={NavLink} to="/" variant="h6">Ecom</Typography>
                <IconButton onClick={toggleDarkMode}>
                    {darkMode? <DarkMode />:<LightMode sx={{color:"yellow"}}/>}
                </IconButton>
                <List sx={{display: "flex"}}>
                    {midLinks.map(({ title, path}) => (
                        <ListItem sx={{color:'inherit', typography:'h6'}} component={NavLink} to={path} key={path}>{title.toUpperCase()}</ListItem>
                    ))}
                </List>
                <IconButton  size="large" sx={{color:'inherit'}} >
                    <Badge badgeContent="4" color="secondary">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
                <List sx={{display: "flex"}}>
                    {rightLinks.map(({ title, path}) => (
                        <ListItem sx={{color:'inherit', typography:'h6'}} component={NavLink} to={path} key={path}>{title.toUpperCase()}</ListItem>
                    ))}
                </List>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
