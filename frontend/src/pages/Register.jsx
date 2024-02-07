import Button from "@mui/material/Button"
import { Link, TextField } from "@mui/material"
import { useContext, useState } from "react"
import AuthContext from "../components/AuthContext"

const Register = () => {
  const [user, setUser] = useState({
    username:"", password:"", email:""
  })
  const { register } = useContext(AuthContext);

  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({...user, [name]:value});
  }

  const handleSubmit = async(e) => {
    console.log(user);
    e.preventDefault();
    await register(user);
  }
  return (
    <div className="main">
      <div className="box">
        <form onSubmit={handleSubmit}>
          <TextField name="username" value={user.username} onChange={handleInputs} type="text" id="outlined-basic" fullWidth={true} label="Enter Username" variant="outlined"/>
          <TextField name="email" value={user.email} onChange={handleInputs} type='email' id="outlined-basic" fullWidth={true} label="Enter Email" variant="outlined"/>
          <TextField name="password" value={user.password} onChange={handleInputs} type="password" id="outlined-basic" fullWidth={true} label="Enter Password" variant="outlined" />
          <Button type="submit" color="error"variant="contained">Register</Button>
        </form>
        <Link href="/login" underline="none">{'Already have an account ?'}</Link>
      </div>
    </div>
  )
}

export default Register;
