import { Container, AppBar, Toolbar, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';
import AddItem from './components/AddItem';
import './App.css';

export type Item = {
  product: string;
  amount: string;
  price?: number;
}

function App() {
  const [ items, setItems ] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setItems([item,...items]);
  }

  return (
    <>
      <Container>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>
              Shopping List
            </Typography>
          </Toolbar>
        </AppBar>
        <AddItem addItem={addItem} />
        <List>
          {
            items.map((item, index) => 
              <ListItem key={index} divider>
                <ListItemText 
                  primary={item.product}
                  secondary={`${item.amount}개 | ${item.price}원`}
                />
              </ListItem>
            )
          }
        </List>
      </Container>
    </>
  )
}

export default App


// # 과제
// - 공통 사항 :
//   1. npm create vite@4.4
//   2. react / TS
//   3. shoppinglist를 참조하여 변형

// ## 1. shoppinglist2
//   1. Item 자료형 내에 price: number;를 추가할 것.
//   2. TextField에 price를 나타내는 부분을 추가할 것.
//   3. secondary가 되면 primary에 product / secondary에 amount / secondary에 price로 표시하여
//   4. shoppinglist와 동일한 기능을 하도록 작성할것

// ## 2. todolist
//   1. MUI 적용해서 만들 것
//   2. 이전에 JS 이용 방법과 달리 Dialog 컴포넌트를 활용하여 AddTodo 버튼을 눌렀을 때 모달창이 뜨도록 할 것.
//   3. 나머지 자유 알아서