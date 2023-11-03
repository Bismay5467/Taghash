import { TData } from "../../common/types";

export type TRecord = TData & { id: number };

interface IHeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export type TDataLineChart = {
  age: string;
  userCount: string;
};

export type TDataLineChartSanitized = {
  labels: number[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string;
    borderWidth: number;
  };
};
