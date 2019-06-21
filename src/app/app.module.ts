import { SneezesComponent } from './sneezes/sneezes.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { PersonComponent } from './person/person.component';
import { StatsComponent } from './stats/stats.component';
import { PieComponent } from './pie/pie.component';
import { SpdComponent } from './spd/spd.component';

import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReleaseNotesComponent } from './release-notes/release-notes.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KerchooComponent } from './kerchoo/kerchoo.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    PersonComponent,
    StatsComponent,
    PieComponent,
    SpdComponent,
    SneezesComponent,
    ReleaseNotesComponent,
    KerchooComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule,
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
