import { MovieModel } from "../components/MovieCard";
import { http } from "./http";

export interface CommentCtreationData {
  text: string;
  rating: number;
}

export interface CommentModel {
  text: string;
  user_name: string;
  updated_at: Date;
  rating: number;
}

export interface CommentsResponse {
  results: MovieModel[];
  total: number;
}
  
class CommentService {
      
  async loadComments(
    page: number,
    pageSize: number,
  ) {
      
    const { result } = await http.get<CommentsResponse>('/movies', {
      query: { page, pageSize},
    });
      
    return result;
  }
        
  async postMovieComment(movieId: number, body: CommentCtreationData) {
    const { result } = await http.post<CommentsResponse>(`/movies/${movieId}/comments/`,
                                                         { body: body as Record<string, any> });
      
    return result;
  }
}

export const commentService = new CommentService();