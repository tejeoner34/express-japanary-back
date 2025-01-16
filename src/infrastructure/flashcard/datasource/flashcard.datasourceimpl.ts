import { FlashcardDataSource } from '../../../domain/datasource/flashcard.datasource';

export class FlashcardDataSourceImpl implements FlashcardDataSource {
  async storeImg(img: string): Promise<string> {
    // TODO:  Implement logic to save image in cloud store
    return 'https://www.google.com';
  }
}
