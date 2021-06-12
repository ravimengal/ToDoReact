import React ,{useState} from 'react'
import { Card} from 'react-bootstrap'
import { auth } from '../firebase'
import {useHistory} from 'react-router-dom'

export default function Login() {

    const [email,setEmail]=useState('')
    const [password, setPassword]=useState('')
    const history = useHistory()
    const handleSubmit= async (e)=>{

        e.preventDefault();
        console.warn(email,password) //to check  email password working or not

        try{
            const result = await auth.signInWithEmailAndPassword(email, password)
            alert(`welcome ${result.user.email}`)
            history.push('/')

        }catch(err){
            alert(`failed to login PLEASE SIGNUP `)
            history.push('/signup')


        }
        
    }

    return (
        <div>
            <Card className="bg-secondary shadow-lg p-3 mb-5 bg-white rounded"  style={{width:'30rem', height:'20rem' }} >
            <div className=" container text-center ">

            <h3>Please login</h3>

            <form onSubmit={(e)=>handleSubmit(e)}>

                <div className="form-floating mb-3">
                    <input type="email"  value={email} className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e)=>setEmail(e.target.value)}/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating ">
                    <input type="password" value={password} className="form-control" id="floatingPassword" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button type="submit" className="btn btn-login btn-success">Login</button>


            </form>
            </div>
            </Card>
        </div>
    )
}
