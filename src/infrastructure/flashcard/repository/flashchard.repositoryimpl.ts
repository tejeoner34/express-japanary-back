import { UploadApiResponse } from 'cloudinary';
import { FlashcardDataSource } from '../../../domain/datasource/flashcard.datasource';
import { FlashcardRepository } from '../../../domain/repository/flashcard.repository';

export class FlashcardRepositoryImpl implements FlashcardRepository {
  constructor(private readonly datasource: FlashcardDataSource) {}
  async storeImg(files: Express.Multer.File[]): Promise<UploadApiResponse[]> {
    return await this.datasource.storeImg(files);
  }
}
