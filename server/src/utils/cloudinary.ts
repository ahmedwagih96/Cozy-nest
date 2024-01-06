import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImagesToCloudinary = async (image: Express.Multer.File) => {
  try {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const data = await cloudinary.uploader.upload(dataURI);
    return { url: data.secure_url, publicId: data.public_id };
  } catch {
    throw new Error("Internal Server Error");
  }
};

export default uploadImagesToCloudinary;
