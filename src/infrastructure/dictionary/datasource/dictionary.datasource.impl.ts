import axios from 'axios';
import { DictionaryDataSource } from '../../../domain/datasource/dictionary.datasource';
import { Sense, Word } from '../../../domain/entities';
import { CustomError } from '../../../domain/errors';
import { Datum, DictionaryResultApi, SenseApi } from '../entities/dictionaryResultApi.entity';
import { Playwright } from './scrapping/playwright';
import { ExampleSentence } from '../../../domain/entities/example-sentence.entity';

const BASE_URL = 'https://jisho.org/api/v1/search/words?keyword=';

export class DictionaryDatasourceImpl implements DictionaryDataSource {
  async searchSampleSenteces(word: string): Promise<ExampleSentence[]> {
    // const exampleSentences: ExampleSentence[] = await Playwright.scrape(word);
    return [];
  }

  async searchWord(word: string): Promise<Word[]> {
    try {
      const response = await axios.get<DictionaryResultApi>(`${BASE_URL}${word}`, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
        },
      });
      const adaptedResponse = dictionaryListAdapter(response.data.data);
      console.log(adaptedResponse);

      return adaptedResponse;
    } catch (err) {
      throw CustomError.badRequest('Could not make the request');
    }
  }
}

const dictionaryAdapter = (apiResponse: Datum): Word => {
  return {
    slug: apiResponse.slug,
    isCommon: !!apiResponse.is_common,
    japaneseReadings: apiResponse.japanese,
    jlptLevels: apiResponse.jlpt,
    senses: sensesAdapter(apiResponse.senses),
  };
};

const dictionaryListAdapter = (rawData: Datum[]): Word[] => {
  return rawData.map((item) => dictionaryAdapter(item));
};

const sensesAdapter = (senses: SenseApi[]): Sense[] => {
  return senses.map((sense) => ({
    englishDefinitions: sense.english_definitions,
    seeAlso: sense.see_also,
    tags: sense.tags,
    wordTypes: sense.parts_of_speech,
    sentences: sense.sentences,
  }));
};
