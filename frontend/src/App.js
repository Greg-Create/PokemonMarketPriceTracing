import logo from './logo.svg';
import './App.css';
import Card from './cards/cards'
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { set } from 'mongoose';
import {AiOutlineSearch} from "react-icons/ai"
import pokemon from "../src/pokemon.png"
import Module from "./Module/module"
import Login from './Login/Login';
import SignUp from './Signup/Signup';




function App() {


  useEffect(() => {
  getCards()},
  
  
   []);

  const [cards, setCard] = useState(null);
  const [value,setValue] = useState("");
  const [prices, setPrice] = useState("")
  const [title, setTitle] = useState("")
  const [links, setLinks] = useState("")
  const [payload,setPayload] = useState()
  const [module,setModule] = useState(false)
  const [open, setOpen] = useState(false)
  const [single, setSingle] = useState(false)
  const [signupPopup, setsignupPopup] = useState(false)
  const [loginPopup, setloginPopup] = useState(false)
  const [userToken, setUserToken] = useState(null)


const effectRan =useRef(false)

const [image, setImage] = useState("")
const [searched,setSearched] = useState(false)

  
const getCards = () => {
 //getCards()

  axios.get("http://localhost:3001/all/cards").then((res)=>{
    setCard(res.data)
    effectRan.current = true
  })
}
 


 

 
  /*const  sendData =  event => {
      let data = event.target.value
    setValue(data)
       axios.post("http://localhost:3001/analyser",  {"title": data})

    } */



    function sendData(e){
      setTitle("")
      setPrice("")
      setLinks("")


      let match2 = e.target.value.match(/\s*/)
     
      if(match2[0] === e.target.value){
        setPayload("")
        return
      }

      fetch("http://localhost:3001/search", {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({title: e.target.value})
      }).then(res => res.json()).then(data => {
        let payload = data.title
        console.log(payload)
        setPayload(payload)

        
      })
    }
 
    function handleOpen(e){

      setOpen(true)

      console.log(e)
      
      
      
      
          
      }
  
    const handleSubmit =async  (e) =>{
    e.preventDefault();
    console.log(value)
    //let  payload = {title: `${value}`}

    let res = await axios.post("http://localhost:3001/analyser",  {"title": value})
    let price =  res.data
  setPrice(price[0])  

setLinks(price[1])
setImage(price[2])
setTitle(value)
setValue("")
setPayload("")
setSearched(true)//getCards()
 
}

function closeModule () {
  setPrice("")
  setSearched(false)
  getCards()
  document.body.style.overflow = 'unset'
}
  
function logout() {
  setUserToken(null)
}

  return (
    <div className='mainCont'> 

   
      
       {!userToken?
        <div className='buttons'> 
        <button className="signup" type="button" onClick={()=> setsignupPopup(true)}>Sign Up</button>
        <button className='login' type="button" onClick={()=>setloginPopup(true)}>Login</button>
        </div>
    : 
    <div className='buttons'> 
    <h3 className="indicator">Logged In</h3>
    <button onClick={logout}>Logout</button>
    </div> }
       
       
      <div className='sector'>
     
      <div className='heading'>
    <h1>Pokemon Price analyser</h1>
    <div className='search'>
      <form onSubmit={handleSubmit}>
      <input className="searchbar" type="text" placeholder='Enter Card name' value={value} onKeyUp={sendData} onChange={event => setValue(event.target.value)} />
     <AiOutlineSearch className="searchbtn"  placeholder='Search Price' onClick={handleSubmit}/>
      </form>
    </div>
    <img className='logo' src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png" />
    </div>

    <Login trigger={loginPopup} setTrigger={setloginPopup} usertoken={setUserToken}>
              <h1>Login</h1>
      </Login>

      <SignUp  trigger={signupPopup} setTrigger={setsignupPopup} usertoken={setUserToken}>
                <h1>My login</h1>
            </SignUp>
    </div>
   
    {searched?

<Module title={title} price={prices} validation={searched} close={closeModule} img={image} link={links}/>
  /*  <div className='result'>
    <h2 className='searchttl'>{title}</h2>
    <h3 className='searchprc'>Price: ${prices} cad</h3>
    <br></br>
    <h2>Ebay Listings:</h2>
{(!links) ? "" :
 (links.map(link => <div><h4><a href={`${link.link}`}>{link.title}: ${link.price}</a></h4> </div>))}
    
    </div> */ :
    console.log("true")
  }
    
    <br></br>
    
    <div className='grid'>
    { (!cards) ?    ""  

 : (


      (payload)? payload.map(payload => <Card img={payload.image} title={payload.title} ebayPrice={payload.ebayPrice} trnPrice={payload.trnsprice} />) :
        cards.map(card => <Card userId={userToken} id={card._id} img={card.image} title={card.title} ebayPrice={card.ebayPrice} trnPrice={card.trnsprice} links={card.links} single={single} setSingle={setSingle} />)
          
        
         )
}
      
      
    </div>
    </div>
     
                
             
  )


    
}

export default App;
