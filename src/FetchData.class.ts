//@ts-nocheck
import fs from "fs";

const users = JSON.parse(fs.readFileSync("./datas/users.json").toString());
const posts = JSON.parse(fs.readFileSync("./datas/posts.json").toString());
const comments = JSON.parse(
  fs.readFileSync("./datas/comments.json").toString()
);

export const jsonData = { users, posts, comments };

export enum RESOURCE_TYPE {
  USERS = "users",
  POSTS = "posts",
  COMMENTS = "comments",
}

export interface PaginationArgs {
  page: number;
  limit: number;
}

export class FetchData {
  private data: any[];

  constructor(
    private resourceType: RESOURCE_TYPE,
    private page: number = 1,
    private limit: number = 10
  ) {
    this.data = jsonData[this.resourceType];
  }

  private getTotalDataCount(): number {
    return this.data.length;
  }

  private getTotalPageCount(): number {
    return Math.floor(this.getTotalDataCount() / this.limit);
  }

  private getData(): any[] {
    const offset = (this.page - 1) * this.limit;
    const res = this.data.slice(offset, offset + this.limit);
    return res;
  }

  public getResponse() {
    return {
      count: this.getTotalDataCount(),
      currentPage: this.page,
      totalPages: this.getTotalPageCount(),
      data: this.getData(),
    };
  }
}
