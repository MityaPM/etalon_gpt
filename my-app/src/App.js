import React, { useState } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import axios from "axios"

//Components
import Chat from "./Components/Chat/Chat"
import Admin from "./Components/Admin/Admin"
import Push from "./Components/Push/Push"

// Global auth
const token = localStorage.getItem("etalonGptToken")
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
axios.defaults.baseURL = "https://dev.alobanov11.ru"
// axios.defaults.baseURL = "http://localhost:3300"

function App() {
  const [logedIn, setLogedIn] = useState(Boolean(token))

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/admin" element={<Admin token={token} />} />
        <Route path="/push" element={logedIn ? <Push token={token} /> : "Forbidden"} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
