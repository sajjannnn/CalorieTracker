import { useRouteError } from "react-router-dom"

interface RouteError {
  status?: number;
  statusText?: string;
}
 
 const Error =() => {
    const err = useRouteError() as RouteError;


    return (
        <div>
            <h1>Oops! Something went Wrong</h1>
            <h2>Status : {err.status}</h2>
            <h2>Issue : {err.statusText}</h2>
        </div>
    )
 }


 export default Error;