import { CommentCard, MovieComment } from './CommentCard';
import classes from '../styles/component/CommentSection.module.css'
import { useCurrentUser } from '../contexts/CurrentUser';
import plusIcon from '../assets/plus-icon.svg';
import xIcon from '../assets/close-x.svg'
import { useCallback, useState } from 'react';
import { CommentForm } from './CommentForm';
import { MovieModel } from './MovieCard';
import { useNavigate } from 'react-router-dom';
import { PrivateOutlet } from '../outlets/PrivateOutlet';

interface CommentSectionProps {
  comments: MovieComment[];
  movie: MovieModel | undefined;
}

export function CommentSection({ comments, movie }: CommentSectionProps) {
  const user = useCurrentUser();
  const [isCommenting, setIsCommenting] = useState(false);

  const navigate = useNavigate();

  //if comments are paginated this wont work
  const canAddComment = useCallback(() => {
    return comments
      .map((c) => c.author.id)
      .filter((cid) => cid === user?.id)
      .length === 0;
  }, [comments, user]);

  const handleCommentFormSubmit = () => {
    setIsCommenting(false);
    navigate(0);
  };

  return (
    <div className={classes.commentsSection}>
      <h2 className={classes.commentsSectionTitle}>Comments section</h2>
      {comments.length > 0 && (
        <ul className={classes.commentsList}>
          {comments.map((comment: MovieComment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </ul>
      )}

      {canAddComment() && (
        <>
         <PrivateOutlet/>
          <button
            className={classes.addCommentButton}
            onClick={() => setIsCommenting(!isCommenting)}
          >
            <img src={isCommenting ? xIcon : plusIcon} alt="Toggle Comment Form" />
          </button>

          {isCommenting && (
            <div className={classes.commentForm}>
              <CommentForm onSubmit={handleCommentFormSubmit} movie={movie}/>
            </div>
          )}
        </>
      )}
    </div>
  );
}