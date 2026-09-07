async function StoreImgToAWS(image) {

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
            body: image
        });

        if (!uploadResult.ok) {
            throw new Error("Failed to upload file to S3");
        }
        return Key;

    } catch (error) {
        console.error("Error uploading image to AWS S3:", error);
    }

};



export default StoreImgToAWS