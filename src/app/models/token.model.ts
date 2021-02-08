export class Token {
  $key: string;
  file: File;
  url: string;
  name: string;
  progress: number;
  createdOn: Date = new Date();
  title: string;
  description: string;
  state: string;
  constructor(file?: File) {
    this.file = file;
  }
}