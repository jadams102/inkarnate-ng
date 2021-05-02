import { Component, Input } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Token } from '../../models/token.model';

@Component({
  selector: 'token-upload',
  templateUrl: './token-upload.component.html',
  styleUrls: ['./token-upload.component.scss']
})
export class TokenUploaderComponent {
  files: FileList;
  token: Token;
  range;
  // addingImages: boolean;

  constructor(private tokenService: TokenService) { 
  }

  ngOnInit() {
  }

  handleFiles(event){
    this.files = event.target.files
  }

  uploadFiles(name: string, description: string, size: number, isPlayer: string){
    const filesToUpload = this.files;
      this.token = new Token(filesToUpload[0]);
      this.token.name = name;
      this.token.description = description;
      this.token.size = size;
      this.token.sizeString = ";width:" + this.token.size + "px";
      this.token.isPlayer = isPlayer;
      this.tokenService.uploadToken(this.token);
  }
}