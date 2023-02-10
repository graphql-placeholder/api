import { readFile } from 'fs';

interface IListPayload {
  take: number;
  offset: number;
  after?: string;
}

export class LocalDatabaseDriver {
  constructor(public modelName: string) {}

  /**
   * Open file and return data
   * @returns
   */
  openFile(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      readFile(`./data/${this.modelName}.json`, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(JSON.parse(data.toString()) as any[]);
      });
    });
  }

  async list(payload: IListPayload) {
    const data = await this.openFile();
    if (payload.after) {
      const index = data.findIndex((item) => item._id === payload.after);
      return data.slice(index + 1, index + payload.take + 1);
    }
    return data.slice(payload.offset, payload.take);
  }

  async findOne(id: string) {
    const data = await this.openFile();
    return data.find((item) => item._id === id);
  }
}
