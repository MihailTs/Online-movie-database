import { Button } from "./Button";
import classes from '../styles/component/CommentForm.module.css'
import { TextArea } from "./TextArea";
import { useState } from "react";
import { CommentCtreationData, commentService } from "../services/commentService";
import { MovieModel } from "./MovieCard";

export interface CommentFormProps {
  onSubmit: () => any;
  movie: MovieModel | undefined;
}

export function CommentForm({ onSubmit, movie }: CommentFormProps){
    const [input, setInput] = useState<CommentCtreationData>({
        text: '',
        rating: 5
    });
  
    const handleRatingChange = (rating: number) => {
      setInput((prev) => ({ ...prev, rating }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      commentService.postMovieComment(movie?.id ?? 0, input);
      onSubmit();
    };
    
    return (
      <form className={classes.commentForm} onSubmit={handleSubmit}>
        <label htmlFor='comment_text' className={classes.textLabel}>Comment:</label>
        <TextArea 
          id='comment_text'
          name='comment_text'
          value={input.text}
          className={classes.commentText}
          onChange={(val) => setInput((prev) => ({ ...prev, text: val }))}
        />
          
        <label>Rating:</label>
        <div className={classes.stars}>
          {[...Array(10)].map((_, index) => (
            <button
              key={index}
              type="button"
              className={`${classes.star} ${input.rating === index + 1 ? classes.activeStar : ''}`}
              onClick={() => handleRatingChange(index + 1)}
            >
              ★
            </button>
          ))}
        </div>
          
        <Button type='submit' className={classes.submit}>Submit</Button>
      </form>
    );
}