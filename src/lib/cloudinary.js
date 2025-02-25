import { v2 as cloudinary } from 'cloudinary';

/**
 * Cloudinary yapılandırması
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Dosyayı Cloudinary'ye yükler
 * @param {Buffer} buffer - Dosya buffer'ı
 * @param {string} folder - Yüklenecek klasör
 * @returns {Promise<Object>} Yüklenen dosya bilgileri
 */
export async function uploadToCloudinary(buffer, folder = 'uploads') {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
}

/**
 * Cloudinary'den dosya siler
 * @param {string} publicId - Silinecek dosyanın public ID'si
 * @returns {Promise<Object>} Silme işlemi sonucu
 */
export async function deleteFromCloudinary(publicId) {
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
} 