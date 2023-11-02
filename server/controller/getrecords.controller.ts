import { Request, Response } from "express";

import AppDataSource from "../config/database.config";
import { SUCCESS_CODES } from "../../common/statusCode";
import { User } from "../entities/user.entity";
import { asyncHandler } from "../utils/asyncHandler";
import { NO_OF_ROWS_PER_PAGE } from "./../../common/constants";

const GetRecords = asyncHandler(
  async (req: Request, res: Response) => {

    const page = parseInt(req.query.page as string) || 1;
    const noOfRowsPerPage = NO_OF_ROWS_PER_PAGE;

    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository
      .createQueryBuilder("user")
      .skip((page - 1) * noOfRowsPerPage)
      .take(noOfRowsPerPage)
      .getMany();

    const totalUsers = await userRepository
      .createQueryBuilder("user")
      .getCount();

    const hasMore = totalUsers > page * noOfRowsPerPage;

    res.status(SUCCESS_CODES.OK).json({
      users,
      success: true,
      hasMore
    });
  }
);

export default GetRecords;
