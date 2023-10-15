import React, { useEffect, useState } from "react"
import axios from "axios"

// Components
import Article from "../Article/Article"

function Admin(props) {
  const [loggedIn, setLoggedIn] = useState(Boolean(props.token))
  const [articles, setArticles] = useState([])

  useEffect(() => {
    if (!loggedIn) {
      return
    }

    axios
      .get("/api/admin/articles")
      .then(res => setArticles(res.data))
      .catch(err => alert("Ошибка!"))
  }, [])

  if (!loggedIn) {
    return (
      <>
        <h1>Forbidden!</h1>
      </>
    )
  }

  return (
    <div className="container">
      <h1>Hello Admin!</h1>
      {articles.map(article => {
        return <Article article={article} />
      })}
    </div>
  )
}

export default Admin
