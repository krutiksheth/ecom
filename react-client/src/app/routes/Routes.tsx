import {createBrowserRouter} from "react-router-dom";
import App from "../layout/App.tsx";
import HomePage from "../../features/home/HomePage.tsx";
import Catalog from "../../features/catalog/Catalog.tsx";
import ProductDetails from "../../features/catalog/ProductDetails.tsx";
import AboutPage from "../../features/about/AboutPage.tsx";
import ContactPage from "../../features/contact/ContactPage.tsx";

export const routes = createBrowserRouter([
    {
        path: "/", // route route
        element:<App />, // specify app component here
        children: [
            { path: "", element: <HomePage /> }, // specify home component
            { path: "/catalog", element: <Catalog /> }, // specify catalog component
            { path: "/catalog/:id", element: <ProductDetails /> }, // specify product details component
            { path: "/about", element: <AboutPage /> }, // specify about component 
            { path: "/contact", element: <ContactPage /> }, // specify contact component 
        ]
    }
])
