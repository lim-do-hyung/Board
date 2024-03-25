import React, { useState } from 'react';
import {useLocation, useParams } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import BoardTitle from './header';

// UpdateBoard mutation 쿼리 정의
const UPDATE_BOARD = gql`
  mutation UpdateBoard($id: ID!, $title: String!, $contents: String!, $writer: String!) {
    updateBoard(id: $id, title: $title, contents: $contents, writer: $writer) {
      board {
        boardId
        title
        contents
        writer
      }
    }
  }
`;


const BoardUpdate  = () =>  {
    const location = useLocation();
    const { writer, title: initialTitle, contents : initialContents } = location.state;

     // URL 파라미터에서 boardId 추출
    const { boardId } = useParams();

    // useMutation 훅을 사용하여 mutation 실행
    const [updateBoard] = useMutation(UPDATE_BOARD);

    // state를 사용하여 현재 입력된 값을 저장
    const [title, setTitle] = useState(initialTitle);
    const [contents, setContents] = useState(initialContents);

    const handleUpdate = async () => {
        try {
            // 업데이트 쿼리 실행
            await updateBoard({
                variables: {
                    id: boardId, // 수정할 게시글의 ID
                    title: title, // 수정할 제목
                    contents: contents, // 수정할 내용
                    writer: writer 
                }
        });
        // 등록 후 변경된 게시글 view 
        //navigate(`/view/${boardId}`);
        window.location.href = `/view/${boardId}`;
        } catch (error) {
            // 업데이트 실패 시 에러 처리
            console.error('게시글 업데이트 중 오류가 발생했습니다:', error);
        }
    };

    return (
        <div>
        <BoardTitle/>
        <h3>Update</h3>
        <hr />
        <div className="board-main">
            <input type="text" defaultValue={writer} /><br />
            <input type="text" defaultValue={title} onChange={(e) => setTitle(e.target.value)} /><br />
            <textarea className="brd-txtarea" value={contents} onChange={(e) => setContents(e.target.value)}></textarea><br />
            <button className="board-btn" onClick={handleUpdate}>수정</button>
        </div>
        </div>
    )
}

export default BoardUpdate ;