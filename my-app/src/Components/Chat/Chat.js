import React, { useState, useEffect } from "react"
import axios from "axios"
import "./Chat.css"

const Chat = () => {
  // const token = localStorage.getItem("etalonGptToken")
  const [isLoading, setIsLoading] = useState(false)
  const [req, setReq] = useState(0)
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState("")

  const handleMessageSubmit = event => {
    event.preventDefault()
    if (isLoading) {
      return
    }

    if (inputText.trim() !== "") {
      setMessages([...messages, { role: "user", content: `${inputText}` }])
      setInputText("")
      setReq(req + 1)
    }
  }

  useEffect(() => {
    const scrollToBottom = () => {
      const chatContainer = document.getElementById("chat-container")
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (req === 0) {
      console.log("rendered")
      return
    }

    setIsLoading(true)

    axios
      .post("/api/etalongpt", { messages: messages })
      .then(result => {
        setIsLoading(false)
        setMessages([...messages, result.data.answer])
      })
      .catch(err => {
        setIsLoading(false)
        console.log(err)
        alert(err)
      })
  }, [req])

  return (
    <div className="chat">
      <div id="chat-container" className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={message.role === "user" ? "message" : "message-bot"}>
            {message.content}
          </div>
        ))}
      </div>
      <form className="message-form" onSubmit={handleMessageSubmit}>
        <input type="text" value={inputText} onChange={e => setInputText(e.target.value)} placeholder="Введите сообщение" />
        <button type="submit">{isLoading ? "Печатает" : "Отправить"}</button>
      </form>
    </div>
  )
}

export default Chat
