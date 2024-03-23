import React from 'react';
import {Link} from 'react-router-dom';
import BoardTitle from './header';

const BoardUpdate  = () =>  {
    return (
        <div>
        <BoardTitle/>
        <div className="board-main">
            <input type="text" defaultValue="작성자" /><br />
            <input type="text" defaultValue="제목" /><br />
            <textarea className="brd-txtarea"></textarea><br />
            <button class="board-btn" id="brd_update">수정</button>
        </div>
        </div>
    )
}

export default BoardUpdate ;