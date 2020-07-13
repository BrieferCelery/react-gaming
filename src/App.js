import React from 'react'
import './App.css'

const express = require("express")
const app = express()
const port = 3000

const MongoClient = require('mongodb').MongoClient
const url = process.env.MONGODB_URI || "mongodb://localhost:3000"

function App() {
  return (
    <div>
    </div>
  )
}

export default App
