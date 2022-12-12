import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionManagementComponent } from './Quentionnaire/question-management/question-management.component';
import { QuestionListComponent } from './Quentionnaire/question-list/question-list.component';
import { CreateQuestionComponent } from './Quentionnaire/create-question/create-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    QuestionManagementComponent,
    QuestionListComponent,
    CreateQuestionComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
