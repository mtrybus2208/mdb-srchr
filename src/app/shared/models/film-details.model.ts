export class Details{
  title: string;
  originalTitle: string;
  overview: string;
  backdropPath: string;
  posterPath: string;
  voteAverage: string;
  voteCount: any;
  budget: string;
  genres: string;
  homepage: string;
  id: string;
  origLanguage: string;
  popularity: string;
  prodCompanies: string;
  prodCountries: string;
  releaseDate: string;
  spokenLanguages: string;
  tagline: string;
  video: boolean;

  constructor(obj?: any) {
    this.title = obj && obj.title || '-';
    this.originalTitle = obj && obj.originalTitle || null;
    this.overview = obj && obj.overview || 'brak opisu filmu';
    this.backdropPath = obj && obj.backdropPath || './assets/img/not-found-det.jpg';
    this.posterPath = obj && obj.posterPath || './assets/img/poster-not-found.jpg';
    this.voteAverage = obj && obj.voteAverage || '-';
    this.voteCount = obj && obj.voteCount || '-';  
    this.budget = obj && obj.budget || 'brak danych';
    this.genres = obj && obj.genres || '-';  
    this.homepage = obj && obj.homepage || null;
    this.id = obj && obj.id|| null;
    this.origLanguage = obj && obj. origLanguage|| null;
    this.popularity = obj && obj.popularity || null;
    this.prodCompanies = obj && obj.prodCompanies || null;
    this.prodCountries = obj && obj.prodCountries || null;
    this.releaseDate = obj && obj.releaseDate || '-';
    this.spokenLanguages = obj && obj. spokenLanguages || '-';
    this.tagline = obj && obj.tagline || null;
    this.video = obj && obj.video || null;
  }
}    
 