import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { CurrencyFilter } from '../currencyFilter/CurrencyFilter';

// The Outlet references all the sub-routes defines in App.jsx
export default function Root() {
    return (
        <>
            <Header/>
            <CurrencyFilter />
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </>
    )
}