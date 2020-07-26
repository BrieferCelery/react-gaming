import React, {useState, useEffect} from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Search from './Search'

import './styles/App.css'

import HomePage from './HomePage'
import CookieBar from './CookieBar'

import Navbar from "./Navbar"
import Auth from "./Auth"

export default function App() {

    return (
        <div className="App-header">
            <CookieBar/>
            <Auth />
            <Navbar/>
            <Search/>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}
