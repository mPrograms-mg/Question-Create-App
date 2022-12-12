import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss'],
})
export class QuestionManagementComponent implements OnInit {
  QuestionData = [];
  list = [];
  constructor(private route: Router) {}

  ngOnInit(): void {
    this.getQuestion();
  }

  getQuestion() {
    this.list = JSON.parse(localStorage.getItem('questions')) || null;
    const ab = this.list?.sort((a, b) => b.date?.localeCompare(a.date));
    this.QuestionData = this.list !== null ? this.list : [];
  }

  editQue(id: string) {
    console.log(id);
    this.route.navigate([`edit-question/${id}`]);
  }

  deleteQue(index: number) {
    console.log(index);
    this.QuestionData = this.QuestionData.filter((item, i) => i !== index);
    localStorage.setItem('questions', JSON.stringify(this.QuestionData));
  }
}
