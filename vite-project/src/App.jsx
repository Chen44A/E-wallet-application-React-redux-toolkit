import './App.css'
import { Routes,Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { AddCard } from './pages/AddCard'
import { CardDetail } from './pages/CardDetail'
import { Settings } from './pages/Settings'
import { PageNotFound } from './pages/PageNotFound'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/addcard' element={<AddCard/>}/>
      <Route path='/carddetail/:id' element={<CardDetail/>}/>
      <Route path='/settings' element={<Settings/>}/>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
    </>
  )
}

export default App
