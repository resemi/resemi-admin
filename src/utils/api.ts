import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export class ApiHandler {
  public readonly req: NextApiRequest;

  public readonly res: NextApiResponse;

  constructor(req, res) {
    this.req = req;
    this.res = res;

    this.execute();
  }

  get method() {
    return this.req.method;
  }

  get allParams() {
    // Combines parameters from the query string, and encoded request body
    // to compose a monolithic object of named parameters, irrespective of source
    return { ...this.req.query, ...this.req.body };
  }

  execute() {
    const fn = this.method.toLowerCase();
    if (!this[fn]) {
      this.error(`Method ${this.method} Not Allowed`, 405);
    } else {
      this[fn]?.(this.allParams);
    }
  }

  success(args: object, statusCode = 200) {
    this.res.status(statusCode).json(args);
  }

  error(message: string, statusCode = 500) {
    this.res.status(statusCode).json({ message });
  }
}

export function createApiHandler(Handler: typeof ApiHandler): NextApiHandler {
  return function handler(req: NextApiRequest, res: NextApiResponse) {
    return new Handler(req, res);
  };
}
