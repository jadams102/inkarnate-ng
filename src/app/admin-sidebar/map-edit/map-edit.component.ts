import { Component, OnInit, Input } from '@angular/core';
import { MapService } from '../../services/map.service';
import * as jquery from 'jquery';

@Component({
  selector: 'app-map-edit',
  templateUrl: './map-edit.component.html',
  styleUrls: ['./map-edit.component.scss']
})
export class MapEditComponent implements OnInit {
  @Input() mapToEdit;

  constructor(private MapService: MapService) { }

  ngOnInit() {
  }

  updateImage(map) {
    this.MapService.updateMap(map);
  }

  closeModal() {
    jquery('div#edit-modal-container').toggleClass('show')
  }

}
