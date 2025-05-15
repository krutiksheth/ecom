import {createBrowserRouter, Navigate} from "react-router-dom";
import App from "../layout/App.tsx";
import HomePage from "../../features/home/HomePage.tsx";
import Catalog from "../../features/catalog/Catalog.tsx";
import ProductDetails from "../../features/catalog/ProductDetails.tsx";
import AboutPage from "../../features/about/AboutPage.tsx";
import ContactPage from "../../features/contact/ContactPage.tsx";
import ServerError from "../errors/ServerError.tsx";
import NotFound from "../errors/NotFound.tsx";
import BasketPage from "../../features/basket/BasketPage.tsx";
import CheckoutPage from "../../features/checkout/CheckoutPage.tsx";
import LoginForm from "../../features/account/LoginForm.tsx";

export const router = createBrowserRouter([
    {
        path: "/", // route route
        element:<App />, // specify app component here
        children: [
            { path: "", element: <HomePage /> }, // specify home component
            { path: "catalog", element: <Catalog /> }, // specify catalog component
            { path: "catalog/:id", element: <ProductDetails /> }, // specify product details component
            { path: "about", element: <AboutPage /> }, // specify about component 
            { path: "contact", element: <ContactPage /> }, // specify contact component 
            { path: "basket", element: <BasketPage /> }, // specify contact component 
            { path: "checkout", element: <CheckoutPage /> }, // specify contact component 
            { path: "login", element: <LoginForm /> }, // specify contact component 
            { path: "server-error", element: <ServerError /> }, // specify server-error component 
            { path: "not-found", element: <NotFound /> }, // specify not-found component 
            { path: "*", element: <Navigate replace to="/not-found"></Navigate>}, // specify wildcard 
        ]
    }
])
