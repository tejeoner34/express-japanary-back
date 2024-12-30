import { DictionaryDataSource } from '../../../domain/datasource/dictionary.datasource';
import { Word } from '../../../domain/entities';
import { AiResponse } from '../../../domain/entities/ai-response.entity';
import { ExampleSentence } from '../../../domain/entities/example-sentence.entity';
import { DictionaryRepository } from '../../../domain/repository/dictionary.repository';

export class DictionaryRepositoryImpl implements DictionaryRepository {
  constructor(private readonly datasource: DictionaryDataSource) {}
  async searchAi(word: string): Promise<AiResponse> {
    return await this.datasource.searchAi(word);
  }
  async searchSampleSenteces(word: string): Promise<ExampleSentence[]> {
    return await this.datasource.searchSampleSenteces(word);
  }
  async searchWord(word: string): Promise<Word[]> {
    return await this.datasource.searchWord(word);
  }
}
