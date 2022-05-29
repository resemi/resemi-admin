import { ApiHandler, createApiHandler } from '@/utils/api';

export class Index extends ApiHandler {
  async get() {
    const data = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'John Author' },
      { id: 3, name: 'John Admin' },
      { id: 4, name: 'John Tester' },
      { id: 5, name: 'John Master' },
    ];
    this.success(data);
  }
}

export default createApiHandler(Index);
