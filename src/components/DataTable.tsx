import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { getStarredRepos, useLocalStorage } from "../utils/starRepo";
import { CustomToolbar } from "./CustomDatagridToolbar";
import { StarHandleComponent } from "./StarHandleComponent";
import { Repository } from "../types/";

export function DataTable(data: Repository[]) {
  const localStorage = useLocalStorage();

  const dataArray = Object.values(data);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", minWidth: 90 },
    {
      field: "name",
      headerName: "Repo name",
      minWidth: 200,
      editable: false,
    },
    {
      field: "description",
      headerName: "Desc",
      minWidth: 300,
      editable: false,
    },
    {
      field: "language",
      headerName: "Lang",
      minWidth: 100,
      editable: false,
    },
    {
      field: "stargazers_count",
      headerName: "StarCount",
      minWidth: 100,
      editable: false,
    },
    {
      field: "html_url",
      headerName: "GH Link",
      minWidth: 100,
      editable: false,
      renderCell: (params) => {
        const onClick = () => {
          const currentRow = params.row;
          return window.open(currentRow.html_url, "_blank");
        };

        return <button onClick={onClick}>Link</button>;
      },
    },
    {
      field: "star",
      headerName: "Star repo",
      minWidth: 100,
      sortable: false,
      renderCell: (params) => {
        const onClick = () => {
          getStarredRepos().some((e) => e.repoId === params.row.id)
            ? localStorage.unstarRepo(params.row.id)
            : localStorage.starRepo(params.row.id);
        };

        return StarHandleComponent(
          getStarredRepos().some((e) => e.repoId === params.row.id),
          onClick
        );
      },
    },
  ];

  return (
    <DataGrid
      rows={dataArray}
      columns={columns}
      slots={{ toolbar: CustomToolbar }}
      slotProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 15,
          },
        },
      }}
      pageSizeOptions={[5, 15, 50]}
      disableRowSelectionOnClick
    />
  );
}
