import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./structure/components/login/login.component";
import { BlogEntriesComponent } from "./structure/components/blog-entries/blog-entries.component";
import { AuthGuard } from "./structure/guards/auth.guard";
import { JwtGuard } from "./structure/guards/jwt.guard";

export const routes: Routes = [
    { path: 'login', component: LoginComponent,canActivate:[JwtGuard] },
    { path: 'blog-entries', component: BlogEntriesComponent,canActivate:[AuthGuard]},
    { path: '', redirectTo: '/blog-entries', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }