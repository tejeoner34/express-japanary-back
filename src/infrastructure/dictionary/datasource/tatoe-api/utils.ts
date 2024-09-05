import { ExampleSentence } from '../../../../domain/entities/example-sentence.entity';
import { TatoeApiResult } from '../../entities/tatoe-api.entity';

export const tatoeApiSentenceAdapter = (rawResult: TatoeApiResult): ExampleSentence[] => {
  const { results } = rawResult;
  const adaptedResponse: ExampleSentence[] = results.map((result) => {
    return {
      english: result.translations?.[0]?.[0]?.text || '',
      japanese: result.text.split(' ').map((word) => ({
        furigana: '',
        word,
      })),
    };
  });
  return adaptedResponse;
};
