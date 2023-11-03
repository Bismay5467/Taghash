import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { TRecord } from "../types";

const useFetchData = ({
  page,
  rowsPerPage,
}: {
  page: number;
  rowsPerPage: number;
}) => {
  const [records, setRecords] = useState<TRecord[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [totalResponse, setTotalResponse] = useState<number>(0);

  const fetchData = useCallback(() => {
    setLoading(true);
    setError("");

    axios({
      method: "get",
      url: "/data",
      params: { page, rowsPerPage },
    })
      .then((res) => {
        setRecords(res?.data?.users);
        setTotalResponse(res?.data?.totalUsers);
      })
      .catch((error: Error) => {
        console.error(error);
        setError(error.message);
      });

    setLoading(false);
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData, page, rowsPerPage]);

  return { loading, error, records, totalResponse };
};

export default useFetchData;
