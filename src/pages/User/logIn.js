import axios from 'axios';
import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import { MdTextsms } from "react-icons/md";
import {HiMail} from 'react-icons/hi'
import {MongoClient, ObjectId} from 'mongodb'
import './user.scss'
import WorkoutDetails from './workoutdetails';

const { screen, setScreen } = props;

const LogIn = () => {


    return (
        <>

        <UserForm></UserForm>
        </>
    )
}


const mongoClient = new MongoClient(
    'mongodb+srv://eguzmandls:qivPxBAySCsC7hZx@mfj.fst9gm9.mongodb.net/?retryWrites=true&w=majority'
)


const data = await mongoClient
    .db()
    .collection('mfjuser')
    .find()
    .toArray()
    
    console.log(data)

const UserForm = () =>{
    
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
//Testing variables
const [counter, setCounter] = useState(0)
axios.defaults.withCredentials= true;

const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post('https://mfjserver.vercel.app/authenticate', {username:username, password:password})
    .then(result => console.log(result))
    .catch(err => console.log(err))
    
}

const readCookie = async () => {
    try {
      const res = await axios.get('/read-cookie');
      
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };
  useEffect(() => {
    readCookie();
  }, []);




    return(
    <>
    Counter<br/>
    <label>{counter}</label>
    User<br/>
    <label>{username.data}</label>


    <form className="user-form" id='login' onSubmit={handleSubmit} >
    <label htmlFor="login">Username:
    <input type="text" value={username} onChange={(e) =>setUsername(e.target.value)}/>
    </label>
    <label htmlFor="login">Password:
    <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)}/><br/>
    </label>

    <button type="submit" >Log In</button>
    <hr/>
    <h4>Password Recovery</h4>
    <div className='icon_row'>
        <Link><HiMail size={30} color="#783740"/></Link>
        
    </div>
    <div className='icon_row'>
    <Link><MdTextsms size={30} color="#783740"/></Link>
    </div>
    <Link></Link>
</form>
    </>)
}


export default LogIn;
