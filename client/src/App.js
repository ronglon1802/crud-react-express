import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Add from './coponents/add';
import Edit from './coponents/edit';
import List from './coponents/list';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<List />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/add' element={<Add />} />
        </Routes>
      </Router>
    </>
  )
}

export default App