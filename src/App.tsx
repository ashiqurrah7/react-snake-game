import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Board } from './Board/Board'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Board />
    </div>
  )
}

export default App
