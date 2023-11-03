import { useState } from "react";
import useFetchData from "../hooks/useFetchData";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { IHeadCell } from "../types";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Full Name",
  },
  {
    id: "date of birth",
    numeric: false,
    disablePadding: false,
    label: "Date of Birth",
  },
  {
    id: "gender",
    numeric: false,
    disablePadding: false,
    label: "Gender",
  },
  {
    id: "vaccinated",
    numeric: false,
    disablePadding: false,
    label: "Vaccinated",
  },
];

export default function DisplayRecord() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const { loading, error, records, totalResponse } = useFetchData({
    page: page + 1,
    rowsPerPage,
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (error.length) return <h1>{error}</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750, height: 400 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <TableHead>
                <TableRow>
                  {headCells.map((headCell: IHeadCell) => {
                    return (
                      <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                      >
                        <TableSortLabel>{headCell.label}</TableSortLabel>
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.birthDate}
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.gender === "male" ? (
                          <MaleIcon />
                        ) : row.gender === "female" ? (
                          <FemaleIcon />
                        ) : (
                          <TransgenderIcon />
                        )}
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row">
                        {row.isVaccinated === "yes" ? (
                          <CheckIcon />
                        ) : (
                          <CloseIcon />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 8]}
            component="div"
            count={totalResponse}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
}
