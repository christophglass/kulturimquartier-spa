import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';

const routes: Routes = [  
  { path: 'posts/:contentTypeId/:entryId', component: PostsComponent},
  { path: 'posts/:contentTypeId', component: PostsComponent},
  { path: 'posts', component: PostsComponent},
  { path: '', redirectTo: 'posts', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
