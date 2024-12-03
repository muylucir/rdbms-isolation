import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Request, Response, NextFunction } from 'express';

export const validateDto = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToClass(dtoClass, req.body);
    const errors = await validate(dtoObj);

    if (errors.length > 0) {
      const formattedErrors = errors.map(error => ({
        property: error.property,
        constraints: error.constraints
      }));
      res.status(400).json({ errors: formattedErrors });
      return;
    }

    req.body = dtoObj;
    next();
  };
};
