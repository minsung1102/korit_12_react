import { useState } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { Item } from "../App";

type AddItemProps = { 
  addItem: (item: Item) => void;
}

export default function AddItem(props: AddItemProps) {
  const [ open, setOpen ] = useState(false);
  const [ item, setItem] = useState<Item>({
    product: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addItem = () => {
    props.addItem(item);
    setItem({product:'', amount: 0, price: 0});
    handleClose();
  }

  return(
    <>
      <br />
      <Button onClick={handleOpen} variant="outlined">항목 추가 </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>새 항목</DialogTitle>
        <DialogContent>
          <TextField value={item.product} label='품목' margin="dense" fullWidth
            onChange={ e => setItem({...item, product: e.target.value})}
          />
          <TextField value={item.amount} label='수량' margin="dense" fullWidth
            onChange={ e => setItem({...item, amount:Number(e.target.value) || 0})}
          />
          <TextField value={item.price} label='가격' margin="dense" fullWidth type="number"
            onChange={ e => setItem({...item, price:Number(e.target.value) || 0})}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>
            취소
          </Button>
          <Button onClick={addItem}>
            추가
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}