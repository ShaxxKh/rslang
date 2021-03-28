import React from 'react'
import './Learning.scss'
import { Context } from '../../context'
import LearningMain from '../../components/LearningMain'
import SingleWord from '../../components/SingleWord'

export default function Learning() {
  const { words, singleWordMode } = React.useContext(Context)
  console.log(words)

  return (
    (!singleWordMode && <LearningMain />)
    || (<SingleWord />)
    
  )
}
