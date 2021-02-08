import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';


//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { GalleryImageEditComponent } from './admin-sidebar/gallery-image-edit/gallery-image-edit.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { UploaderComponent } from './admin-sidebar/gallery-upload/gallery-upload.component';
import { UploadTaskComponent } from './admin-sidebar/gallery-upload-task/gallery-upload-task.component';
import { LoginComponent } from './pages/login/login.component';
import { MapComponent } from './map/map.component';

//Services
import { MapService } from './services/map.service';
import { AuthenticationService } from './services/authentication.service';

//Directives
import { DropzoneDirective } from './dropzone.directive';

//API Keys
import { config }  from './api-keys';

export const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  storageBucket: config.storageBucket
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    GalleryImageEditComponent,
    AdminSidebarComponent,
    DropzoneDirective,
    UploaderComponent,
    UploadTaskComponent,
    MapComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    DragDropModule
  ],
  providers: [ MapService, AuthenticationService, AngularFireAuth, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
