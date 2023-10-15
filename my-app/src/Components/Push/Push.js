import React, { useEffect, useState } from "react"
import axios from "axios"

//css
import "./Push.css"

// Components
import PushHistory from "../PushHistory/PushHistory"

function Push() {
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [ids, setIds] = useState("")
  const [reqCount, setReqCount] = useState(0)
  const [historyUpdate, setHistoryUpdate] = useState(0)

  function buttonHandler(e) {
    e.preventDefault()

    if (isLoading) {
      return
    }

    let sure

    if (title === "") {
      alert("Заполни хотя бы заголовок пуша!")
      return
    }

    if (ids === "") {
      sure = window.confirm("Ты уверен, что хочешь отправить пуш на всех?")
    }

    if (ids === "" && !sure) {
      return
    }

    setReqCount(reqCount + 1)
  }

  useEffect(() => {
    if (reqCount === 0) {
      return
    }

    setIsLoading(true)

    axios
      .post("/api/admin/sendPush", {
        idsForPush: ids ? idsArr(ids) : [],
        pushTitle: title.trim(),
        pushBody: body.trim()
      })
      .then(result => {
        setIsLoading(false)
        setHistoryUpdate(historyUpdate + 1)
        alert("Отправка пушей анчалась успешно, если пуш был на всех, то это займёт какое-то время")
      })
      .catch(error => {
        setIsLoading(false)
        console.log(error)
        alert("Ошибка!")
      })
  }, [reqCount])

  function idsArr(idsString) {
    return idsString.replace(/\s/g, "").split(",")
  }

  function idsAreaHandler(e) {
    if (!/[^0-9 ,]/.test(e.target.value)) {
      setIds(e.target.value)
      return
    }

    return
  }

  return (
    <div className="container">
      <h1>Коля, подумай дважды, прежде, чем заниматься этим</h1>
      <div className="input-box">
        <div className="input-description">Заголовок</div>
        <input
          type="text"
          name="pusgTitle"
          value={title}
          onChange={e => {
            setTitle(e.target.value)
          }}
        />
      </div>
      <div className="input-box">
        <div className="input-description">Тело</div>
        <input type="text" name="pushBody" value={body} onChange={e => setBody(e.target.value)} />
      </div>
      <div className="input-box">
        <div className="input-description">IDs </div>
        <textarea onChange={idsAreaHandler} value={ids} name="ids" placeholder="Укажи список id's через запятую 111,222,333. Если оставить поле пустым, пуш будет отправлен на всех!"></textarea>
      </div>
      <button type="submit" onClick={buttonHandler}>
        {isLoading ? "Отправляем..." : "Отправить"}
      </button>
      <PushHistory historyUpdate={historyUpdate} />
    </div>
  )
}

export default Push
