import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { useHistory } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa';


let unsubscribe = () => {
}

export default function Todo({ user }) {

    const [text, setText] = useState('')
    const [mytodos, setTodos] = useState([])
    const history = useHistory()

    useEffect(() => {
        if (user) {
            const docRef = db.collection('todos').doc(user.uid)
            unsubscribe = docRef.onSnapshot(docSnap => {    //to stop it to run in background
                if (docSnap.exists) {
                    console.log(docSnap.data().todos)
                    setTodos(docSnap.data().todos)
                } else {

                    console.log(`no data found`)
                }
            })
        } else {
            history.push('/login')
        }
        return () => {
            unsubscribe();   //for cleanup purpose 
        }

    }, [])
    const addTodo = () => {
        db.collection('todos').doc(user.uid).set({
            todos: [...mytodos, text]

           
        })
        
        
        
    }

    
    const deleteTodo = (deleteTodo) => {

        const docRef = db.collection('todos').doc(user.uid)
        docRef.get().then(docSnap => {
            const result = docSnap.data().todos.filter(todo => todo !== deleteTodo)
            docRef.update({
                todos: result
            })
        })
    }
    const resetInput = (e) => {
        e.target.value = "";
      }

    const colors = [
        {
            primaryColor: "#5D93E1",
            secondaryColor: "#ECF3FC"
        },
        {
            primaryColor: "#F9D288",
            secondaryColor: "#FEFAF1"
        },
        {
            primaryColor: "#5DC250",
            secondaryColor: "#F2FAF1"
        },
        {
            primaryColor: "#F48687",
            secondaryColor: "#FDF1F1"
        },
        {
            primaryColor: "#B964F7",
            secondaryColor: "#F3F0FD"
        }
    ]


    return (
        <>
            <div className="container">
                <div className="addtodowithdiscription">
                    <div className="form-floating mb-3 mt-5">
                        <input type="text"  onFocus={(e) => resetInput(e)} className="form-control text-align-center" id="floatingInput" placeholder="Add Task with Description" onChange={(e) => setText(e.target.value)} />
                        <label htmlFor="floatingInput" >Add Task with Description</label>
                    </div>
                    <button type="submit" className="btn btn-login btn-primary" onClick={() => { addTodo() }}>Create Task</button>
                    
                </div>
            </div>



            <div className="task-container">
                {
                    mytodos.map((todo, index) => {

                        return <>
                            <div class="card-wrapper mr-5">
                                <div class="card-top" style={{ "background-color": colors[index % 5].primaryColor }}></div>
                                <div class="task-holder">
                                    <span class="card-header" style={{ "background-color": colors[index % 5].secondaryColor, "border-radius": "10px" }}>Task ToDo</span>
                                    <p className="mt-3">{todo}</p>

                                    <div style={{ "position": "absolute", "right": "20px", "bottom": "20px" }}>
                                        <FaTrash onClick={() => { deleteTodo(todo) }} />
                                    </div>
                                </div>
                            </div>



                        </>
                    })
                }
            </div>

        </>


    )
}
