import {AppBar, Toolbar, Typography} from "@mui/material";

const NavBar = () => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6">Ecom</Typography>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
