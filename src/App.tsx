import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Book from './pages/Book/Book'
import styles from './App.module.css'

function App() {
  return (
    <main className={styles.main}>
    <Routes>
      <Route path="/book" element={<Book />} />
      <Route path="*" element={<Book />} />
    </Routes>
  </main>
  )
}

export default App
