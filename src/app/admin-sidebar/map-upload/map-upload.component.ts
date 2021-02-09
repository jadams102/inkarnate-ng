import { Component, Input } from '@angular/core';
import { Map } from '../../models/map.model';

@Component({
  selector: 'map-upload',
  templateUrl: './map-upload.component.html',
  styleUrls: ['./map-upload.component.scss']
})
export class MapUploaderComponent {
  isHovering: boolean;

  uploads: Map[] = [];
  errors: String[] = [];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      if(files[i].type.startsWith('image/')) {
        this.uploads.push(new Map(files.item(i)));
      } else {
        this.errors.push(`File ${files[i].name} was not uploaded (wrong type)`)
      }
    }
  }
}