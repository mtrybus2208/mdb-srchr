export class RequestResults {   
  totalPages: number;
  totalResults: number;   
  constructor(obj?: any) {
    this.totalPages = obj && obj.totalPages || 0;
    this.totalResults = obj && obj.totalResults || 0;
  }
} 