import { Router } from 'express';
import { DictionaryController } from '../controllers/dictionary.controller';
import { DictionaryRepositoryImpl } from '../../infrastructure/dictionary/repository/dictionary.repository.impl';
import { DictionaryDatasourceImpl } from '../../infrastructure/dictionary/datasource/dictionary.datasource.impl';

export class DictionaryRouter {
  static get routes() {
    const router = Router();
    const datasource = new DictionaryDatasourceImpl();
    const repository = new DictionaryRepositoryImpl(datasource);
    const controller = new DictionaryController(repository);
    router.get('/', (req, res) => controller.searchWord(req, res));
    router.get('/sample-sentence', (req, res) => controller.searchSampleSenteces(req, res));
    router.get('/search-ai', (req, res) => controller.searchAi(req, res));

    return router;
  }
}
