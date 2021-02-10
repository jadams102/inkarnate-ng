import { from } from 'rxjs';
import {Token} from './token.model';
import {Block} from './block.model';

export class Map {
  $key: string;
  key: string;
  file: File;
  url: string;
  name: string;
  progress: number;
  title: string;
  description: string;
  current: boolean;
  tokens: Token[];
  blocks: Block[];
  constructor(file?: File) {
    this.file = file;
    this.tokens = [];
  }
}