import { Request, Response } from "express";

import AppDataSource from "../config/database.config";
import { SUCCESS_CODES } from "../../common/statusCode";
import { User } from "../entities/user.entity";
import { asyncHandler } from "../utils/asyncHandler";
import { TIsVaccinated } from "../../common/types";

const GetDataForLineChart = asyncHandler(
  async (req: Request, res: Response) => {
    const isVaccinated = req.query.is_vaccinated as TIsVaccinated;

    const userRepository = AppDataSource.getRepository(User);

    const results = await userRepository
      .createQueryBuilder("user")
      .select([
        "TIMESTAMPDIFF(YEAR, user.birthDate, CURDATE()) as age",
        `COUNT(CASE WHEN user.isVaccinated = "${isVaccinated}" THEN 1 ELSE NULL END) as userCount`,
      ])
      .groupBy("age")
      .getRawMany();

    res.status(SUCCESS_CODES.OK).json({
      results,
      success: true,
    });
  }
);

export default GetDataForLineChart;
