import {  NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './structure/components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

import { BlogEntriesComponent, SafeHtmlPipe } from './structure/components/blog-entries/blog-entries.component';
import { BlogComponent } from './structure/components/blog/blog.component';
import { AuthInterceptor } from './structure/interceptors/auth.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SafeHtmlPipe,
        BlogEntriesComponent,
        BlogComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
