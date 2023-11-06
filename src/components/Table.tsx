import { useState, useEffect } from "react";
import getRepositories from "../api/getRepositories";
import { Repository } from "../types/";
import Box from "@mui/material/Box";
import { LoadingComponent } from "./LoadingComponent";
import { DataTable } from "./DataTable";

export default function BasicTable() {
  const [data, setData] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const repositories = await getRepositories();
      setLoading(false);
      setData(repositories);
    }
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <Box sx={{ height: "100%", width: "100%" }}>
          <DataTable {...data} />
        </Box>
      )}
    </>
  );
}
