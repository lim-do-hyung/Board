import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';
import BoardTitle from './header';

// GraphQL 쿼리 정의
const GET_SELECTED_BOARD = gql`
  query GetSelectedBoard($boardId: ID!) {
    selectedBoard(boardId: $boardId) {
        writer
        title
        contents
    }
  }
`;
const DELETE_BOARD = gql`
mutation DeleteBoard($boardId: ID!) {
    deleteBoard(id: $boardId) {
        boardId
    }
  }
`;
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

const BoardView = () => {
    const navigate = useNavigate();

    // URL 파라미터에서 boardId 추출
    const { boardId } = useParams();

    // 삭제 쿼리
    const [deleteBoard] = useMutation(DELETE_BOARD, {
        refetchQueries: [{ query: GET_BOARDS }], // 삭제 후에 게시글 목록을 다시 불러오기
    });

    // GraphQL 쿼리 실행
    const { loading, error, data } = useQuery(GET_SELECTED_BOARD, {
      variables: { boardId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    const { selectedBoard } = data;


    // 삭제 버튼 클릭 시 실행되는 함수
    const handleDelete = async () => {
        try {
            // GraphQL Mutation 실행
            await deleteBoard({
                variables: {
                    boardId: boardId
                }
            });
            
            // 삭제 후에는 게시판 목록 페이지로 이동
            navigate('/');
        } catch (error) {
            console.error('Error :', error);
        }
    };



    return (
        <div>
        <BoardTitle/>
        <h3>View</h3>
        <hr />
        <div className="board-main">
            <input type="text" defaultValue={selectedBoard.writer} readOnly /><br />
            <input type="text" defaultValue={selectedBoard.title} readOnly /><br />
            <textarea className="brd-txtarea" readOnly >{selectedBoard.contents}</textarea><br />
            <button className="board-btn" onClick={handleDelete}>삭제</button>
            <button className="board-btn" onClick={() => navigate(`/update/${boardId}`, { state: { writer: selectedBoard.writer, title: selectedBoard.title, contents: selectedBoard.contents } })}>수정</button>
        </div>
        </div>
    )
}

export default BoardView ;