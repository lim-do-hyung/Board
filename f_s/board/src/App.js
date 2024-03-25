import React from 'react';
import './App.css'; // App.css 파일을 import
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


import BoardList from './components/boardList';
import BoardView from './components/boardView';
import BoardWrite from './components/boardWrite';
import BoardUpdate from './components/boardUpdate';

const Board = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <BoardList /> } />
        <Route path="/view/:boardId" element={ <BoardView /> } />
        <Route path="/write" element={ <BoardWrite /> } />
        <Route path="/update/:boardId" element={ <BoardUpdate /> } />
      </Routes>
    </Router>
  );
};

export default Board;
