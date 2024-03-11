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
import { LoadingService } from './structure/services/loading.service';
import { LoadingInterceptor } from './structure/interceptors/loading.interceptor';

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
        LoadingService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
