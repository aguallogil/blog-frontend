export class CreateBlogDto {
    title?: string;
    author?: string;
    content?: string;
    expanded?:boolean;
    createdAt?:Date;
  }