import React, { useState } from 'react';
import styles from './Comments.module.css';
import { CommentType } from '../../store/comments/types';
import trashIcon from '../../assets/trash_icon.svg';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  addCommentThunk,
  removeCommentThunk,
} from '../../store/comments/commentsThunk';
import { v4 as uuidv4 } from 'uuid';
import { formatDate } from '../../helpers';

type commentsProps = {
  comments: CommentType[];
  productId: string;
};

const Comments: React.FC<commentsProps> = ({ comments, productId }) => {
  const [newCommentValue, setNewComment] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleAddComment = (description: string) => {
    if (description.length > 0)
      dispatch(
        addCommentThunk({
          id: uuidv4(),
          productId,
          description,
          date: formatDate(new Date()),
        })
      );
    setNewComment('');
  };

  const handleDeleteComment = (id: string) => {
    dispatch(removeCommentThunk(id));
  };

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  return (
    <div className={styles.comment_container}>
      <p className={styles.comment_title}>comments:</p>
      {comments.map((comment) =>
        comment.productId === productId ? (
          <div
            key={comment.id + comment.description}
            className={styles.comment_item_container}
          >
            <p className={styles.comment_item}>{comment.description}</p>
            <div className={styles.comment_date_btn_container}>
              <span className={styles.comment_item_date}>{comment.date}</span>
              <button
                className={styles.comment_delete_btn}
                style={{ border: 'none' }}
                onClick={() => handleDeleteComment(comment.id)}
              >
                <img src={trashIcon} />
              </button>
            </div>
          </div>
        ) : null
      )}
      <div className={styles.add_comment_container}>
        <textarea
          className={styles.add_comment_area}
          value={newCommentValue}
          onChange={(e) => onChange(e)}
        />
        <button
          className={styles.add_comment_btn}
          onClick={() => handleAddComment(newCommentValue)}
        >
          Add comment
        </button>
      </div>
    </div>
  );
};
export default Comments;
