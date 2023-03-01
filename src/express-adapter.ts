import * as express from 'express';

export class ExpressAdapter {
  constructor(private readonly instance: express.Application) {}

  getInstance() {
    return this.instance;
  }
}
