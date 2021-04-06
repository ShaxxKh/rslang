/* eslint-disable */
import React from 'react'
import { Context } from '../../context'

export default function Card({ data, progress }) {
  const { setSingleWordMode, learnWordsCount } = React.useContext(Context)

  const clickHandler = () => {
    setSingleWordMode(true)
  }
  return (
    <div className="learning__bot-col">
      <div className="learning__bot-col--card card-container">
        <h3>{data.title}</h3>
        <p>{data.subtitle}</p>
        <button
          className="button"
          type="button"
          onClick={clickHandler}
        >
          Начать!
           </button>
        {progress &&
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${learnWordsCount / 0.1}%` }}
              aria-valuemin="0"
              aria-valuemax="10"
              aria-valuenow={learnWordsCount}
            />
          </div>
        }
      </div>
    </div>
  )
}
