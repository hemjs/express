import type { HemHandler } from '../types';

export class NotFoundHandler implements HemHandler {
  handle(req: any, res: any, next?: any) {
    res.status(404).send(`Cannot ${req.method} ${req.url}`);
  }
}
