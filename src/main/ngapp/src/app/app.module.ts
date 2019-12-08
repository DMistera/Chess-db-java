import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './shared/components/menu-bar/menu-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material/material.module';
import { PlayerListComponent } from './forms/player-list/component/player-list.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PlayerEditorComponent } from './forms/player-editor/player-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerViewComponent } from './forms/player-view/player-view.component';
import { InterceptorService } from './shared/services/error-handler/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    PlayerListComponent,
    PlayerEditorComponent,
    PlayerViewComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
