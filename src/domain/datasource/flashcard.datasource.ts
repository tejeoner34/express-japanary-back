import { UploadApiResponse } from 'cloudinary';

export interface FlashcardDataSource {
  storeImg(files: Express.Multer.File[]): Promise<UploadApiResponse[]>;
}
