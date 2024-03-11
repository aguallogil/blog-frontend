import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private secretKey = environment.secretKey;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  encryptToken(token: string): string {
    return CryptoJS.AES.encrypt(token, this.secretKey).toString();
  }

  async login(username: string, password: string): Promise<void> {
    const requestBody = { username, password };
  
    try {
      //SE HACE LA PETICION
      const response: any = await this.http.post(`${this.apiUrl}auth/login`, requestBody).toPromise();
      //OBTENEMOS EL TOKEN
      const token = response.access_token;
      //ENCRYPTAMOS EL TOKEN PARA GUARDARLO EN LA COOKIE
      const encryptedToken = this.encryptToken(token);
      console.log(response)
      // Guardar el resto de los datos en otra cookie (puedes ajustar las propiedades según tus necesidades)
      const userMetadata = {
        ttl: response.ttl,
        created: response.created,
        userId: response.userId
      };
      //ENCRYPTAMOS LA METADATA DEL USUARIO
      const encryptedUserMetadata = this.encryptUserMetadata(userMetadata);
      this.cookieService.set('userMetadata', encryptedUserMetadata);
  
      // Guardar el token en la cookie existente
      this.cookieService.set('authToken', encryptedToken);
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }
  
  encryptUserMetadata(metadata: any): string {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(metadata), this.secretKey).toString();
    return encryptedData;
  }
  decryptUserMetadata(encryptedData: string): any {
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, this.secretKey).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  }
  getDecryptedToken(): string | null {
    const encryptedToken = this.cookieService.get('authToken');
    if (encryptedToken) {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, this.secretKey);
      return bytes.toString(CryptoJS.enc.Utf8);
    }
    return null;
  }

  private handleError(error: any): Observable<never> {
    // Realiza el manejo de errores aquí, como registrar o mostrar el error
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }
  isLoggedIn(): boolean {
    const decryptedToken = this.getDecryptedToken();
    console.log(decryptedToken)
    return decryptedToken !== null && decryptedToken !== undefined && decryptedToken !== '';
  }
  logout(): void {
    // Elimina las cookies relacionadas con la autenticación
    this.cookieService.delete('authToken');
    this.cookieService.delete('userMetadata');
  
    // Puedes realizar cualquier otra limpieza necesaria, como redirigir al usuario, etc.
  }
  getDecryptedUserMetadata(): any | null {
    const encryptedUserMetadata = this.cookieService.get('userMetadata');
    if (encryptedUserMetadata) {
      const decryptedData = this.decryptUserMetadata(encryptedUserMetadata);
      return decryptedData;
    }
    return null;
  }
}
