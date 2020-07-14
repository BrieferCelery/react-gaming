import React from 'react'
import './App.css'

const port = 3000

const MongoClient = require('mongodb').MongoClient
const url = process.env.MONGODB_URI || "mongodb://localhost:3000"

function App() {
  return (
    <div>
      <h1>Testing!</h1>
    </div>
  )
}

export default App
