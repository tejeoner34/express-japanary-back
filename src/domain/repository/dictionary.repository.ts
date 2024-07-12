import { Word } from '../entities';
import { ExampleSentence } from '../entities/example-sentence.entity';

export interface DictionaryRepository {
  searchWord(word: string): Promise<Word[]>;
  searchSampleSenteces(word: string): Promise<ExampleSentence[]>;
}
