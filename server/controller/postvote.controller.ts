import { Request, Response } from "express";

import AppDataSource from "../config/database.config";
import { SUCCESS_CODES } from "../../common/statusCode";
import { TData } from "../../common/types";
import { User } from "../entities/user.entity";
import { asyncHandler } from "../utils/asyncHandler";

const PostVote = asyncHandler(async (req: Request, res: Response) => {
  const { name, gender, birthDate, isVaccinated }: TData = req.body.details;

  const user = new User();
  user.name = name;
  user.gender = gender;
  user.birthDate = birthDate;
  user.isVaccinated = isVaccinated;

  const userRepository = AppDataSource.getRepository(User);
  await userRepository.save(user);

  res.status(SUCCESS_CODES.CREATED).json({
    message: "Your response was successfully recorded",
    success: true,
  });
});

export default PostVote;
