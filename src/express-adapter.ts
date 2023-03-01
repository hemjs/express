import * as express from 'express';
import * as http from 'http';
import * as https from 'https';
import type { Server } from 'net';
import type { HandlerArgument, PathArgument } from './types';

export class ExpressAdapter {
  protected httpServer!: http.Server | https.Server;

  constructor(private readonly instance: express.Application) {}

  public get(path: PathArgument, handler: HandlerArgument) {
    return this.instance.get(path, handler);
  }

  public getInstance() {
    return this.instance;
  }

  public getHttpServer() {
    return this.httpServer;
  }

  public listen(port: string | number, callback?: () => void): Server;
  public listen(
    port: string | number,
    hostname: string,
    callback?: () => void,
  ): Server;
  public listen(port: any, ...args: any[]): Server {
    return this.httpServer.listen(port, ...args);
  }

  public initHttpServer(options: any): void {
    const isHttpsEnabled = options && options.httpsOptions;
    if (isHttpsEnabled) {
      this.httpServer = https.createServer(
        options.httpsOptions,
        this.getInstance(),
      );
      return;
    }
    this.httpServer = http.createServer(this.getInstance());
  }

  public close() {
    if (!this.httpServer) {
      return undefined;
    }
    return new Promise((resolve) => this.httpServer.close(resolve));
  }
}
