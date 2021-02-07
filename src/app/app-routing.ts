import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArticleComponent} from './components/article/article.component';
import {FormComponent} from './components/form/form.component';

const routes: Routes = [
  {
    path: '', component: FormComponent
  },
  {
    path: ':channel', component: ArticleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouting { }
