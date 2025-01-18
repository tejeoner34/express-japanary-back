import { Router } from 'express';
import { FlashcardDataSourceImpl } from '../../infrastructure/flashcard/datasource/flashcard.datasourceimpl';
import { FlashcardRepositoryImpl } from '../../infrastructure/flashcard/repository/flashchard.repositoryimpl';
import { FlashcardController } from '../controllers/flashcard.controller';
import { multerUpload } from '../../config/cloudinary';

export class FlashcardRouter {
  static get routes() {
    const router = Router();
    const datasource = new FlashcardDataSourceImpl();
    const repository = new FlashcardRepositoryImpl(datasource);
    const controller = new FlashcardController(repository);
    router.post('/upload', multerUpload, (req, res) => controller.storeImg(req, res));
    return router;
  }
}
