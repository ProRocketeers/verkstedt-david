import * as React from 'react';
import getRepositories from '../api'
import { Repository } from '../types/';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getStarredRepos, useLocalStorage } from '../utils/starRepo'
import { CustomToolbar } from './CustomDatagridToolbar'

export default function BasicTable() {
  const localStorage = useLocalStorage();

  const [data, setData] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    async function fetchData() {
      const repositories = await getRepositories();
      setLoading(false);
      setData(repositories);
    }
    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', minWidth: 90 },
    {
      field: 'name',
      headerName: 'Repo name',
      minWidth: 200,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Desc',
      minWidth: 300,
      editable: false,
    },
    {
      field: 'language',
      headerName: 'Lang',
      minWidth: 100,
      editable: false,
    },
    {
      field: 'stargazers_count',
      headerName: 'StarCount',
      minWidth: 100,
      editable: false,
    },
    {
      field: 'html_url',
      headerName: 'GH Link',
      minWidth: 100,
      editable: false,
      renderCell: (params) => {
        const onClick = () => {
          const currentRow = params.row;
          return window.open(currentRow.html_url, "_blank");
        };
        
        return (
          <button onClick={onClick}>Link</button>
        );
      }
    },
    {
      field: "star",
      headerName: "Star repo",
      minWidth: 100,
      sortable: false,
      renderCell: (params) => {
        const onClick = () => {
          console.log(getStarredRepos())
          console.log(getStarredRepos().includes(params.row.id))

          if (getStarredRepos().some(e => e.repoId === params.row.id)) {
            localStorage.unstarRepo(params.row.id);
            return;
          }
          localStorage.starRepo(params.row.id);
        };
        
        return (
          getStarredRepos().some(e => e.repoId === params.row.id) ? 
            <StarIcon onClick={onClick} className='pointer' />
          :
            <StarBorderIcon onClick={onClick} className='pointer' />

        );
      },
    }
  ];
  
  return (
    <>
    {loading ? (
      <Box sx={{ margin: '0 auto' }}>
        <CircularProgress />
      </Box>
    ) : 
    (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={data}
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
    </Box>
    )
  }
  </>
  );
}
