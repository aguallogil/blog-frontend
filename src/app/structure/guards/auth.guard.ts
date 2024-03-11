import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    try {
      console.log('entro')
      const isAuthenticated = await this.authService.isLoggedIn();
      if (isAuthenticated) {
        return true;
      }
      this.router.navigate(['/login']); // Redirige a la página de inicio de sesión si no está permitido
      return false;
    } catch (error) {
      this.router.navigate(['/login']); // Manejo de errores, redirige a la página de inicio de sesión en caso de error
      return false;
    }
  }
}
