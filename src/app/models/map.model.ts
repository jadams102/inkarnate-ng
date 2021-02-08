export class Map {
  $key: string;
  file: File;
  url: string;
  name: string;
  progress: number;
  title: string;
  description: string;
  constructor(file?: File) {
    this.file = file;
  }
}