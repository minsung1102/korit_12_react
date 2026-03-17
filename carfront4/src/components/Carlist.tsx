import { useQuery, useMutation,useQueryClient } from "@tanstack/react-query";
import { getCars, deleteCar } from "../api/carapi";
import { DataGrid, GridCellParams, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Snackbar, Button, IconButton, Tooltip, Stack } from "@mui/material";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useState } from "react";
import AddCar from "./AddCar";
import EditCar from "./EditCar";
import { Add } from "@mui/icons-material";

type CarlistProps = {
  logout? : () => void; 
}

export default function Carlist({ logout } : CarlistProps) {
  const [ open, setOpen ] = useState(false);
  const queryClient = useQueryClient();

  const columns: GridColDef[] = [
    {field: 'brand', headerName: '브랜드', width: 200,},
    {field: 'model', headerName: '모델명', width: 200,},
    {field: 'color', headerName: '색상', width: 200,},
    {field: 'registrationNumber', headerName: '차량 번호', width: 200,},
    {field: 'modelYear', headerName: '제조 년도', width: 200,},
    {field: 'price', headerName: '가격', width: 200,},
    {
      field: '추가',
      headerName: '',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => <EditCar cardata={params.row} />
    },

    {
      field: '삭제',
      headerName: '',
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <Tooltip color="error" title='delete car'>
          <IconButton aria-label="delete" size="small"
            onClick={() => {
              if(confirm(`${params.row.brand}의 ${params.row.color} ${params.row.model}을 삭제하시겠습니까?`)) {
                mutate(params.row._links.self.href);
              }   
            }}
          >
            <DeleteForeverRoundedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )
    },
  ]

  const { data, error, isSuccess } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars
  });

  const { mutate } = useMutation(deleteCar, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: [ 'cars' ]});
    },
    onError: err => {
      console.log(err);
    },
  })

  if(!isSuccess) {
    return <span>Loading...</span>
  }
  else if (error) {
    return <span>자동차 데이터를 가져오던 중 오류가 발생했습니다...</span>
  }
  else {
    return (
      <>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <AddCar />
        <Button onClick={logout}>로그아웃</Button>
        </Stack>
      <DataGrid
        rows={data}
        columns={columns}
        disableRowSelectionOnClick={true}
        getRowId={row => row._links.self.href}
        slots={{ toolbar: GridToolbar }}
      />
      <Snackbar 
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message='해당 차량 정보가 삭제되었습니다.❌'
      />
      </>
    );
  }
}