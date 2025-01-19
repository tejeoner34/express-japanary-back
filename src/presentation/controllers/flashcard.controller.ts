import { Request, Response } from 'express';
import { FlashcardRepository } from '../../domain/repository/flashcard.repository';
import { imagesResponseAdapter } from '../../domain/entities/image-response.entity';

export class FlashcardController {
  constructor(private readonly flashcardRepository: FlashcardRepository) {}
  storeImg(req: Request, res: Response) {
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({ error: 'Invalid input. Expected an array of files.' });
    }
    this.flashcardRepository
      .storeImg(req.files as Express.Multer.File[])
      .then((result) => {
        return res.json(imagesResponseAdapter(result));
      })
      .catch((error) => res.status(error.statusCode).json(error));
  }
}
