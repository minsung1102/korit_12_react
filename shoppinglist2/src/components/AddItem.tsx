import { useState } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { Item } from "../App";
// 4번 라인의 경우 전에는 types.ts에서 불러왔었습니다.

type AddItemProps = {
  addItem: (item: Item) => void;
}

export default function addItem(props: AddItemProps) {
  const [ open, setOpen ] = useState(false);
  const [ item, setItem] = useState<Item>({
    product: '',
    amount: '',
    price: 0,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addItem = () => {
    props.addItem(item);  // 항목을 추가하는 상위 컴포넌트의 함수 addItem()
    // 그다음에 TextField value를 지울겁니다.
    setItem({product:'', amount:'', price: 0})
    handleClose();
  }

  return(
    <>
      <Button onClick={handleOpen} variant="outlined">ADD Item</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Item</DialogTitle>
        <DialogContent>
          <TextField value={item.product} label='Product' margin="dense" fullWidth
            onChange={ e => setItem({...item, product: e.target.value})}
          />
          <TextField value={item.amount} label='amount' margin="dense" fullWidth
            onChange={ e => setItem({...item, amount: e.target.value})}
          />
          <TextField value={item.price} label='price' margin="dense" fullWidth type="number"
            onChange={ e => setItem({...item, price:Number(e.target.value) || 0})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={addItem}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}