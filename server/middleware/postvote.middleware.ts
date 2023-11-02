import { Request, Response, NextFunction } from "express";
import { body, checkExact, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/errorHandler";
import { ERROR_CODES } from "../../common/statusCode";

export const validatePostVote = [
  body("details.name")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 5, max: 50 })
    .escape(),

  body("details.gender")
    .trim()
    .notEmpty()
    .isString()
    .isIn(["male", "female", "other"])
    .escape(),

  body("details.isVaccinated")
    .trim()
    .notEmpty()
    .isString()
    .isIn(["yes", "no"])
    .escape(),

  body("details.birthDate")
    .trim()
    .notEmpty()
    .isString()
    .isDate()
    .escape()
    .custom((value) => {
      const birthDate = new Date(value);
      const now = new Date();
      if (birthDate >= now) {
        throw new Error("Birthdate should be in the past.");
      }
      return true;
    }),

  checkExact([], {
    locations: ["body", "params", "query", "cookies", "headers"],
  }),

  (req: Request, _res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return next(
        new ErrorHandler("Validation Error.", ERROR_CODES["BAD REQUEST"])
      );
    } else next();
  },
];
