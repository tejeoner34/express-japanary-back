export interface FlashcardDataSource {
  storeImg(img: string): Promise<string>;
}
