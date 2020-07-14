import React from 'react'
import './App.css'
import { Router, Route } from "react-router-dom"
import history from "./history"
import UserProvider from "./contexts/UserProvider"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import MenuBar from "./components/menus/MenuBar"

const port = 3000

const MongoClient = require('mongodb').MongoClient
const url = process.env.MONGODB_URI || "mongodb://localhost:3000"

function App() {
  return (
    <Router history={history}>
      <UserProvider>
        <Route path="/" component={MenuBar} />
        <Route path="/profile" component={Profile} />
      </UserProvider>
      <Route path="/" exact component={Home} />
    </Router>
  )
}

export default App
