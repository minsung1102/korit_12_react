import { Container, AppBar, Toolbar, Typography, List, ListItem, ListItemText, IconButton, Button, Checkbox, ListItemIcon } from '@mui/material';
import { useState } from 'react';
import AddTodo from './components/AddTodo';
import './App.css';

// 1. 타입 확장: 완료 여부를 추적하는 completed 추가
export type Todo = {
  study: string;
  type: string;
  time?: number;
  completed: boolean; // 체크 상태 저장
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addItem = (todo: Todo) => {
    // 새 항목은 기본적으로 완료되지 않은 상태(false)로 하사합니다.
    setTodos([{ ...todo, completed: false }, ...todos]);
  }

  const deleteItem = (index: number) => {
    if (window.confirm("이 할 일을 정말 삭제하시겠습니까?")) {
      setTodos(todos.filter((_, i) => i !== index));
    }
  }

  // 2. 토글 기능: 체크박스를 누르면 완료 상태를 반전시킵니다.
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
              {/* 3. 체크박스 영역 */}
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={item.completed}
                  onChange={() => toggleTodo(index)}
                  color="success" // 완료 시 제국의 평화를 상징하는 초록색
                />
              </ListItemIcon>
              
              {/* 4. 완료 시 텍스트에 취소선 효과 하사 */}
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