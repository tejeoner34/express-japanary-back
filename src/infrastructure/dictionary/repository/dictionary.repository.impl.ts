import { DictionaryDataSource } from '../../../domain/datasource/dictionary.datasource';
import { Word } from '../../../domain/entities';
import { DictionaryRepository } from '../../../domain/repository/dictionary.repository';

export class DictionaryRepositoryImpl implements DictionaryRepository {
  constructor(private readonly datasource: DictionaryDataSource) {}
  async searchWord(word: string): Promise<Word[]> {
    return await this.datasource.searchWord(word);
  }
}
