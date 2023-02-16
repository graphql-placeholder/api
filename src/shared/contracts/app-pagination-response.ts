interface PaginationMeta {
  totalCount: number;
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
}

export class AppPaginationResponse {
  nodes: any;
  meta: PaginationMeta;

  constructor(data: any, meta: PaginationMeta) {
    this.meta = meta;
    this.nodes = data;
  }
}
