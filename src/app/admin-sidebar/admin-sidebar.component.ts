import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import * as jquery from 'jquery';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit, OnChanges {

  user: Observable<firebase.User>;
  panelOpen: boolean;
  modalOpen: boolean;
  maps;


  addingImage: boolean;

  galleryName: string;
  constructor( private mapService: MapService, private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) {
        // force route reload whenever params change;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit() {
    this.galleryName = this.route.snapshot.params.name;
    this.mapService.getMaps().valueChanges().subscribe((data) => {
       this.maps = data;
    })
    this.addingImage = false;
    this.modalOpen = false;
    this.panelOpen = false;
    this.user = this.authService.authUser();
  }

  ngOnChanges() {
    this.galleryName = this.route.snapshot.params.name;

  }

  logOut() {
    this.authService.logout().then(onResolve => this.router.navigate['/']);
  }

  toAbout() {
    this.router.navigate(['about'])
  }

  toContact() {
    this.router.navigate(['contact'])
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

  addImages() {
    this.addingImage = true;
  }

}
