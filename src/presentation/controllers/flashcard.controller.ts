import { Request, Response } from 'express';
import { FlashcardRepository } from '../../domain/repository/flashcard.repository';

export class FlashcardController {
  constructor(private readonly flashcardRepository: FlashcardRepository) {}
  storeImg(req: Request, res: Response) {
    this.flashcardRepository
      .storeImg(req.files as Express.Multer.File[])
      .then((result) => res.json(result))
      .catch((error) => res.status(error.statusCode).json(error));
  }
}
