import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuestionComponent } from './Quentionnaire/create-question/create-question.component';
import { QuestionListComponent } from './Quentionnaire/question-list/question-list.component';
import { QuestionManagementComponent } from './Quentionnaire/question-management/question-management.component';
const routes: Routes = [
  { path: '', component: QuestionManagementComponent, pathMatch: 'full' },
  { path: 'create-question', component: CreateQuestionComponent },
  { path: 'question-list', component: QuestionListComponent },

  { path: 'edit-question/:id', component: CreateQuestionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
