import { Link as MaterialLink } from "@mui/material";
import ResponseForm from "./Form";

export default function HomePage() {
  return (
    <>
      <MaterialLink href="/stats" underline="none">
        View Stats and Trend Analysis
      </MaterialLink>
      <ResponseForm />
    </>
  );
}
