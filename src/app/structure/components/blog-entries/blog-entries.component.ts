
import { Component, OnInit, Pipe, PipeTransform, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CreateBlogDto } from '../../entities/blog-create.dto';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-entries',
  templateUrl: './blog-entries.component.html',
  styleUrl: './blog-entries.component.css'
})
export class BlogEntriesComponent implements OnInit {
  isOpen=signal<boolean>(false);
  blogEntries = signal<CreateBlogDto[]>([]);

  constructor(private readonly blogService:BlogService) {}
  ngOnInit(): void {
    this.loadData();
  }
  async loadData(){
    try{  
      const data=await this.blogService.getAll().toPromise();
      if(data && data.length){
        this.blogEntries.set(data);
      }
    }
    catch(error){
      console.log(error);
    }
  }

  toggleContent(entry: any) {
    entry.expanded = !entry.expanded;
  }
  closeModal(){
    this.isOpen.set(false);
  }
  handleFormSubmission(event: any) {
    console.log(event);
    if(event && event.id)
      this.loadData();
    this.closeModal();
  }
  openCreateModal(){
    this.isOpen.set(true);
  }
}
@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
