import { Request, Response } from "express";

import AppDataSource from "../config/database.config";
import { SUCCESS_CODES } from "../../common/statusCode";
import { User } from "../entities/user.entity";
import { asyncHandler } from "../utils/asyncHandler";

const NO_OF_ROWS_PER_PAGE = 6;

const GetRecords = asyncHandler(async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const rowPerPage = parseInt(req.query.rowsPerPage as string) || 6;

  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository
    .createQueryBuilder("user")
    .skip((page - 1) * rowPerPage)
    .take(rowPerPage)
    .getMany();

  const totalUsers = await userRepository.createQueryBuilder("user").getCount();

  const hasMore = totalUsers > page * rowPerPage;

  res.status(SUCCESS_CODES.OK).json({
    users,
    success: true,
    totalUsers,
  });
});

export default GetRecords;
