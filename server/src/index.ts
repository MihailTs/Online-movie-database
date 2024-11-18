import dbConfig from '../knexfile'
import { Model, knexSnakeCaseMappers } from 'objection'
import express, { json, Router } from 'express';
import Knex from 'knex';
import { moviesRouter } from './routers/moviesRouter';
import { genresRouter } from './routers/genresRouter';
import { authRouter } from './routers/usersRouter';
import cors from 'cors';

const knex = Knex({
    ...dbConfig,
    debug: true,
    ...knexSnakeCaseMappers()
  });  
Model.knex(knex);

const app = express();
const port = 3000;

app.use(json());
app.use(cors({
  exposedHeaders: "Authorization"
}));

app.use('/', (req, res, next) => {
  // console.log(req.method);
  // console.log(req.headers);
  // console.log(req.query);
  // console.log(req.params);
  // console.log(req.body);

  next();
});

app.use('/movies', moviesRouter);
app.use('/genres', genresRouter);
app.use('/auth', authRouter);

app.listen(port);
console.log(`Server is listening on port ${port}`);