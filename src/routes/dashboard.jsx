import { redirect, useLoaderData } from "react-router-dom"
import Navbar from "../components/Navbar"

export async function loader({ request }){
    const token = localStorage.getItem('token')
    
    if(!token){
        console.log(token)
        return redirect("/login")
    }

    return { 
        isLoggedIn: true
    }
}

export default function Dashboard() {
    const { isLoggedIn } = useLoaderData();
    return (
        <>
            <Navbar isLoggedIn={isLoggedIn}/>
        </>
    )
}