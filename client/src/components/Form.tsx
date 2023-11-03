import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import getFormattedDate from "../helpers/getFormattedDate";
import { TGender, TIsVaccinated, TData } from "../../../common/types";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type TResponse = {
  name: string;
  gender: string;
  birthDate: Dayjs | null;
  isVaccinated: string;
};

const ResponseForm = () => {
  const [response, setResponse] = useState<TResponse>({
    name: "",
    birthDate: null,
    gender: "",
    isVaccinated: "",
  });

  const { formattedMinDate, formattedMaxDate } = getFormattedDate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, birthDate, gender, isVaccinated } = response;
    const details: TData = {
      name,
      birthDate: birthDate?.format("YYYY-MM-DD") as string,
      gender: gender as TGender,
      isVaccinated: isVaccinated as TIsVaccinated,
    };

    try {
      const res = await axios({
        method: "post",
        url: "/vote",
        data: {
          details,
        },
      });
      toast.success(
        res?.data?.message ?? "Your response was successfully recorded",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    } catch (error: any) {
      const errorMessage =
        error instanceof Error
          ? error?.response?.data?.message ??
            "Something went wrong! Try again later."
          : "Something went wrong! Try again later.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleReset = () => {
    setResponse({ name: "", birthDate: null, gender: "", isVaccinated: "" });
  };

  return (
    <React.Fragment>
      <h2>Response Form</h2>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ width: "100%" }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            label="Name"
            onChange={(e) => setResponse({ ...response, name: e.target.value })}
            value={response.name}
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth"
              value={response.birthDate}
              onChange={(newValue) =>
                setResponse({
                  ...response,
                  birthDate: newValue,
                })
              }
              minDate={dayjs(formattedMinDate)}
              maxDate={dayjs(formattedMaxDate)}
              slotProps={{
                textField: {
                  required: true,
                  fullWidth: true,
                },
              }}
              sx={{ mb: 4 }}
            />
          </LocalizationProvider>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{ mb: 4 }}
            onChange={(e) =>
              setResponse({ ...response, gender: e.target.value })
            }
          >
            <FormControlLabel
              value="female"
              control={<Radio required={true} />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Are you vaccinated ?
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{ mb: 4 }}
            onChange={(e) =>
              setResponse({ ...response, isVaccinated: e.target.value })
            }
          >
            <FormControlLabel
              value="yes"
              control={<Radio required={true} />}
              label="Yes"
            />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
          <Button
            variant="outlined"
            color="secondary"
            type="submit"
            sx={{ mb: 2 }}
          >
            Submit Your Response
          </Button>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Button
            variant="outlined"
            color="secondary"
            type="reset"
            onClick={handleReset}
          >
            Reset Your Response
          </Button>
        </FormControl>
      </form>
    </React.Fragment>
  );
};

export default ResponseForm;
