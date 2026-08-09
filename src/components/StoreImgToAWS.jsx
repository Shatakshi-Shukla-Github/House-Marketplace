import React from "react";
import { toast } from 'react-toastify'
function StoreImgToAWS(image) {
    const uploadFile = async () => {
        try {
            // 1. Fetch the secure presigned URL from your Lambda backend API
            // (Replace 'YOUR_LAMBDA_API_URL_HERE' with your actual API Gateway or Lambda URL)
            const response = await fetch(' https://z2wjjl91j6.execute-api.ap-south-1.amazonaws.com/default/getPresignedImageURL');

            if (!response.ok) {
                throw new Error("Failed to get upload URL from server");
            }

            const { uploadURL, Key } = await response.json();

            // 2. Upload the file directly to S3 using the URL Lambda gave you
            const uploadResult = await fetch(uploadURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'image/jpeg'
                },
                body: image // This uses the 'file' variable from your component state
            });



            //     if (uploadResult.ok) {
            //         toast.success("File uploaded successfully.");
            //         console.log("Saved on S3 with file name:", Key);
            //     } else {
            //         alert("S3 upload failed.");
            //     }

        } catch (err) {
            // console.error("Upload process failed:", err);
            // alert("An error occurred during the upload.");
            throw err;
        }

    };


    return (
        uploadFile()
            .then(alert("Image Uploaded to AWS"))
            .catch(err => console.log("Cannot Upload to AWS"))
    )

}


export default StoreImgToAWS