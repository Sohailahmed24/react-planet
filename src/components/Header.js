import { createSearchParams, Link, useNavigate } from "react-router-dom"
import { IMG_offers, IMG_Order, IMG_URL, LOGO_URL } from "../utils/constants"


import { useCallback,  useMemo, useState } from "react"

import { useDispatch, useSelector } from "react-redux"

import Modal from "../Authentication/Modal"
import { fetchSearchCard } from "../app/SearchCardSlice"
import SearchCard from "./SerachCard"
import useOnlineStatus from "../utils/useOnlineStatus"


const Header=()=>{
  

     const user=useSelector(state=>state.user.user)
   
   const [pageShow,setPageShow]=useState(true)
   const dispatch=useDispatch()
   const status=useOnlineStatus
   const [showModal,setShowModal]=useState(false)
   const [showDiv,setShowDiv]=useState(false)
   const [inputText,setInputText]=useState("")
   const navigate=useNavigate()
 
   


   const handleNavigation=(url,searchParams={})=>{
    navigate({
      pathname:url,
      search:`?${createSearchParams(searchParams)}`
    })
  }
   
  const handleHomeOffers=useCallback((url)=>{
    handleNavigation("/homePageCuisine",{url})
   },[handleNavigation])
   

   




  
   const handleSignIn=useCallback(()=>{
      setShowModal(true)
      setPageShow(true)
   },[]
   )
   const handleLogin=useCallback(()=>{
      setShowModal(true)
      setPageShow(false)
   },[]
   )
   

   const handleAccount=useCallback(()=>{
   
    navigate(`/Account/Profile`)
   },[navigate])

 
   const handleChange=(e)=>{
    if(e.target.value.length >=0){
      setShowDiv(true)
    }
    setInputText(e.target.value)
     dispatch(fetchSearchCard(e.target.value))
   
   
   }
   const handleDive=(e)=>{
    
    if(e.target.id === "outerContainer") 
       {
        
          setShowDiv(false)
          setInputText("")
            
      }
 }
 
   

   

   const userSection=useMemo(()=>{
    if(user){

        return (
          <>
          <span>
          <img className="w-[25px]  text-rose-700" src={IMG_offers} alt="order img" />
          
        </span>
            <li className="px-4  hover:bg-rose-600  rounded-lg">
              <button onClick={()=>handleHomeOffers("search?content=offers")}>Offers</button>
            </li>
            <span>
                <img className="w-[25px]  text-rose-700" src={IMG_Order} alt="order img" />
                
              </span>
            <li className="px-4  hover:bg-rose-600 rounded-lg">
              
              <h1>Orders</h1>
            </li>
            <span>
                <img className="w-[25px]" src={IMG_offers} />
              </span>
            <li className="px-4  hover:bg-rose-600 rounded-lg">
              
              <h1 onClick={handleAccount}>Account</h1>
            </li>
            <li className="px-4  hover:bg-rose-600 rounded-lg">
              <h1>{user.FirstName.charAt(0).toUpperCase()}</h1>
            </li>
          </>
      )
    }
    return (
      <>
        <li>
          <button onClick={handleSignIn} className="px-4  hover:bg-rose-600 rounded-lg">Sign In</button>
        </li>
        <span className="mx-5">Or</span>
        <li>
          <button onClick={handleLogin} className="px-4  hover:bg-rose-600 rounded-lg">Register</button>
        </li>
      </>
    );
   },[user, handleHomeOffers, handleAccount, handleSignIn, handleLogin])
   
    return(
      <div id="outerContainer" onClick={handleDive} className="flex justify-between items-center ">
        <Link to="/">
        <div className="w-40 m-6 " >
            <img className="logo" src={LOGO_URL} />
           
         </div>
        </Link>
  
            <div >
            <input type="text" value={inputText} placeholder="search" onChange={handleChange} className="border-2 border-gray-200 px-24 py-2 rounded-md" />
            <SearchCard isVisible={showDiv} onClose={()=>setShowDiv(false)}  />
           
            </div>
         <div className="flex flex-wrap" >
            
               <Modal isVisible={showModal}onClose={()=>setShowModal(false)} pageShow={pageShow} setPageShow={setPageShow} ></Modal>
            <ul className="flex p-4 m-4">
            <li className="px-4 flex" > Status :{status ?<p className=" font-bold text-green-700">online</p>:<p className=" font-bold text-red-600">Offline</p>} </li>
              
          {
             userSection
          }

           
            </ul>
         </div>
      </div>
    )
  }

  export default Header