
import NewSignIn from "./NewSignIn"
import NewRegister from "./NewRegister"




const Modal=({isVisible,onClose,pageShow,setPageShow})=>{
    
    const handleOnClose=(e)=>{
        if(e.target.id === "outerContainer") onClose()
    }
if (!isVisible) return null
    return(
        <div id="outerContainer" className="fixed inset-0  bg-black w-screen h-screen bg-opacity-25 backdrop-blur-lg flex flex-col justify-center items-center " onClick={handleOnClose}>
                  <div className="flex bg-white w-[50%] justify-center text-red-600 rounded-t-3xl ">
                     <div className="mx-[10%] my-3 border-b-4 border-red-700  ">
                        <button onClick={()=>{setPageShow(true)}} >Sign In </button>
                     </div> 
                     <div className="mx-[10%] my-3 border-b-4 border-red-700">
                        <button onClick={()=>setPageShow(false)}  >Register</button>
                     </div>
                  </div>
                  
                  <div className=" bg-white flex flex-col overflow-scroll no-Scrollbar w-[50%] text-gray-800 rounded-b-3xl ">
                    {(pageShow )?<NewSignIn setPageShow={setPageShow} onClose={onClose} /> :<NewRegister setPageShow={setPageShow} onClose={onClose} />}
     
                  </div>
        </div>
    )
}

export default Modal