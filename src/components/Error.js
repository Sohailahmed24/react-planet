import { useRouteError } from "react-router-dom"

const Error=()=>{
    const err=useRouteError()
    return(
        <div>
            <h2>Opps!!!</h2>
            <h2>Something went wrong !!!</h2>
            <p>{err.status}:{err.statusText}</p>
        </div>
    )
}

export default Error