import { Component, OnInit, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './structure/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(  private loadingService: LoadingService){}
  ngOnInit(): void {
    this.loadingSubscription = this.loadingService.loading$.subscribe((isLoading) => {
      this.isLoading.set(isLoading);
    });
  }
  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
  isLoading=signal<boolean>(false);
  private loadingSubscription!: Subscription;
  title = 'blog-frontend';
}
