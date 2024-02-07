import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useContext, useState } from 'react';
import './styles.css';
import AuthContext from '../components/AuthContext';
import { Link } from '@mui/material';

const Login = () => {

  const [user, setUser] = useState({
    username:"", password:""
  })
  const {login} = useContext(AuthContext);

  const handleInputs = function(e){
    let name = e.target.name;
    let value = e.target.value;

    setUser({...user,[name]:value});
  }

  const handleSubmit=async (e)=>{
    console.log(user);
    e.preventDefault();
    await login(user)
  }

  return (
    <>
    <div className='main'>
      <div className="box">
        <form onSubmit={handleSubmit}>
          <TextField name="username" value={user.username} onChange={handleInputs} type="text" id="outlined-basic" fullWidth={true} label="Your Username" variant="outlined" />
          <TextField name="password" value={user.password} onChange={handleInputs} type="password" id="outlined-basic" fullWidth={true} label="Your Password" variant="outlined" />
          <Button onClick={handleSubmit} color="error" variant="contained">Login</Button>
        </form>
        <Link href="/register" underline='none'>{'Not Registered ?'}</Link>
      </div>
    </div>
    </>
  )
}

export default Login;
