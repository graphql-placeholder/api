import { readFile } from 'fs';

interface IListPayload {
  take: number;
  offset: number;
}

export class LocalDatabaseDriver {
  constructor(public modelName: string) {}

  /**
   * Open file and return data
   * @returns
   */
  openFile() {
    return new Promise((resolve, reject) => {
      readFile(`./data/${this.modelName}.json`, 'utf8', (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(JSON.parse(data.toString()));
      });
    });
  }

  async list(payload: IListPayload) {
    const data = await this.openFile();
    return [...(data as any[])].slice(payload.offset, payload.take);
  }
}
