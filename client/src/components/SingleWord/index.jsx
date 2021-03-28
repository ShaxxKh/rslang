import React from 'react'
import './SingleWord.scss'

import volUp from '../../assets/icons/volume_up.svg'
import volOff from '../../assets/icons/volume_off.svg'
import translate from '../../assets/icons/translate.svg'
import close from '../../assets/icons/close.svg'
import { Context } from '../../context'

export default function SingleWord() {
  const { words, setSingleWordMode } = React.useContext(Context)
  const [status, setStatus] = React.useState(false)
  const [currentValue, setCurrentValue] = React.useState('')
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [corrects, setCorrects] = React.useState([])
  const [errors, setErrors] = React.useState([])
  const word = words && words[currentIndex]

  const cardRef = React.useRef()
  const meaningRef = React.useRef()
  const exampleRef = React.useRef()

  React.useEffect(() => {
    if (word) {
      meaningRef.current.children[0].innerHTML = '[...]'
      exampleRef.current.children[0].innerHTML = '[...]'
    }
  }, [word])

  console.log(word)

  const changeValueHandler = (e) => {
    setCurrentValue(e.target.value)
  }

  const submitHandler = () => {
    if (currentValue === word.word && currentValue === word.word.toLowerCase()) {
      setCorrects(prev => [...prev, word[setCurrentIndex]])
      cardRef.current.classList.add('correct')
      setStatus(true)
    } else {
      setErrors(prev => [...prev, word[currentIndex]])
    }
  }

  const nextWordHandler = () => {
    setCurrentIndex(prev => prev + 1)
    cardRef.current.classList.remove('correct')
    setCurrentValue('')
    setStatus(false)
  }

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
          <div className="single-word__main--progress">
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${corrects.length / 0.1}%` }}
                aria-valuemin="0"
                aria-valuemax="10"
                aria-valuenow={corrects.length}
              >
                {corrects.length}
              </div>
            </div>
            <span>10</span>
          </div>
          <div className="single-word__main--card card-container" ref={cardRef}>
            <img src={`https://sashan.herokuapp.com/${word.image}`} alt="" />
            <p className="word">{word.word}</p>
            <p className="word-transcript">{word.transcription}</p>
            <p className="word-translate">{word.wordTranslate}</p>
            <p className="word-meaning" dangerouslySetInnerHTML={{ __html: word.textMeaning }} ref={meaningRef} />
            <p className="word-meaning_translate" dangerouslySetInnerHTML={{ __html: word.textMeaningTranslate }} />
            <p className="word-example" dangerouslySetInnerHTML={{ __html: word.textExample }} ref={exampleRef} />
            <p className="word-example_translate" dangerouslySetInnerHTML={{ __html: word.textExampleTranslate }} />
            <input type="text" id="word-input" value={currentValue} onChange={changeValueHandler} />
            <button
              className="button"
              onClick={(!status && submitHandler) || nextWordHandler}
            >
              {(status && 'Следующее') || 'Проверить'}
              <span>&rarr;</span>
            </button>
          </div>
        </div>
      }
    </div>
  )
}
