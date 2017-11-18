 export class Crew {
  name: string;
  job: string;
  profilePath: string;
  creditId: string;
  department: string;
  id: number

  constructor( obj?: any ){
    this.name = obj && obj.name || '-';
    this.job = obj && obj.job || '-';
    this.profilePath = obj && obj.profilePath || './assets/img/user-not-found.jpg';
    this.creditId = obj && obj.creditId || null;
    this.department = obj && obj.department || '-';
    this.id = obj && obj.id || null;
  }
}    



 