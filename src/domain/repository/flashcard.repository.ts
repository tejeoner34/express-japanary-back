import { UploadApiResponse } from 'cloudinary';

export interface FlashcardRepository {
  storeImg(files: Express.Multer.File[]): Promise<UploadApiResponse[]>;
}
