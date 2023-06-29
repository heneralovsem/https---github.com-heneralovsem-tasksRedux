import { Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CompletedPage from "../pages/CompletedPage";

export const publicRoutes = [
    {path: '/home', component: <HomePage/>},
    {path: '/completed', component: <CompletedPage/>},
    {path: '/', component: <Navigate to= "home" replace/> },
    

    
]