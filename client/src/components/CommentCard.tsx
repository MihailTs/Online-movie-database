import { useState } from 'react';
import classes from '../styles/component/CommentCard.module.css';
import downArrow from '../assets/down-arrow.svg';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface MovieComment {
  id: number;
  text: string;
  rating: number;
  author: User;
}

export interface CommentCardProps {
  comment: MovieComment;
}

export function CommentCard({ comment }: CommentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsExpanded((isExpanded) => !isExpanded);
  }

  return (
    <li className={classes.commentCard}>
      <div className={`${classes.commentCard} ${isExpanded ? classes.commentCardExpanded : ''}`}>
        <div className={classes.commentHeader}>
          <h3>{comment.author.name}</h3>
          <button onClick={handleButtonClick}>
            <img
              className={`${classes.arrow} ${isExpanded ? classes.arrowExpanded : ''}`}
              src={downArrow}
              alt="Expand/Collapse"
            />
          </button>
        </div>

        {isExpanded ? (
          <>
            <p>Comment: {comment.text}</p>
            <p>Rating: {comment.rating}/10</p>
          </>
        ) : (
          <p className={classes.commentSnippet}>{comment.text.slice(0, 50)}...</p>
        )}
      </div>
    </li>
  );
}
