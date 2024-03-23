import React from 'react';
import {Link} from 'react-router-dom';
import BoardTitle from './header';

const BoardWrite  = () =>  {
    return (
        <div>
        <BoardTitle/>
        <div className="board-main">
            <input type="text" defaultValue="작성자" /><br />
            <input type="text" defaultValue="제목" /><br />
            <textarea className="brd-txtarea"></textarea><br />
            <button className="board-btn" id="brd_insert">등록</button>
        </div>
        </div>
    )
}

export default BoardWrite ;