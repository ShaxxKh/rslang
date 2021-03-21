import React from 'react'

const Context = React.createContext()

export default function MainContext({ children }) {

  return (
    <Context.Provider>
      {children}
    </Context.Provider>
  )
}
