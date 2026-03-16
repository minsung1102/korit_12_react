import { DialogContent, TextField, Stack } from "@mui/material";
import { Car } from "../types";

type DialogFormProps = {
  car: Car;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CarDialogContent({ car, handleChange }: DialogFormProps){

  return(
    <>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField type="text" label="차량 브랜드" name='brand' value={car.brand} onChange={handleChange}  /><br />
          <TextField type="text" label="차량 모델" name='model' value={car.model} onChange={handleChange} /><br />
          <TextField type="text" label="차량 색상" name='color' value={car.color} onChange={handleChange} /><br />
          <TextField type="text" label="차량 번호" name='registrationNumber' value={car.registrationNumber} onChange={handleChange} /><br />
          <TextField type="number" label="제조 년도" name='modelYear' value={car.modelYear} onChange={handleChange} /><br />
          <TextField type="number" label="차량 가격" name='price' value={car.price} onChange={handleChange} /><br />
        </Stack>
      </DialogContent>
    </>
  );
}