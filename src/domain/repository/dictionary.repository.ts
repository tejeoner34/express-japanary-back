import { Word } from '../entities';

export interface DictionaryRepository {
  searchWord(word: string): Promise<Word[]>;
}
