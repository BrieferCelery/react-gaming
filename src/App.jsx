import React, { useState } from "react"
import ReactDOM from 'react-dom'
import './App.css'
import GoogleLogin from "react-google-login"
import HomePage from './HomePage'
import Search from './Search'

export default function App() {
    return (
        <div class="App-header">
            Welcome to REACT-GAMING!
            <HomePage/>
        </div>
    )
}
