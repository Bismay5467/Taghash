import { Request, Response, NextFunction } from "express";
import { query, checkExact, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/errorHandler";
import { ERROR_CODES } from "../../common/statusCode";

export const validateDataForLineChart = [
  query("is_vaccinated").trim().notEmpty().isIn(["yes", "no"]).escape(),

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
