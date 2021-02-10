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
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { MapUploaderComponent } from './admin-sidebar/map-upload/map-upload.component';
import { MapUploadTaskComponent } from './admin-sidebar/map-upload-task/map-upload-task.component';
import { MapEditComponent } from './admin-sidebar/map-edit/map-edit.component';
import { TokenUploaderComponent } from './admin-sidebar/token-upload/token-upload.component';
import { TokenUploadTaskComponent } from './admin-sidebar/token-upload-task/token-upload-task.component';
import { TokenEditComponent } from './admin-sidebar/token-edit/token-edit.component';
import { LoginComponent } from './pages/login/login.component';
import { MapComponent } from './map/map.component';
import { BlockAddComponent } from './admin-sidebar/block-add/block-add.component';
import { BlockEditComponent } from './admin-sidebar/block-edit/block-edit.component';


//Services
import { MapService } from './services/map.service';
import { TokenService } from './services/token.service';
import { BlockService } from './services/block.service';
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
    MapEditComponent,
    AdminSidebarComponent,
    DropzoneDirective,
    MapUploaderComponent,
    MapUploadTaskComponent,
    TokenUploaderComponent,
    TokenUploadTaskComponent,
    TokenEditComponent,
    MapComponent,
    BlockAddComponent,
    BlockEditComponent
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
  providers: [ BlockService, TokenService, MapService, AuthenticationService, AngularFireAuth, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
