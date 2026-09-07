import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { getAuth } from 'firebase/auth'
// This is an upload utility, not a React component. It resolves with a URL that
// Firestore can safely store as a string.
function StoreImgToFirebase(image) {
    const auth = getAuth()
    return new Promise((resolve, reject) => {
        const storage = getStorage()
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`

        const storageRef = ref(storage, 'images/' + fileName)

        const uploadTask = uploadBytesResumable(storageRef, image)

        // const uploadTask = uploadBytesResumable(storageRef, Key) // Use the Key from AWS upload as the image to upload to Firebase

        // uploadTask.on(
        //     'state_changed',
        //     () => {},
        //     reject,
        //     () => getDownloadURL(uploadTask.snapshot.ref).then(resolve, reject)
        // )

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log('Upload is ' + progress + '% done')
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused')
                        break
                    case 'running':
                        console.log('Upload is running')
                        break
                    default:
                        break
                }
            },
            (error) => {
                reject(error)
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL)
                })
            }
        )
    })
}


export default StoreImgToFirebase
