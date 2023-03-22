import react, { useEffect, useState } from "react"
import "./cards.css"
import Tilt from 'react-vanilla-tilt'
import img from '../charizard.png'
import Opening from "../Opening/opening"


function Card(props){
   
    const [emore, setEmore] = useState(false)
    const [tmore, setTmore] = useState(false)
    const [open, setOpen] = useState(false)

 
 
    
function openPopup () {
    if(!props.single){
    setOpen(true)
   props.setSingle(true)
    }
}

function closePopup () {
    if(props.single){
    setOpen(false)
    props.setSingle(false)
    }
}





   


   
   
    return (
        <div>
        <Tilt     style={{
        width: 210,
        backgroundColor: "none",
        
        
    }}
>
        <div className="card_wrapper" onClick={openPopup}>
      
            
            <div className="card" >
                <div className="card_contend">
                    <Tilt   id="tilt" 
>
                    <img className="card_img" src={props.img}/>

                    </Tilt>
                    <h3 className={props.title.length <20 ?"card_title" : "card_title2"}>{props.title}</h3>
                    <div className="prices">
                    <span className="card_price"><h6 className="card_price_eb">Ebay Price: </h6><h6 > ${props.ebayPrice[props.ebayPrice.length-1].price} CAD</h6></span>
                    </div>
                </div>

                
            </div>
           
        </div>
        </Tilt>
        {
          open? <Opening userId={props.userId} id={props.id} validation={open} title={props.title} img={props.img} links={props.links} price={props.ebayPrice} close={closePopup}/> : ""  
        }
        </div>
    )
}



export default Card