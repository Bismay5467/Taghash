import express, { Request, Response, NextFunction } from "express";

import PostVote from "../controller/postvote.controller";
import GetRecords from "../controller/getrecords.controller";
import GetDataForLineChart from "../controller/getdataforlineChart.controller";
import GetDataForBarChart from "../controller/getdataforbarChart.controller";

import { validatePostVote } from "../middleware/postvote.middleware";
import { validateGetRecord } from "./../middleware/getrecords.middleware";
import { validateDataForLineChart } from "../middleware/linechart.middleware";

const router = express.Router();

router.post("/vote", validatePostVote, PostVote);

router.get("/data", validateGetRecord, GetRecords);
router.get("/counts", validateDataForLineChart, GetDataForLineChart);
router.get("/results", GetDataForBarChart);

export default router;
