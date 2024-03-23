import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import BoardTitle from './header';

const BoardList  = () =>  {
    const navigate = useNavigate();
    

    return (
        <div>
        <BoardTitle/>
        <div className="board-main"> {/* class -> className으로 변경 */}
            <table>
            <colgroup>
                <col style={{width: '5%'}} />
                <col style={{width: 'auto'}} />
                <col style={{width: '10%'}} />
                <col style={{width: '10%'}} />
                <col style={{width: '10%'}} />
                <col style={{width: '10%'}} />
                <col style={{width: '10%'}} />
            </colgroup>
            <thead>
                <tr>
                <th>No</th>
                <th>제목</th>
                <th>작성자</th>
                <th>작성 날짜</th>
                <th>수정 날짜</th>
                <th>조회</th>
                <th>댓글 수</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td className="tla"><Link to="/view/1">제목입니다</Link></td>
                <td>김이박</td>
                <td>2023.01.01</td>
                <td>2023.01.03</td>
                <td>2</td>
                <td>5</td>
                </tr>
                <tr>
                <td>2</td>
                <td className="tla"><Link to="/view/2">제목입니다</Link></td>
                <td>김우중</td>
                <td>2023.01.01</td>
                <td>2023.01.03</td>
                <td>1</td>
                <td>6</td>
                </tr>
            </tbody>
            </table>
            <button className="board-btn" onClick={() => navigate('/write')}>글쓰기</button> {/* class -> className으로 변경 */}
        </div>
        </div>

    )
}

export default BoardList ;