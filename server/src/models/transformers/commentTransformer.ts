import { Comment } from '../comment';
import { userTransformer } from './userTransformer';

export type TransformedComment = ReturnType<CommentTransformer['transform']>;

class CommentTransformer {
  transform(comment: Comment) {
    return {
      id: comment.id,
      text: comment.text,
      rating: comment.rating,
      author: comment.author && userTransformer.transform(comment.author),
    };
  }

  transformArray(comments: Comment[]) {
    return comments.map((comment) => this.transform(comment));
  }
}

export const commentTransformer = new CommentTransformer();
