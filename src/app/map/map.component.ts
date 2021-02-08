import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import panzoom from "panzoom";
import * as jquery from 'jquery';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('scene', { static: false }) scene: ElementRef;
  panZoomController;
  zoomLevels: number[];
  panZoomPaused;

  currentZoomLevel: number;

  ngOnInit() {
    this.panZoomPaused = true;
    // jquery('.token').draggable();
    console.log(jquery('.token'))
  }

  zoom() {
    const isSmooth = false;
    const scale = this.currentZoomLevel;


    if (scale) {
      const transform = this.panZoomController.getTransform();
      const deltaX = transform.x;
      const deltaY = transform.y;
      const offsetX = scale + deltaX;
      const offsetY = scale + deltaY;

      if (isSmooth) {
        this.panZoomController.smoothZoom(0, 0, scale);
      } else {
        this.panZoomController.zoomTo(offsetX, offsetY, scale);
      }
    }

  }

  zoomToggle(zoomIn: boolean) {
    const idx = this.zoomLevels.indexOf(this.currentZoomLevel);
    if (zoomIn) {
      if (typeof this.zoomLevels[idx + 1] !== 'undefined') {
        this.currentZoomLevel = this.zoomLevels[idx + 1];
      }
    } else {
      if (typeof this.zoomLevels[idx - 1] !== 'undefined') {
        this.currentZoomLevel = this.zoomLevels[idx - 1];
      }
    }
    if (this.currentZoomLevel === 1) {
      this.panZoomController.moveTo(0, 0);
      this.panZoomController.zoomAbs(0, 0, 1);
    } else {
      this.zoom();
    }
  }

  onKeyDownEvent(event: any){
    if(event.altKey && this.panZoomController.isPaused() === false) {
      this.panZoomController.pause()
      this.panZoomPaused = true;
    } else if (event.altKey && this.panZoomController.isPaused() === true){
      this.panZoomController.resume()
      this.panZoomPaused = false;


    }
    console.log(event.altKey);
  }

  ngAfterViewInit() {

    this.zoomLevels = [0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3];
    this.currentZoomLevel = this.zoomLevels[4];
    // panzoom(document.querySelector('#scene'));
    this.panZoomController = panzoom(this.scene.nativeElement);
    this.panZoomController.pause()
  }
}
