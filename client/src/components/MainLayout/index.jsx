import React from 'react'

export default function MainLayout({ children }) {
  return (
    <>
      <header>
        Header
      </header>
      <div className="body">
        {children}
      </div>
      <footer>
        Footer
      </footer>
    </>
  )
}
