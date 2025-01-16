export interface FlashcardRepository {
  storeImg(img: string): Promise<string>;
}
