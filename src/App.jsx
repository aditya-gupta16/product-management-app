import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home'
import Login from './components/Login';

const App = () => {
  return (
    <div>
      {/* <Login /> */}
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/home' element={<Home/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App