import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import BoardTitle from './header';

// GraphQL Mutation 정의
const CREATE_BOARD = gql`
  mutation CreateBoard($title: String!, $contents: String!, $writer: String!) {
    createBoard(title: $title, contents: $contents, writer: $writer) {
        board {
            title
            contents
            writer
        }
    }
  }
`;

const BoardWrite = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [writer, setWriter] = useState('');

  // GraphQL Mutation을 실행할 수 있는 함수 가져오기
  const [createBoard] = useMutation(CREATE_BOARD);

  // 등록 버튼 클릭 시 실행되는 함수
  const handleRegister = async () => {
    try {
      // GraphQL Mutation 실행
      await createBoard({
        variables: {
          title: title,
          contents: contents,
          writer: writer
        }
      });
      
      // 등록 후에는 게시판 목록 페이지로 이동
      window.location.href = '/';
    } catch (error) {
      console.error('Error registering board:', error);
    }
  };

  return (
    <div>
        <BoardTitle/>
        <h3>Write</h3>
        <hr />  
        <div className="board-main">
            <input type="text" value={writer} onChange={(e) => setWriter(e.target.value)} placeholder="작성자" /><br />
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" /><br />
            <textarea className="brd-txtarea" value={contents} onChange={(e) => setContents(e.target.value)} placeholder="내용"></textarea><br />
            <button className="board-btn" onClick={handleRegister}>등록</button>
        </div>
    </div>
  );
};

export default BoardWrite;
