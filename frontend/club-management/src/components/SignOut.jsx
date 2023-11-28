import { Navigate } from "react-router-dom"
function SignOut(){
    localStorage.setItem("accessToken", "")
    return (
        <Navigate to="/login" />
    )
    
}

export default SignOut