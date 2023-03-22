import React, { useEffect, useState, useRef } from "react"
import './signUp.css'
import {AiOutlineClose} from 'react-icons/ai'
import axios from "axios"




const SignUp =(props) => {

        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        
        function authenticateSignUp () {

            const params = {"email" : email, "password": password}
            axios.post("http://localhost:3001/api/register", params).then((res)=>{
                if(res){
                    console.log(`Succesfully SignuedUp User: ${res.token}`)
                }else{
                    console.log("SignUp Unssusceful")
                }
              })
           }

        let backup = ""
        
    
   
      function close  ()   {
          props.setTrigger(false)
           backup = "module-closed"
           console.log("module closed")
       
        }

    const menuRef = useRef()
  
    useEffect(() =>{
    
    const checkifclickedouside = e => {
        if (props.trigger && !menuRef.current.contains(e.target)){
            props.setTrigger(true)
    }}

    document.addEventListener("mousedown", checkifclickedouside)

    return () => {
        document.removeEventListener("mousedown", checkifclickedouside)
    }
    
    }, [props.trigger])

    

    return ( (props.trigger) ? (
    <div className={`gpt__login  ${backup}`} ref={menuRef}>
        <div className="gpt__login-content ">
            <h1>Sign Up</h1>
       
        <div className="gpt__login-content_form-container"> 
            <div className="gpt__login-content_form email">
                <label for="email">Email</label>
                <input type="text" id="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
            </div>

            <div className="gpt__login-content_form password">
                <label for="password">Password</label>
                <input type="password" id="password" placeholder="Enter Password"  value={password} onChange={(event) => setPassword(event.target.value)}/>
            </div>

            <div className="gpt__login-content_form submit">
                <button type="submit" onClick={authenticateSignUp}> Submit</button>
            </div>
            <AiOutlineClose className="login-close-button" onClick={close}/>
        </div>  

        
        
        
        
        </div>

       
            

    </div>

    ) : ""


    
    )
    
}

export default SignUp