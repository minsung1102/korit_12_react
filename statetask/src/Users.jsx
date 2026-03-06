import { useState } from "react"

export default function Users() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');

    const handleSubmit = event => {
        alert(`Hello ${username}님! 비밀번호는 ${password}, 이메일은 ${email}입니다`);
        event.preventDefault();
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>User Name</label> <br />
            <input type="text" onChange={event => {setUsername(event.target.value)}} value={username}/> <br />

            <label>Password</label> <br />
            <input type="text" onChange={event => {setPassword(event.target.value);}} value={password}/> <br />

            <label>Email</label> <br />
            <input type="text" onChange={event => {setEmail(event.target.value);}} value={email}/> <br /><br />
            
            <input type="submit"/>
        </form>
    )
}