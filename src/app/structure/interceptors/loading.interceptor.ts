import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
//SE IMPLEMENTA UN INTERCEPTOR PARA ATRAPAR TODAS LAS PETICIONES HTTP Y AUTOMATICAMENTE
//DESPLIEGUE UN LOADDING
//ESTO SE IMPLEMENTA EN EL APP COMPONENT, PARA QUE ABARQUE TODA LA APLICACION
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.showLoading();
    return next.handle(request).pipe(
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }
}
