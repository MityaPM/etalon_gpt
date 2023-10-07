import React, { useEffect, useState } from "react"

//Css
import "./Article.css"
import axios from "axios"

function Article(props) {
  const token = localStorage.getItem("etalonGptToken")
  const [isLoading, setIsLoading] = useState(false)
  const [reqCount, setReqCount] = useState(0)
  const [articleBody, setArticleBody] = useState({
    id: props.article.id,
    title: props.article.title,
    title_eng: props.article.title_eng,
    text: props.article.text,
    text_eng: props.article.text_eng,
    category: props.article.category,
    category_eng: props.article.category_eng,
    description: props.article.description,
    description_eng: props.article.description_eng,
    adunit_id: props.article.adunit_id
  })

  useEffect(() => {
    if (reqCount === 0) {
      return
    }

    console.log("Fetch!")

    axios
      .put(
        `http://localhost:3300/api/admin/articles/${articleBody.id}`,
        {
          data: articleBody
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(result => {
        alert("Обновления сохранены!")
        setIsLoading(false)
      })
      .catch(error => {
        alert("Ошибка!")
        setIsLoading(false)
      })
  }, [reqCount])

  function buttonHandler(e) {
    e.preventDefault()
    setIsLoading(true)
    setReqCount(reqCount + 1)
  }

  function inputHandler(e) {
    switch (e.target.name) {
      case "title":
        setArticleBody({
          ...articleBody,
          title: e.target.value
        })
        break
      case "title_eng":
        setArticleBody({
          ...articleBody,
          title_eng: e.target.value
        })
        break
      case "category":
        setArticleBody({
          ...articleBody,
          category: e.target.value
        })
        break
      case "category_eng":
        setArticleBody({
          ...articleBody,
          category_eng: e.target.value
        })
        break
      case "description":
        setArticleBody({
          ...articleBody,
          description: e.target.value
        })
        break
      case "description_eng":
        setArticleBody({
          ...articleBody,
          description_eng: e.target.value
        })
        break
      case "ad":
        setArticleBody({
          ...articleBody,
          adunit_id: e.target.value
        })
        break
      case "text":
        setArticleBody({
          ...articleBody,
          text: e.target.value
        })
        break
      case "text_eng":
        setArticleBody({
          ...articleBody,
          text_eng: e.target.value
        })
        break
    }
  }

  return (
    <div className="article" key={articleBody.id}>
      <h3 className="id">ID: {articleBody.id}</h3>
      <div className="titles">
        <label htmlFor="title">РУС Заголвоок</label>
        <input onChange={inputHandler} type="text" className="title" name="title" value={articleBody.title} />
        <label htmlFor="title_eng">ENG Заголовок</label>
        <input onChange={inputHandler} type="text" className="title" name="title_eng" value={articleBody.title_eng} />
      </div>
      <div className="category">
        <label htmlFor="category">Категория</label>
        <input onChange={inputHandler} type="text" name="category" value={articleBody.category} />
        <label htmlFor="category_eng">Категория ENG</label>
        <input onChange={inputHandler} type="text" name="category_eng" value={articleBody.category_eng} />
      </div>
      <div className="descriptions">
        <label htmlFor="description">Описание</label>
        <input onChange={inputHandler} type="text" name="description" value={articleBody.description} />
        <label htmlFor="description_eng">Описание ENG</label>
        <input onChange={inputHandler} type="text" name="description_eng" value={articleBody.description_eng} />
      </div>
      <div className="ad">
        <label htmlFor="ad">Рекламный ID</label>
        <input onChange={inputHandler} type="text" name="ad" value={articleBody.adunit_id} />
      </div>
      <details>
        <summary>Текст статьи</summary>
        <h4>Рус:</h4>
        <textarea onChange={inputHandler} type="text" value={articleBody.text} name="text"></textarea>
        <h4>Англ:</h4>
        <textarea onChange={inputHandler} type="text" value={articleBody.text_eng} name="text_eng"></textarea>
      </details>
      <button type="submit" onClick={buttonHandler}>
        {isLoading ? "Сохраняем..." : "Сохранить"}
      </button>
    </div>
  )
}

export default Article
