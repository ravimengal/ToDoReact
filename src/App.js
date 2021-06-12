import React, {useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router,Route , Switch} from 'react-router-dom'
import NavBar from './components/NavBar'
import Login from './components/Login';
import Signup from './components/Signup';
import Todo from './components/Todo';
import {auth} from './firebase'
function App() {


  const [user,setUser]=useState(null)


  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user=>{
              if(user) setUser(user)
              else setUser(null)
          })
          return ()=>{
            unsubscribe()
          }
  },[])


  return (
    <>
      <Router>

        <NavBar user={user} />

      <Switch>
        <Route exact path="/">
          <Todo user={user}/>
        </Route>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>
        </Switch>

      </Router>
    </>
  );
}

export default App;
