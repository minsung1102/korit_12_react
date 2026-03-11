import { useState } from "react";
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { Todo } from "../App";
// 4번 라인의 경우 전에는 types.ts에서 불러왔었습니다.

type AddItemProps = {
  addItem: (todo: Todo) => void;
}

export default function addItem(props: AddItemProps) {
  const [ open, setOpen ] = useState(false);
  const [ todo, setTodo] = useState<Todo>({
    study: '',
    type: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const addItem = () => {
    props.addItem(todo);  // 항목을 추가하는 상위 컴포넌트의 함수 addItem()
    // 그다음에 TextField value를 지울겁니다.
    setTodo({study:'', type:'', time: 0})
    handleClose();
  }

  

  return(
    <>
      <Button onClick={handleOpen} variant="outlined">할 일 추가</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Item</DialogTitle>
        <DialogContent>
          <TextField value={todo.study} label='할일' margin="dense" fullWidth
            onChange={ e => setTodo({...todo, study: e.target.value})}
          />
          <TextField value={todo.type} label='종류' margin="dense" fullWidth
            onChange={ e => setTodo({...todo, type: e.target.value})}
          />
          <TextField value={todo.time} label='분' margin="dense" fullWidth type="number"
            onChange={ e => setTodo({...todo, time:Number(e.target.value) || 0})}
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