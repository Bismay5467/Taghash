/* eslint-disable @typescript-eslint/no-unused-vars */
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import { TDataLineChart } from "../types";
import { useState, useEffect } from "react";
import axios from "axios";
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

Chart.register(CategoryScale);

export default function DisplayLineChart() {
  const [data, setData] = useState<TDataLineChart[] | []>([]);
  const [is_vaccinated, setIsVaccinated] = useState<"yes" | "no">("yes");

  useEffect(() => {
    axios({
      method: "get",
      url: "/counts",
      params: { is_vaccinated },
    })
      .then((res) => {
        console.log(res);
        setData(res?.data?.results);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }, [is_vaccinated]);

  const sanitizedData = data
    ?.filter((obj: TDataLineChart) => obj.userCount !== "0")
    .map((obj: TDataLineChart) => ({
      age: parseInt(obj.age, 10),
      userCount: parseInt(obj.userCount, 10),
    }))
    .sort((a, b) => a.age - b.age);

  console.log(is_vaccinated);

  const [chartData, setChartData] = useState({
    labels: [] as number[],
    datasets: [
      {
        label: "",
        data: [] as number[],
        backgroundColor: [""],
        borderColor: "",
        borderWidth: 0,
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: sanitizedData?.map((data) => data.age),
      datasets: [
        {
          label: "Users Count",
          data: sanitizedData?.map((data) => data.userCount),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: is_vaccinated === "yes" ? "green" : "red",
          borderWidth: 2,
        },
      ],
    });
  }, [is_vaccinated, sanitizedData]);

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <FormLabel id="demo-row-radio-buttons-group-label">
        View stats for people who are vaccinated ?
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        sx={{ mb: 4 }}
        onChange={(e) => setIsVaccinated(e.target.value as "yes" | "no")}
        defaultValue={"yes"}
      >
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text:
                is_vaccinated === "yes"
                  ? "Number of persons vaccinated for different age groups"
                  : "Number of persons not vaccinated for different age groups",
            },
            legend: {
              display: true,
            },
          },
        }}
      />
    </div>
  );
}
