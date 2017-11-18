export class Cast {
  castId: number; 
  character: string; 
  creditId: string;
  id: number;
  name: string; 
  order: number; 
  profilePath: string; 

  constructor( obj?: any ) {
    this.castId = obj && obj.castId || null;
    this.character = obj && obj.character || '-';
    this.name = obj && obj.name || '-';
    this.profilePath = obj && obj.profilePath || './assets/img/user-not-found.jpg';
    this.creditId = obj && obj.creditId || null;
    this.id = obj && obj.id || null ;      
  }
}    
 