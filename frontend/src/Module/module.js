import react, { useEffect, useState } from 'react'
import "./module.css"
import axios from 'axios'


import {LineChart,Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'



function Opening (props) {

const [link,setlinks] = useState("")
const [done, setDone] = useState(false)
const [list, setList] = useState()
   
const overtime = []

useEffect(() =>{
   console.log(props.img)
   document.body.style.overflow = 'hidden';
    


  
 }, [])




 return(
    props.validation? 
<div className='shadow'>
    <div className='module'>
       
            <div className='container'>
                <h1 className="title"> {props.title.toUpperCase()}</h1>
                <button className="close" onClick={() => {props.close()}}>Close</button>
            </div>

<div className='container2'>
            <img className="image" src={props.img}/>
            <div className='container3'>
                 <h2 className='price'>${props.price} CAD</h2>
                
       </div>
       </div>  
       <div className='links'>
        <h3 className="linkHeader">Active Ebay Listings:</h3>
        {(!props.link) ? "" :
 (props.link.map(link => <a className='link' href={`${link.link}`}>{link.title}: ${link.price}</a>))}
    
    
    
 </div> 

    </div>
</div>
: ""



)
}

export default Opening