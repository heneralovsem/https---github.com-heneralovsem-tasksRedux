import React, {useContext} from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes } from "../router";




const AppRouter =  () => {
    
    return (
        <div>
            <Routes>
                {publicRoutes.map(route => <Route path={route.path} element={route.component} key={route.path}/>)}
            </Routes>
        </div>
    )
}
export default AppRouter;