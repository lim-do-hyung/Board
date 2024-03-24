import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import BoardTitle from './header';
import { gql, useQuery } from '@apollo/client';

// 전달할 query
const GET_BOARDS = gql`
  query {
    boards{
      boardId
      title
      writer
      cDate
      mDate
      views
      comments
    }
  }
`;


const BoardList  = () =>  {
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_BOARDS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    

    return (
        <div>
        <BoardTitle/>
        <div className="board-main"> {/* class -> className으로 변경 */}
            <table>
            <colgroup>
                <col style={{width: '5%'}} />
                <col style={{width: 'auto'}} />
                <col style={{width: '10%'}} />
                <col style={{width: '15%'}} />
                <col style={{width: '15%'}} />
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
                {data.boards.map(board => (
                    <tr key={board.boardId}>
                    <td>{board.boardId}</td>
                    <td className="tla"><Link to={`/view/${board.boardId}`}>{board.title}</Link></td>
                    <td>{board.writer}</td>
                    <td>{board.cDate}</td>
                    <td>{board.mDate}</td>
                    <td>{board.views}</td>
                    <td>{board.comments}</td>
                    </tr>
                ))}
            </tbody>
            </table>
            <button className="board-btn" onClick={() => navigate('/write')}>글쓰기</button> {/* class -> className으로 변경 */}
        </div>
        </div>

    )
}

export default BoardList ;