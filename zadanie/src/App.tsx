import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Todo from './components/Todos'

function App() {
 
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/todo/:id' element={<Todo/>}/>
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  )
}

export default App
