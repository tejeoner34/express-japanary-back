import { Request, Response } from 'express';
import { DictionaryRepository } from '../../domain/repository/dictionary.repository';

export class DictionaryController {
  constructor(private readonly dictionaryRepository: DictionaryRepository) {}
  searchWord(req: Request, res: Response) {
    const query: any = req.query.keyword;
    this.dictionaryRepository
      .searchWord(query)
      .then((result) => res.json(result))
      .catch((error) => res.status(error.statusCode).json(error));
  }
}
