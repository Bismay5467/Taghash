import { Box, Link as MaterialLink } from "@mui/material";
import DisplayRecord from "./Record";
import DisplayLineChart from "./LineChart";

export default function StatsPage() {
  return (
    <>
      <MaterialLink href="/" underline="none">
        Submit your response
      </MaterialLink>
      <Box sx={{ mb: 4 }} />
      <DisplayLineChart />
      <Box sx={{ mb: 4 }} />
      <h2>See Full Records</h2>
      <DisplayRecord />
    </>
  );
}
