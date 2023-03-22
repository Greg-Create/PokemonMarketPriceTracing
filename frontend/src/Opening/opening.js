import react, { useEffect, useState } from 'react'
import "./opening.css"
import axios from 'axios'


import {LineChart,Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'



function Opening (props) {

const [link,setlinks] = useState("")
const [done, setDone] = useState(false)
const [list, setList] = useState()
   
const overtime = []

useEffect(() =>{
   
setDone(false)
    
    for(let i=0;i<props.price.length;i++){
        let cards = props.price[i]
        let prices = cards.price
     let date =  cards.date.substring(0,9)
     //console.log(prices)
       
        overtime.push({
            price: prices,
            date : `${date}`
        })


    }

    getLinks()


  
 }, [])

function getLinks () {
    console.log(props.id)
        axios.get(`http://localhost:3001/all/${props.id}`).then((res)=>{
            const data = res.data
            setlinks(data.links)
            console.log("Links been recieved")
            setDone(true)
setList(overtime)
            
        })


}


let data = [{
    price: 12,
    date: '1'
},

{
    price: 13,
    date: '2'
},

{
    price: 14,
    date: '2'
},

]


function addCard() {
    
}





 return(
    done?
    props.validation? 
<div className='shadow'>
    <div className='module'>
       
            <div className='container'>
                <h1 className="title"> {props.title.toUpperCase()}</h1>
                <button className="close" onClick={() => {props.close()}}>Close</button>
            </div>

<div className='container2'>
            <img className="image3" src={props.img}/>
            <div className='container3'>
                 <h2 className='price'>${props.price[props.price.length-1].price} CAD</h2>
                 { <LineChart width={600} height={310} data={list} className="chart"stroke="#ee1515">
       <Line  dataKey="price" stroke="#ee1515"  isAnimationActive={true} strokeWidth={4}/>
       <CartesianGrid strokeDasharray="3 3" />

       <XAxis dataKey="date" stroke="#f0f0f0"/>
       <YAxis stroke="#f0f0f0   " />
       <Tooltip /> 
       </LineChart>}
       </div>
       </div>  
       <div className='links2'>
        <h3 className="linkHeader">Active Ebay Listings:</h3>
        {
            link? (link.map(link => <a className='link' href={`${link.link}`}>{link.title} : ${link.price} CAD</a>)): ""
        }
 </div> 

 <button onClick={addCard}>Add to List</button>

    </div>
</div>
: ""
:
""
)
}

export default Opening