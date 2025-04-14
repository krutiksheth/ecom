import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import {DarkMode, LightMode} from "@mui/icons-material";

type Props = {
    darkMode: boolean;
    toggleDarkMode:()=>void
}

const NavBar = ({ darkMode, toggleDarkMode}: Props) => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6">Ecom</Typography>
                <IconButton onClick={toggleDarkMode}>
                    {darkMode? <DarkMode />:<LightMode sx={{color:"yellow"}}/>}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
