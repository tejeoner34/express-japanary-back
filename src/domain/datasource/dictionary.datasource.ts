import { Word } from '../entities';
import { ExampleSentence } from '../entities/example-sentence.entity';

export interface DictionaryDataSource {
  searchWord(word: string): Promise<Word[]>;
  searchSampleSenteces(word: string): Promise<ExampleSentence[]>;
}
