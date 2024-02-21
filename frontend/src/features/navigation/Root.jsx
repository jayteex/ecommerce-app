import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { CurrencyFilter } from '../currencyFilter/CurrencyFilter';


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