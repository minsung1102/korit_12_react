import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'
import Home from './components/Home'
import Contact from './components/Contact'
import ContactSeoul from './components/ContactSeoul'
import ContactBusan from './components/ContactBusan'
import PageNotFound from './components/PageNotFount'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to='/'>Home</Link>{' | '}
          <Link to='/contact'>Contact</Link>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='contact' element={<Contact />} >
            <Route path='seoul' element={<ContactSeoul />}></Route>
            <Route path='busan' element={<ContactBusan />}></Route>
          </Route>
          <Route path='*' element={<PageNotFound />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
