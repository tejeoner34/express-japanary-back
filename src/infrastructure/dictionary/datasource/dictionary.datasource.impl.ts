import 'dotenv/config';
import axios from 'axios';
import { DictionaryDataSource } from '../../../domain/datasource/dictionary.datasource';
import { Sense, Word } from '../../../domain/entities';
import { AiResponse } from '../../../domain/entities/ai-response.entity';
import { CustomError } from '../../../domain/errors';
import { Datum, DictionaryResultApi, SenseApi } from '../entities/dictionaryResultApi.entity';
import { ExampleSentence } from '../../../domain/entities/example-sentence.entity';
import { TatoeApiResult } from '../entities/tatoe-api.entity';
import { tatoeApiSentenceAdapter } from './tatoe-api/utils';

const BASE_URL = 'https://jisho.org/api/v1/search/words?keyword=';
const SENTENCE_BASE_URL = 'https://tatoeba.org/en/api_v0/search?from=jpn&to=eng';
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

export class DictionaryDatasourceImpl implements DictionaryDataSource {
  async searchSampleSenteces(word: string): Promise<ExampleSentence[]> {
    try {
      const response = await axios.get<TatoeApiResult>(`${SENTENCE_BASE_URL}&query=${word}`, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36',
        },
      });
      const adaptedResponse = tatoeApiSentenceAdapter(response.data);
      return adaptedResponse;
    } catch (err) {
      throw CustomError.badRequest('Could not make the request');
    }
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
      return adaptedResponse;
    } catch (err) {
      console.log(err);
      throw CustomError.badRequest('Could not make the request');
    }
  }

  async searchAi(word: string): Promise<AiResponse> {
    try {
      const aiResponse = await axios.post(
        OPENAI_URL,
        {
          model: 'gpt-3.5-turbo-1106',
          messages: [
            {
              role: 'developer',
              content:
                'あなたは日本語の先生です。まずは読み方を教えてください、その後説明は短くして最大限に３００文字でお願いします。後、例文を教えてください。',
            },
            {
              role: 'user',
              content: `${word}とはどういう意味ですか?`,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
          },
        }
      );
      return aiResponse.data.choices[0].message.content;
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
