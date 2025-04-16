import {useState} from "react";
import {Box, Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import NavBar from "./NavBar.tsx";
import { Outlet } from "react-router-dom";

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
    
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <NavBar darkMode={darkMode} toggleDarkMode={()=> setDarkMode(!darkMode)}></NavBar>
                <Box sx={{minHeight: '100vh', 
                    backgroundColor: (darkMode ?  '#121212':'#eaeaea' ), py:6}}>
                    <Container maxWidth="xl" sx={{mt:8}}>
                       <Outlet />
                    </Container>
                </Box>
            </ThemeProvider>
        </>
    )
}

export default App
