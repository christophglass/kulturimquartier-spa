import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
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
import { MatCardModule } from '@angular/material/card';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DocumentToHtmlPipe } from './pipes/document-to-html.pipe';
import { IconPipe } from './pipes/icon.pipe';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { Router } from '@angular/router';
import * as Sentry from "@sentry/angular-ivy";
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    DocumentToHtmlPipe,    
    IconPipe,
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
    MatCardModule,
    ShareButtonsModule,
    ShareIconsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "de-DE" },
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    }, 
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
