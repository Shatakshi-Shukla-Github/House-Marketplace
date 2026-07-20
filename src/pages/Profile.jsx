import React from "react"
import { useState, useEffect } from "react"
import { getAuth, updateProfile, onAuthStateChanged } from "firebase/auth"
import { updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc } from "firebase/firestore"
import { db } from "../firebase.config"
import { useNavigate, Link } from "react-router-dom"
import ListingItem from "../components/ListingItem"
import { toast } from "react-toastify"
import arrowRight from "../assets/svg/arrowIcon.svg"
import homeIcon from "../assets/svg/homeIcon.svg"
function Profile() {
    const auth = getAuth()
    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)
    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    })
    const { name, email } = formData

    const navigate = useNavigate()


    // useEffect(() => {
    //     // const fetchUserListings = async () => {
    //     const listingsRef = collection(db, "listings")
    //     const q = query(listingsRef, where("userRef", "==", auth.currentUser.uid))
    //     const querySnap = await getDocs(q)
    //     const listings = []

    //     querySnap.forEach((doc) => {
    //         return listings.push({
    //             id: doc.id,
    //             data: doc.data()
    //         })
    //     })
    //     // fetchUserListings()
    //     setListings(listings)
    //     setLoading(false)
    //     // }
    // }, [auth.currentUser.uid])




    useEffect(() => {
        const listingsRef = collection(db, 'listings');

        const q = query(
            listingsRef,
            where('userRef', '==', auth.currentUser.uid),
            orderBy('timestamp', 'desc'),
        );

        getDocs(q).then(querySnap => {
            let listings = [];

            querySnap.forEach(doc => {
                listings.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });

            setListings(listings);
            setLoading(false);
        });
    }, [auth.currentUser.uid]);
    const onLogout = () => {
        auth.signOut()
        navigate("/")
    }

    const onDelete = async (listingId) => {
        if (window.confirm("Are you sure you want to delete the listing permanently?")) {
            await deleteDoc(doc(db, "listings", listingId))
            const updatedListings = listings.filter((listing) =>
                listing.id !== listingId)
            setListings(updatedListings)
            toast.success("Listing deleted successfully")
        }
    }

    const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== name) {
                //Update displayName in firebase:-
                await updateProfile(auth.currentUser, {
                    displayName: name
                })

                //Update in firestore
                const userRef = doc(db, "users", auth.currentUser.uid)
                await updateDoc(userRef, {
                    name
                })
            }
        } catch (error) {
            toast.error("Could not update Profile Details")
        }
    }
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    return (
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader">My Profile</p>
                <button className="logOut" type="button" onClick={onLogout}>Logout</button>
            </header>
            <main>
                <div className="profileDetailsHeader">
                    <p className="profileDetailsText">
                        Personal Details
                    </p>
                    <p className="changePersonalDetails" onClick={() => {
                        changeDetails && onSubmit()
                        setChangeDetails((prevState) => !prevState)
                    }}>
                        {changeDetails ? "done" : "change"}
                    </p>
                </div>
                <div className="profileCard">
                    <form>
                        <input type="text" id="name" className={!changeDetails ? "profileName" : "profileNameActive"} disabled={!changeDetails} value={name} onChange={onChange} />
                        <input type="text" id="email" className={!changeDetails ? "profileEmail" : "profileEmailActive"} disabled={!changeDetails} value={email} onChange={onChange} />
                    </form>
                </div>
                <Link to="/create-listing" className="createListing">
                    <img src={homeIcon} alt="home" />
                    <p>Sell or Rent your Home</p>
                    <img src={arrowRight} alt="arrow-right" />
                </Link>

                {!loading && listings?.length > 0 && (
                    <>
                        <p className="listingText">Your Listings</p>
                        <ul className="listingsList">
                            {listings.map((listing) => (
                                <ListingItem key={listing.id} listing={listing.data} id={listing.id} onDelete={() => onDelete(listing.id)} />
                            ))}
                        </ul>
                    </>
                )}
            </main>
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



