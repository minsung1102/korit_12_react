import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Car } from "../types";
import { useState } from "react";
import { addCar } from "../api/carapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function AddCar() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cars']);
    },
    onError: err => console.log(err),
  });


  const [ open, setOpen ] = useState(false);
  const [ car, setCar ] = useState<Car>({
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
  });

  //한줄 짜리라서 필요없을 것 같지만
  const handleClickOpen = () => setOpen(true);
  const handleClickClose = () => setOpen(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCar({...car, [event.target.name]: event.target.value});
  }

  const handleSave = () => {
    mutate(car);    // 얘가 carapi.ts에 있는 addCar()함수에 해당합니다.
    setCar({
      brand: '',
      model: '',
      color: '',
      registrationNumber: '',
      modelYear: 0,
      price: 0,
    });
    handleClickClose();
  }

  return(
    <>
      <button onClick={handleClickOpen}>New Car</button>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>New Car</DialogTitle>
        <DialogContent>
          <TextField value={car.brand} label='브랜드명' margin="dense" fullWidth
            onChange={ e => setCar({...car, brand: e.target.value})}
          />
          <TextField value={car.model} label='모델명' margin="dense" fullWidth
            onChange={ e => setCar({...car, model: e.target.value})}
          />
          <TextField value={car.color} label='색상' margin="dense" fullWidth
            onChange={ e => setCar({...car, color: e.target.value})}
          />
          <TextField value={car.registrationNumber} label='차량번호' margin="dense" fullWidth
            onChange={ e => setCar({...car, registrationNumber: e.target.value})}
          />
          <TextField value={car.modelYear} label='모델 년도' margin="dense" fullWidth
            onChange={ e => setCar({...car, modelYear:Number(e.target.value)})}
          />
          <TextField value={car.price} label='가격' margin="dense" fullWidth
            onChange={ e => setCar({...car, price:Number(e.target.value)})}
          />

        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClickClose}>취소</Button>
          <Button color="primary" onClick={handleSave}>저장</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}