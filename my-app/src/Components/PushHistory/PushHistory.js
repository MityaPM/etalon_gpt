import React, { useEffect, useState } from "react"
import axios from "axios"

//css
import "./PushHistory.css"

function PushHistory(props) {
  const [failed, setIsFailed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [history, setHistory] = useState([])

  useEffect(() => {
    setIsFailed(false)
    axios
      .get("/api/admin/getPushHistory")
      .then(result => {
        setHistory(result.data)
        setIsLoading(false)
      })
      .catch(error => {
        setIsFailed(true)
        console.log(error)
      })
  }, [props.historyUpdate])

  if (failed) {
    return <h2>Ошибка!</h2>
  }

  if (isLoading) {
    return <div>Загружаем...</div>
  }

  return (
    <>
      <h1>История и статусы</h1>
      <div className="history">
        <div className="hat">
          <span className="id">ID рассылки</span>
          <span className="title">Заголовок</span>
          <span className="body">Тело</span>
          <span className="created_at">Дата создания</span>
          <span className="updated_at">Дата звершения</span>
          <span className="success">Успешно</span>
          <span className="fails">Failed</span>
          <span className="status">Статус</span>
        </div>
        {history.map(story => {
          return (
            <div className="story" key={story.id}>
              <span className="id">{story.id}</span>
              <span className="title">{story.title}</span>
              <span className="body">{story.body}</span>
              <span className="created_at">{story.created_at}</span>
              <span className="updated_at">{story.updated_at}</span>
              <span className="success">{story.success_count}</span>
              <span className="fails">{story.failure_count}</span>
              <span className={"status " + story.status}>{story.status}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default PushHistory
