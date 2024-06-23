import { useEffect, useState } from "react"




const useOnlineStatus=()=>{
    const [onlineStatus,setOnlineStatus]=useState(true)
    useEffect(()=>{
        status()
    },[])
const status=()=>{
    window.addEventListener("offline",()=>{
        setOnlineStatus(false)
    })
    window.addEventListener("online",()=>{
        setOnlineStatus(true)
    })
}

    return onlineStatus
}

export default useOnlineStatus