import { Word } from '../entities';

export interface DictionaryDataSource {
  searchWord(word: string): Promise<Word[]>;
}
