import axios from "axios";
import { useState } from "react";
import { Button, TextField, Stack, Snackbar } from "@mui/material";
import Carlist from "./Carlist";

  type User = {
    username: string;
    password: string;
  }

export default function Login() {
  const [open, setOpen ] = useState(false);
  const [ user, setUser ] = useState<User>({
    username: '',
    password: '',
  });
  
  const [ isAuthenticated, setAuth ] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [event.target.name]: event.target.value});
  }

  const handlelogin = () => {
    // 탬플릿 리터럴도 안 쓰고 제작
    axios.post(import.meta.env.VITE_API_URL + '/login', user, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      const jwtToken = res.headers.authorization;
      console.log(jwtToken);
      if(jwtToken !== null && jwtToken !== undefined) {
        localStorage.setItem('jwt', jwtToken);
        setAuth(true);
      }
    })
    .catch(() => setOpen(true));
  };

  const handlelogout = () => {
    setAuth(false);
    localStorage.setItem('jwt', '');
  }

  if(isAuthenticated) {
    return <Carlist logout={handlelogout}/>;
  }
  else {
    return(
      <>
        <Snackbar 
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message='ID 혹은 비밀번호가 틀렸습니다.'  
        />
        <Stack spacing={2} alignItems='center' mt={2}>
          <TextField name='username' label='Username' onChange={handleChange}></TextField>
          <TextField name='password' label='Password' onChange={handleChange}></TextField>
          <Button
            variant="outlined"
            color='primary'
            onClick={handlelogin}
          >
          로그인
          </Button>
        </Stack>
      </>
    );
  }
}