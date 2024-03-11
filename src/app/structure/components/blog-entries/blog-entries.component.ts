
import { Component, OnInit, Pipe, PipeTransform, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CreateBlogDto } from '../../entities/blog-create.dto';
import { BlogService } from '../../services/blog.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-blog-entries',
  templateUrl: './blog-entries.component.html',
  styleUrl: './blog-entries.component.css'
})
export class BlogEntriesComponent implements OnInit {
  isOpen = signal<boolean>(false);
  blogEntries = signal<CreateBlogDto[]>([]);

  constructor(private readonly blogService: BlogService) { }
  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((term: string) => this.blogService.searchBlogEntries(term)),
      takeUntil(this.unsubscribe$)
    ).subscribe(results => {
      this.blogEntries.set(results);
    });
    this.searchTerms.next('');
  }
  async loadData() {
    try {
      const data = await this.blogService.getAll().toPromise();
      if (data && data.length) {
        this.blogEntries.set(data);
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  private searchTerms = new Subject<string>();
  private unsubscribe$ = new Subject<void>();
  toggleContent(entry: any) {
    entry.expanded = !entry.expanded;
  }
  closeModal() {
    this.isOpen.set(false);
  }
  handleFormSubmission(event: any) {
    console.log(event);
    if (event && event.id)
      this.loadData();
    this.closeModal();
  }
  openCreateModal() {
    this.isOpen.set(true);
  }
  buscar(event: Event): void {
    this.searchTerms.next((event.target as HTMLInputElement).value);
  }
  shouldShowMore(content: string | null | undefined): boolean {
    return !!content && content.length > 70;
  }
}
@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
