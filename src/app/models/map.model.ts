import {Token} from './token.model';

export class Map {
  $key: string;
  file: File;
  url: string;
  name: string;
  progress: number;
  title: string;
  description: string;
  current: boolean;
  tokens: Token[]
  constructor(file?: File) {
    this.file = file;
    this.tokens = [];
  }
}