import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import * as jquery from 'jquery';
import { MapService } from '../services/map.service';
import { Map } from '../models/map.model';
import {map} from 'rxjs/operators';



@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {

  user: Observable<firebase.User>;
  panelOpen: boolean;
  modalOpen: boolean;
  maps;

  addingMap: boolean;
  editingMap: boolean;

  mapToEdit: Map;
  currentMap: Map;

  galleryName: string;
  constructor( private mapService: MapService, private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) {
        // force route reload whenever params change;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.mapService.getMaps().snapshotChanges().pipe(
      map(actions => 
      actions.map(a => ({ key: a.key, ...a.payload.val() }))
    )).subscribe((data) => {
          for(let i = 0; i < data.length; i++) {
            if(data[i].current) {
              this.currentMap = data[i];
            }
          }
          this.maps = data;
      }
    );

    this.addingMap = false;
    this.editingMap = false;
    this.modalOpen = false;
    this.panelOpen = false;
    this.user = this.authService.authUser();
  }

  logOut() {
    this.authService.logout().then(onResolve => this.router.navigate['/']);
  }

  toGallery(title: string) {
    this.router.navigate(['/gallery/' + title])
  }

  togglePanel(){
    jquery("div#admin-sidebar").toggleClass("show");
    jquery("div.admin-toggle").toggleClass("show");
  }

  openModal() {
    jquery('div.modal').addClass('show');
    jquery('div#modal-bg').addClass('show')
  }

  closeModal() {
    jquery('div.modal').removeClass('show');
    jquery('div#modal-bg').removeClass('show')
  }

  addMap() {
    this.addingMap = true;
    this.editingMap = false;
  }

  removeMap(map: Map) {
    this.mapService.removeMap(map);
  }

  setCurrentMap(newMap: Map) {
    if(newMap.current) {
      console.log('Already set to current')
    } else {
      if(this.currentMap) {
        const previousMap = this.currentMap;
        previousMap.current = false;
        this.mapService.updateMap(previousMap);
      }
      let currentMapToUpdate = newMap;
      currentMapToUpdate.current = true;
      this.mapService.updateMap(currentMapToUpdate);
    }

  }

  editMap(map: Map) {
    this.addingMap = false;
    this.editingMap = true;
    this.mapToEdit = map;
  }

}
