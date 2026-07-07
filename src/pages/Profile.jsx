import React from "react"
import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
function Profile() {
    const [user, setUser] = useState(null)
    const auth = getAuth()
    useEffect(() => {
        // 2. Use onAuthStateChanged listener instead of checking currentUser once
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })

        // Clean up the listener when the component unmounts
        return () => unsubscribe()
    }, [auth])
    return user ? (
        <h1>Welcome, {user.displayName || "No Name Found"}!</h1>
    ) : (
        "Not Logged In; SignUp Instead"
    )
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



