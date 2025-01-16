import { FlashcardDataSource } from '../../../domain/datasource/flashcard.datasource';
import { FlashcardRepository } from '../../../domain/repository/flashcard.repository';

export class FlashcardRepositoryImpl implements FlashcardRepository {
  constructor(private readonly datasource: FlashcardDataSource) {}
  async storeImg(img: string): Promise<string> {
    return await this.datasource.storeImg(img);
  }
}
