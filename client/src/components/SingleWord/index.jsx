import React from 'react'
import './SingleWord.scss'

import volUp from '../../assets/icons/volume_up.svg'
import volOff from '../../assets/icons/volume_off.svg'
import translate from '../../assets/icons/translate.svg'
import close from '../../assets/icons/close.svg'
import { Context } from '../../context'

export default function SingleWord() {
  const { words, setSingleWordMode } = React.useContext(Context)
  const word = words[0]

  console.log(word)

  const closeHandler = () => {
    setSingleWordMode(false)
  }

  return (
    <div className="single-word container-fluid">
      <div className="single-word__settings">
        <div
          className="single-word__settings-main"
          role="button"
        >
          <div>
            <img src={volUp} alt="" />
          </div>
          <div>
            <img src={translate} alt="" />
          </div>
        </div>
        <div
          className="single-word__settings-close"
          role="button"
          onClick={closeHandler}
        >
          <img src={close} alt="" />
        </div>
      </div>
      {word &&
        <div className="single-word__main">
          <div className="single-word__main--progress progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `25%` }}
            />
          </div>
          <div className="single-word__main--card card-container">
            <img src={`https://sashan.herokuapp.com/${word.image}`} alt="" />
          </div>
        </div>}
    </div>
  )
}
