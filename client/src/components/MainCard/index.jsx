import React from 'react'

export default function MainCard() {
  return (
    <div className="learning__main card-container">
      <h3 className="learning__main-left">Сегодня изучено</h3>
      <div className="learning__main-right">
        <p>
          Изучено:
            {' '}
          <span>5</span>
          {' '}
            из
            {' '}
          <span>20</span>
          {' '}
            слов
          </p>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `25%` }}
          />
        </div>
      </div>
    </div>
  )
}
