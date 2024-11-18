import { z } from 'zod';
import { Genre, GenreSchemeType } from '../models/genre';
import { UniqueViolationError, Transaction, transaction } from 'objection';
  
  export class GenreService {

    async getAll(): Promise<Genre[]> {
      return await Genre.query();
    }

    /**
     * Creates a new genre
     *
     * Throws an error if the genre already exists.
     */
    async create(input: GenreSchemeType): Promise<Genre> {
        try {
          return await Genre.query().insert({ name: input.name });
        } catch (error) {
          if (error instanceof UniqueViolationError) {
            console.error(`This genre already exists: ${error.message}`);
          }
          throw error;
        }
    }
  
    /**
     * Finds a genre object with this name
     *
     * Returns `undefined` if the genre does not exist.
     */
    async findByName(genre_name: string): Promise<Genre | undefined> {
        return await Genre.query().findOne('name', '=', genre_name);    
    }
  
    /**
     * Finds a genre given a name. If it does not exist - creates it
     */
    async findOrCreate(name: string, transaction?: Transaction): Promise<Genre> {
      const trx = transaction || await Genre.startTransaction();  
      
      try {
        const search = await this.findByName(name);
        
        if (search) {
          return search;
        }

        const newGenre = await Genre.query(trx).insert({ name });

        if (!transaction) {
          await trx.commit();
        }

        return newGenre;
      } catch (error) {
        if (!transaction) {
          await trx.rollback();
        }
        throw error;
      }
  }
}
  
export const genreService = new GenreService();