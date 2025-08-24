import { configDotenv } from 'dotenv'
configDotenv({quiet: true})
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const uploadOnCloudinary = async(localPath) => {
    try {
        
        if(!localPath) return null

        const response = await cloudinary.uploader.upload(localPath,{
            format: 'pdf',
            resource_type: 'auto',
        })

        console.log('File uploaded successfully');
        fs.unlinkSync(localPath)
        return response;        

    } catch (error) {
        fs.unlinkSync(localPath)
        return null
    }
}

export { uploadOnCloudinary }