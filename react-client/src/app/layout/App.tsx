import {Box, Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import NavBar from "./NavBar.tsx";
import {Outlet, ScrollRestoration} from "react-router-dom";
import {useAppSelector} from "../store/store.ts";

function App() {
    
    const { darkMode } = useAppSelector(state=>state.ui);
    
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
                <ScrollRestoration/>
                <CssBaseline />
                <NavBar ></NavBar>
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
