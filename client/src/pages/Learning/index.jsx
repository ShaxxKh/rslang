import React from 'react'
import { Context } from '../../context'
import LearningMain from '../../components/LearningMain'
import SingleWord from '../../components/SingleWord'

export default function Learning() {
  const { singleWordMode } = React.useContext(Context)

  return (
    (!singleWordMode && <LearningMain />)
    || (<SingleWord />)
    
  )
}
