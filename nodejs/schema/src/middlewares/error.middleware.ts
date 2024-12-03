import { Request, Response, NextFunction } from 'express';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { ValidationError } from 'class-validator';

interface CustomError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);

  if (err instanceof EntityNotFoundError) {
    res.status(404).json({
      success: false,
      message: 'Resource not found'
    });
    return;
  }

  if (err instanceof QueryFailedError) {
    res.status(400).json({
      success: false,
      message: 'Database operation failed',
      detail: err.message
    });
    return;
  }

  if (err instanceof ValidationError) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err
    });
    return;
  }

  // Custom error with status code
  if (err.statusCode) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
};