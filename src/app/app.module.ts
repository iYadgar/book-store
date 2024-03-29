import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NavbarModule} from './components/navbar/navbar.module';
import {NG_ENTITY_SERVICE_CONFIG} from '@datorama/akita-ng-entity-service';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NavbarModule, environment.production ? [] : AkitaNgDevtools.forRoot(), HttpClientModule, BrowserAnimationsModule, DialogModule],
  providers: [{provide: NG_ENTITY_SERVICE_CONFIG, useValue: {baseUrl: 'https://jsonplaceholder.typicode.com'}}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
