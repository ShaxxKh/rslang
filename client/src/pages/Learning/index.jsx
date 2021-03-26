import React from 'react'
import './Learning.scss'
import { Context } from '../../context'

export default function Learning() {
  const { words } = React.useContext(Context)
  const word = words[0]
  console.log(word)
  return (
    <div className="container-fluid">
      <div className="learning__greeting">
        <h1>
          <span>Привет!</span>
          {' '}
          Готов приступать к обучению?
        </h1>
        <p>
          На этой странице вы можете следить за своим прогрессом
          и выбирать желаемый набор слов для изучения, например, “Новые слова” ,
          “Повторить слова” или “Сложные слова” . Удачи!
        </p>
      </div>
    </div>
  )
}
