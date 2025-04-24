// components/TaskComments.js
import React, { useEffect, useState } from 'react';
import './TaskComment.css'
import { fetchTaskComments, addTaskComment } from '../services/api';


const TaskComments = ({ taskId, userId }) => {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const { data } = await fetchTaskComments(taskId);
        setComments(data);
      } catch (error) {
        console.error('Yorumlar alınamadı:', error);
      }
    };
  
    loadComments();
  }, [taskId]);
  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput) return;
  
    try {
      const { data } = await addTaskComment(taskId, {
        userId,
        commentText: commentInput,
      });
  
      setComments((prev) => [data, ...prev]);
      setCommentInput('');
      setShowInput(false);
    } catch (error) {
      console.error('Yorum eklenemedi:', error);
    }
  };
  

  return (
    <div className="comment-container">
      {comments.length > 0 ? (
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment.id}>
              <strong>{comment.userName}:</strong> {comment.commentText}
              <div className="comment-date">
                {new Date(comment.createdAt).toLocaleString('tr-TR')}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !showInput && (
          <button onClick={() => setShowInput(true)} className="comment-toggle-btn">
            Yorum Yap
          </button>
        )
      )}

{showInput && (
  <form onSubmit={handleCommentSubmit} className="comment-form">
    <textarea
      value={commentInput}
      onChange={(e) => setCommentInput(e.target.value)}
      placeholder="Yorumunuzu yazın..."
      required
    />
    <div className="comment-buttons">
      <button type="submit">Gönder</button>
      <button
        type="button"
        className="cancel-btn"
        onClick={() => {
          setShowInput(false);
          setCommentInput('');
        }}
      >
        Vazgeç
      </button>
    </div>
  </form>
)}

    </div>
  );
};

export default TaskComments;
