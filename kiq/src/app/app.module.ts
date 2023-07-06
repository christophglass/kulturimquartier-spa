import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as fromContentTypes from './domain/+state/contentType/contentType.reducers';
import { ContentTypeEffects } from './domain/+state/contentType/contentType.effects';
import * as fromEntries from './domain/+state/entry/entry.reducers';
import { EntryEffects } from './domain/+state/entry/entry.effects';
import { PostsComponent } from './components/posts/posts.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature(fromContentTypes.contentType_KEY, fromContentTypes.reducer),
    StoreModule.forFeature(fromEntries.entry_KEY, fromEntries.reducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([ContentTypeEffects, EntryEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !environment.production}),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
