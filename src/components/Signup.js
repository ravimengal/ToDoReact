import React ,{useState } from 'react'
import {  Card} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import { auth } from '../firebase'
import './Open.css'


export default function Signup() {

    const [email,setEmail]=useState('')
    const [password, setPassword]=useState('')
    const history = useHistory()
    const [passwordConfirm , setPasswordConfirm] = useState('')
    

    const handleSubmit= async (e)=>{

        e.preventDefault();

        if (password !== passwordConfirm) {
            return alert(`Passwords do not match`)
          }
        console.warn(email,password) //to check  email password working or not
         try{

            const result = await auth.createUserWithEmailAndPassword(email,password)
            alert( `Successful create account ${result.user.email}`)
            history.push('/')
         }catch(err)
         {
            alert( `failed to signup`)
       
         }
        
    }

    return (
        <div>
        <Card className="bg-secondary shadow-lg p-3 mb-5 bg-white rounded"  style={{width:'30rem', height:'23rem' }} >
        <div className=" container text-center ">

        <h3>Please Signup</h3>

        <form onSubmit={(e)=>handleSubmit(e)}>

            <div className="form-floating mb-3">
                <input type="email" value={email} className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)}/>
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating ">
                <input type="password"  value={password} className="form-control" id="floatingPassword" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-floating mt-3 ">
                <input type="password" value ={passwordConfirm} className="form-control" id="floatingPassword" placeholder="Password" onChange={(e)=>setPasswordConfirm(e.target.value)}/>
                <label htmlFor="floatingPassword">Confirm Password</label>
            </div>
            <button type="submit" className="btn btn-sign btn-success">Signup</button>
            <div className="toast-body">
                   
        </div>



        </form>
        </div>
        </Card>
    </div>
    )
}
