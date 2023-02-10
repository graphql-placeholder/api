import { readFile } from 'fs';

interface IListPayload {
  take: number;
  offset: number;
  after?: string;
  sort?: 'asc' | 'desc';
  sortBy?: string;
  where?: IMatchPayload;
}

export interface IMatchPayload {
  key: string;
  operator:
    | 'eq'
    | 'ne'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'in'
    | 'nin'
    | 'exists'
    | 'contains'
    | 'notContains'
    | 'containsInsensitive'
    | 'startsWith'
    | 'endsWith'
    | 'regex';
  value: any;
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

    if (payload.sortBy && payload.sort === 'asc') {
      data.sort((a, b) => {
        if (a[payload.sortBy] > b[payload.sortBy]) {
          return 1;
        }
        if (a[payload.sortBy] < b[payload.sortBy]) {
          return -1;
        }
        return 0;
      });
    }

    if (payload.sortBy && payload.sort === 'desc') {
      data.sort((a, b) => {
        if (a[payload.sortBy] < b[payload.sortBy]) {
          return 1;
        }
        if (a[payload.sortBy] > b[payload.sortBy]) {
          return -1;
        }
        return 0;
      });
    }

    if (payload.where) {
      if (payload.where.value === 'true' || payload.where.value === 'false') {
        payload.where.value = payload.where.value === 'true';
      }
      switch (payload.where.operator) {
        case 'eq':
          return data.filter(
            (item) => item[payload.where.key] === payload.where.value,
          );
        case 'ne':
          return data.filter(
            (item) => item[payload.where.key] !== payload.where.value,
          );
        case 'gt':
          return data.filter(
            (item) => item[payload.where.key] > payload.where.value,
          );
        case 'gte':
          return data.filter(
            (item) => item[payload.where.key] >= payload.where.value,
          );

        case 'lt':
          return data.filter(
            (item) => item[payload.where.key] < payload.where.value,
          );
        case 'lte':
          return data.filter(
            (item) => item[payload.where.key] <= payload.where.value,
          );
        case 'in':
          return data.filter((item) =>
            payload.where.value.includes(item[payload.where.key]),
          );
        case 'nin':
          return data.filter(
            (item) => !payload.where.value.includes(item[payload.where.key]),
          );
        case 'exists':
          return data.filter((item) => item[payload.where.key] !== undefined);
        case 'contains':
          return data.filter((item) =>
            item[payload.where.key].includes(payload.where.value),
          );
        case 'notContains':
          return data.filter(
            (item) => !item[payload.where.key].includes(payload.where.value),
          );
        case 'containsInsensitive':
          return data.filter((item) =>
            item[payload.where.key]
              .toLowerCase()
              .includes(payload.where.value.toLowerCase()),
          );
        case 'startsWith':
          return data.filter((item) =>
            item[payload.where.key].startsWith(payload.where.value),
          );
        case 'endsWith':
          return data.filter((item) =>
            item[payload.where.key].endsWith(payload.where.value),
          );
        case 'regex':
          return data.filter((item) =>
            new RegExp(payload.where.value).test(item[payload.where.key]),
          );
      }
    }

    if (payload.after) {
      const index = data.findIndex((item) => item._id === payload.after);
      return data.slice(index + 1, index + payload.take + 1);
    }

    return data.slice(payload.offset, payload.take);
  }

  /**
   * Find one item by any unique key
   * @returns
   */
  async findOne(payload: IMatchPayload) {
    const data = await this.openFile();
    if (payload.value === 'true' || payload.value === 'false') {
      payload.value = payload.value === 'true';
    }
    switch (payload.operator) {
      case 'eq':
        return data.find((item) => item[payload.key] === payload.value);
      case 'ne':
        return data.find((item) => item[payload.key] !== payload.value);
      case 'gt':
        return data.find((item) => item[payload.key] > payload.value);
      case 'gte':
        return data.find((item) => item[payload.key] >= payload.value);
      case 'lt':
        return data.find((item) => item[payload.key] < payload.value);
      case 'lte':
        return data.find((item) => item[payload.key] <= payload.value);
      case 'in':
        return data.find((item) => payload.value.includes(item[payload.key]));
      case 'nin':
        return data.find((item) => !payload.value.includes(item[payload.key]));
      case 'exists':
        return data.find((item) => item[payload.key] !== undefined);
      case 'contains':
        return data.find((item) => item[payload.key].includes(payload.value));
      case 'notContains':
        return data.find((item) => !item[payload.key].includes(payload.value));
      case 'containsInsensitive':
        return data.find((item) =>
          item[payload.key].toLowerCase().includes(payload.value.toLowerCase()),
        );
      case 'startsWith':
        return data.find((item) => item[payload.key].startsWith(payload.value));
      case 'endsWith':
        return data.find((item) => item[payload.key].endsWith(payload.value));
      case 'regex':
        return data.find((item) =>
          new RegExp(payload.value).test(item[payload.key]),
        );
      default:
        return null;
    }
  }
}
