import { useState, useEffect } from 'react'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'

import { AuthProvider } from './context/AuthContext'

import { useAuthentication } from './hooks/UseAuthentication'

import { Navbar } from './components/navbar/Navbar'
import { Footer } from './components/footer/Footer'

import { Home } from './pages/home/Home'
import { About } from './pages/about/About'
import { Login } from './pages/login/Login'
import { Register } from './pages/register/Register'
import { Dashboard } from './pages/dashboard/Dashboard'
import { CreatePost } from './pages/createPost/CreatePost'
import { Search } from './pages/search/Search'

import './App.css';
import { Post } from './pages/post/Post'
import { EditPost } from './pages/editPost/EditPost'

function App() {
  const [user, setUser] = useState(null)
  const { auth } = useAuthentication();

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if (loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/search' element={<Search />} />
              <Route path='/posts/:id' element={<Post />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to='./' />} />
              <Route path='/register' element={!user ? <Register /> : <Navigate to='./' />} />
              <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to='./' />} />
              <Route path='/posts/edit/:id' element={user ? <EditPost /> : <Navigate to='./' />} />
              <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='./' />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
