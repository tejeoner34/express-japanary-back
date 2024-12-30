import { Word } from '../entities';
import { AiResponse } from '../entities/ai-response.entity';
import { ExampleSentence } from '../entities/example-sentence.entity';

export interface DictionaryDataSource {
  searchWord(word: string): Promise<Word[]>;
  searchSampleSenteces(word: string): Promise<ExampleSentence[]>;
  searchAi(word: string): Promise<AiResponse>;
}
