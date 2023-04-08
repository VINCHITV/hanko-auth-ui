import React from 'react';
import {Route, Routes as RouteList} from "react-router-dom";
import Auth from "@/pages/Auth";
import Home from "@/pages/Home";

function Routes() {
    return (
        <RouteList>
            <Route path="/" element={<Auth/>}/>
            <Route path="/app" element={<Home/>}/>
        </RouteList>
    );
}

export default Routes;