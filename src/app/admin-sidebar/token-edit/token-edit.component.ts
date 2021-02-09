import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from '../../services/token.service';
import * as jquery from 'jquery';

@Component({
  selector: 'app-token-edit',
  templateUrl: './token-edit.component.html',
  styleUrls: ['./token-edit.component.scss']
})
export class TokenEditComponent implements OnInit {
  @Input() tokenToEdit;

  constructor(private TokenService: TokenService) { }

  ngOnInit() {
  }

  updateToken(token) {
    this.TokenService.updateToken(token);
  }

  closeModal() {
    jquery('div#edit-modal-container').toggleClass('show')
  }

}
