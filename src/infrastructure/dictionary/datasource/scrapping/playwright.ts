import { chromium, Page, ElementHandle } from 'playwright';
import {
  ExampleSentence,
  JapaneseSentence,
} from '../../../../domain/entities/example-sentence.entity';

export class Playwright {
  static async scrape(word: string): Promise<ExampleSentence[]> {
    const url = `https://jisho.org/search/${word}%20%23sentences`;
    const browser = await chromium.launch({ headless: true });
    const page: Page = await browser.newPage();
    await page.goto(url);

    const extractJapaneseSentence = async (
      element: ElementHandle | null
    ): Promise<JapaneseSentence[]> => {
      const result: JapaneseSentence[] = [];

      if (element) {
        const childNodesHandle = await element.evaluateHandle((element) => element.childNodes);
        const childNodesProperties = await childNodesHandle.getProperties();
        const childNodes: ElementHandle[] = [];
        for (const property of childNodesProperties.values()) {
          const childNode = property.asElement();
          if (childNode) {
            childNodes.push(childNode);
          }
        }

        for (const childNode of childNodes) {
          const nodeType = await childNode.evaluate((node) => node.nodeType);
          if (nodeType === 1) {
            const japaneseSentence = await childNode.$$eval(' * ', (spans) => {
              const resultObject: JapaneseSentence = { furigana: '', word: '' };
              spans.forEach((li) => {
                if (li.classList.value === 'unlinked') {
                  resultObject.word = li.textContent || '';
                }
                if (li.classList.value === 'furigana') {
                  resultObject.furigana = li.textContent || '';
                }
              });
              return resultObject;
            });
            result.push(japaneseSentence);
          } else if (nodeType === 3) {
            const textContent = await childNode.evaluate((node) => node.textContent?.trim() || '');
            result.push({
              furigana: '',
              word: textContent,
            });
          }
        }
      }

      return result;
    };

    const sentenceNodes = await page.$$('.sentence_content');
    const extractedSentences: ExampleSentence[] = [];
    for (const node of sentenceNodes) {
      const englishElement = await node.$('.english_sentence .english');
      const japaneseElement = await node.$('.japanese_sentence');

      if (englishElement && japaneseElement) {
        const englishSentence = await englishElement.innerText();
        const japaneseSentence = await extractJapaneseSentence(japaneseElement);

        extractedSentences.push({ english: englishSentence, japanese: japaneseSentence });
      }
    }
    await browser.close();
    return extractedSentences;
  }
}
