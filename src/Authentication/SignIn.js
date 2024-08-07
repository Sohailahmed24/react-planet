import { useState } from "react"
import Register from "./Register"



const SignIn=({isVisible,onClose})=>{

const [show,setShow]=useState(false)

    const handleOnClose=(e)=>{
        if(e.target.id === "outerContainer") onClose()
    }

    if(!isVisible) return null

    const handleRegister=(isVisible)=>{
        setShow(true)
       
    }
    if(show) return <Register isVisible={show} onClose={onClose}/>
    return(
       <div id="outerContainer" className="fixed inset-0  bg-black w-screen h-screen bg-opacity-25 backdrop-blur-lg flex justify-center items-center " onClick={handleOnClose}>
           
            <div className="w-[30%] flex flex-col  ">
               
                    <button className="place-self-end text-white "onClick={()=>onClose()}>X</button>
                        
                     <div className="bg-white    ">
                        <div className="flex justify-center">
                            <button className="mx-4" onClick={()=>setShow(false)}>Sign In</button> ||  <button className="mx-4" onClick={()=>handleRegister(isVisible)}>Register</button>
                        </div>
                        <form >
                        <div className="flex flex-col mx-4 my-11 ">
                        <div className="my-5">
                            <lable className="mx-8">Email</lable>
                            <input type="email" className=" bg-gray-100 border-2 mx-6 rounded-lg outline-gray-500" />
                          </div>
                          <div >
                            <lable className="mx-6">Password</lable>
                            <input type="password" className=" bg-gray-100 border-2 mx-3 rounded-lg outline-gray-500" />
                          </div>
                          <div className=" mx-9 my-2 " >
                            <button className=" rounded-lg py-1 bg-gray-200 px-[40%]">Sign In</button>
                          </div>
                        </div>
                        </form>
                     </div>
            </div>
       </div>
    )
}

export default SignIn