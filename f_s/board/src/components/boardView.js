import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import BoardTitle from './header';

const BoardView  = () =>  {
    const navigate = useNavigate();

    return (
        <div>
        <BoardTitle/>
        <div className="board-main">
            <input type="text" defaultValue="작성자" /><br />
            <input type="text" defaultValue="제목" /><br />
            <textarea className="brd-txtarea"></textarea><br />
            <button className="board-btn" >삭제</button>
            <button className="board-btn" onClick={() => navigate('/write')}>수정</button>
        </div>
        </div>
    )
}

export default BoardView ;