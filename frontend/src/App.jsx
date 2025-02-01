import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import School from './pages/School'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <School/>
    </>
  )
}

export default App
