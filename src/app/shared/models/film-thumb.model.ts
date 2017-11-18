export class FilmThumb {  
  date: any;
  description: any;
  id: number;
  imgPoster: any;
  imgBackDrop: any;
  ranking:any;
  title: any;
  totalPages: number;
  genres: any;

  constructor(obj?: any) {
    this.id = obj && obj.id || null;
    this.title = obj && obj.title || 'brak danych';
    this.imgPoster = obj && obj.imgPoster || './assets/img/poster-not-found.jpg';
    this.imgBackDrop = obj && obj.imgBackDrop || './assets/img/not-found.jpg';
    this.description = obj && obj.description || null;
    this.ranking = obj && obj.ranking || '-';
    this.date = obj && obj.date || 'brak danych';
    this.totalPages = obj && obj.total_pages || 0;
    this.genres = obj && obj.genres || '-'
  }
}    