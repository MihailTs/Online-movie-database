import { NextFunction, Request, Response } from "express";
import { BadRequestError, NotFoundError, UnauthorizedUserError } from "../errors";
import { ZodError } from "zod";
import { UniqueViolationError } from "objection";

export const errorHandler = <T>(
    handler: (req: Request, res?: Response, next?: NextFunction) => Promise<T>
) => {
    return async (req: Request, res: Response) => {
        try {
            const result = await handler(req, res);
            const status = getStatus<T>(req, result);

            if (status === 204) {
                return res.status(status).send();
            }

            return res.status(status).send(result);
        } catch (error) {
            if (error instanceof BadRequestError) {
                return res.status(400).send({ message: error.message });
            }

            if (error instanceof NotFoundError) {
                return res.status(404).send({ message: error.message });
            }

            if (error instanceof UnauthorizedUserError) {
                return res.status(401).send({ message: error.message });
            }

            if (error instanceof UniqueViolationError) {
                return res.status(409).send({ message: error.message });
            }

            if (error instanceof ZodError) {
              return res.status(400).send({
                ...error.flatten(),
                message: 'Validation error',
              });
            }
            console.error(error);
            
            if (error instanceof Error) {
                return res.status(500).send({ message: 'Internal server error: ' + error.message });
            }

            res.status(500).send({ message: 'An unknown error occurred' });
        }
    }
};

function getStatus<T>(req: Request, result: T): number {
    switch (req.method) {
      case "POST":
        return 201;
      case "PUT":
      case "PATCH":
      case "DELETE":
        return result ? 200 : 204;
      default:
        return 200;
    }
}