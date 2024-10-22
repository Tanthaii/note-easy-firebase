import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';  
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {}
        <Route path="/register" element={<Register />} />  {}
        <Route path="/notes" element={(
          <>
            <NoteForm />
            <NoteList />
          </>
        )} />  {}
      </Routes>
    </Router>
  );
}

export default App;
