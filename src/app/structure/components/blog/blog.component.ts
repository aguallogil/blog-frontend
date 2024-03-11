import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateBlogDto } from '../../entities/blog-create.dto';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{
  submitted = false;
  blogForm!: FormGroup;
  @Output() formSubmitted = new EventEmitter<CreateBlogDto>();

  constructor(
    private fb: FormBuilder,
    private readonly blogService:BlogService) { }

  ngOnInit(): void {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  async onSubmit() {
    this.submitted = true;
    if (this.blogForm.valid) {
      try{
        const response=await this.blogService.create(this.blogForm.value).toPromise();
        if(response && response.id){
          this.formSubmitted.emit(response);
        }
      }
      catch(error){
        console.log(error);
      }
      finally{
        this.blogForm.reset();
      }
    }
  }
}
