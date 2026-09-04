import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully
        // console.log("File is uploaded on Cloudinary", response.url)
        fs.unlinkSync(localFilePath)   // ← ye line add karein yahan
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove locally saved temp file as upload failed
        return null
    }
}

const deleteFromCloudinary = async (fileUrl, resourceType = "image") => {
    try {
        if (!fileUrl) return null

        // extract public_id from the cloudinary url
        // e.g. https://res.cloudinary.com/<cloud>/image/upload/v123456/abc123.png
        const parts = fileUrl.split("/")
        const fileName = parts[parts.length - 1]
        const publicId = fileName.split(".")[0]

        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType
        })

        return response
    } catch (error) {
        console.log("CLOUDINARY DELETE ERROR: ", error)
        return null
    }
}

export { uploadOnCloudinary, deleteFromCloudinary }