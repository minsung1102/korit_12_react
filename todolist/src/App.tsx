import { Container, AppBar, Toolbar, Typography, List, ListItem, ListItemText, IconButton, Button, Checkbox, ListItemIcon } from '@mui/material';
import { useState } from 'react';
import AddTodo from './components/AddTodo';
import './App.css';

export type Todo = {
  study: string;
  type: string;
  time?: number;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addItem = (todo: Todo) => {
    setTodos([{ ...todo, completed: false }, ...todos]);
  }

  const deleteItem = (index: number) => {
    if (window.confirm("이 할 일을 정말 삭제하시겠습니까?")) {
      setTodos(todos.filter((_, i) => i !== index));
    }
  }

  const toggleTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  }

  return (
    <>
      <Container>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>
              하기 싫은 해야 할 일들
            </Typography>
          </Toolbar>
        </AppBar>
        <AddTodo addItem={addItem} />
        <List>
          {todos.map((item, index) => (
            <ListItem key={index} divider>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={item.completed}
                  onChange={() => toggleTodo(index)}
                  color="success"
                />
              </ListItemIcon>
              
              <ListItemText 
                primary={item.study}
                secondary={`${item.type} | ${item.time}분`}
                sx={{ 
                  textDecoration: item.completed ? 'line-through' : 'none',
                  color: item.completed ? 'text.disabled' : 'text.primary'
                }}
              />
              
              <Button color='error' onClick={() => deleteItem(index)}>
                삭제
              </Button>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  )
}

export default App;