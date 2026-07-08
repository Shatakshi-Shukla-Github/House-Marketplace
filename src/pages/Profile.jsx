import React from "react"
import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useNavigate, Link } from "react-router-dom"
function Profile() {
    const auth = getAuth()
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    })
    const { name, email } = formData

    const navigate = useNavigate()
    const onLogout = () => {
        auth.signOut()
        navigate("/")
    }

    return (
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader">My Profile</p>
                <button className="logOut" type="button" onClick={onLogout}>Logout</button>
            </header>
        </div>
    )



    // useEffect(() => {
    //     // 2. Use onAuthStateChanged listener instead of checking currentUser once
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         setUser(currentUser)
    //     })

    //     // Clean up the listener when the component unmounts
    //     return () => unsubscribe()
    // }, [auth])
    // return user ? (
    //     <h1>Welcome, {user.displayName || "No Name Found"}!</h1>
    // ) : (
    //     "Not Logged In; SignUp Instead"
    // )
}
export default Profile






// Traversy's Code:-
// import React from "react"
// import { useState, useEffect } from "react"
// import { getAuth } from "firebase/auth"
// function Profile() {
//     const [user, setUser] = useState(null)
//     const auth = getAuth()
//     useEffect(() => {
//         setUser(auth.currentUser)
//     }, [])
//     return user ? <h1>{user.displayName}</h1> : "Not Logged In; SignUp Instead"
// }
// export default Profile



