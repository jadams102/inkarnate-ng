import { Component, OnInit, Input } from '@angular/core';
import { MapService } from '../../services/map.service';
import * as jquery from 'jquery';

@Component({
  selector: 'app-gallery-image-edit',
  templateUrl: './gallery-image-edit.component.html',
  styleUrls: ['./gallery-image-edit.component.scss']
})
export class GalleryImageEditComponent implements OnInit {
  @Input() imageToEdit;

  constructor(private MapService: MapService) { }

  ngOnInit() {
  }

  updateImage(image) {
    this.MapService.updateImage(image);
  }

  closeModal() {
    jquery('div#edit-modal-container').toggleClass('show')
  }

}
