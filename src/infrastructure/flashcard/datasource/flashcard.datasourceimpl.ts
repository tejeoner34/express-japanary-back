import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../../../config/cloudinary';
import { FlashcardDataSource } from '../../../domain/datasource/flashcard.datasource';

export class FlashcardDataSourceImpl implements FlashcardDataSource {
  async storeImg(files: Express.Multer.File[]): Promise<UploadApiResponse[]> {
    try {
      if (Array.isArray(files)) {
        const results = await Promise.all(
          files.map((file: Express.Multer.File) => {
            const base64String = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
            return cloudinary.uploader.upload(base64String);
          })
        );

        return results;
      } else {
        throw new Error('Invalid input. Expected an array of files.');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  }
}
