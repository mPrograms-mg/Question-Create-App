import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
})
export class QuestionListComponent implements OnInit {
  Unans: any = [];
  Ans: any = [];
  QuestionValue: any = [];
  AnsType: FormGroup;
  AnwData = [];
  checkboxes = [];
  isBtn = false;

  data = {
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    type: null,
    date: new Date().toJSON(),
    id: new Date().getTime(),
    answered: false,
    ansDate: '',
  };

  constructor(private AnsCreate: FormBuilder, private route: Router) {
    this.AnsType = this.AnsCreate.group({
      option1: new FormControl('', [Validators.required]),
      option2: new FormControl('', [Validators.required]),
      option3: new FormControl('', [Validators.required]),
      option4: new FormControl('', [Validators.required]),
      ans: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.QuestionValue = localStorage.getItem('questions')
      ? JSON.parse(localStorage.getItem('questions'))
      : [];
    // console.log(this.QuestionValue);
    this.Unans = this.QuestionValue?.filter(
      (ele: any) => ele.answered == false
    );

    this.QuestionValue?.sort((a, b) => b.date?.localeCompare(a.date));
    // this.Unans = this.QuestionValue?.filter(
    //   (ele: any) => ele.answered == false
    // );
    // this.Ans = this.QuestionValue?.filter((ele: any) => ele.answered == true);
    // this.Unans?.sort((a, b) => b.date?.localeCompare(a.date));
    // this.Ans?.sort((a, b) => b.date?.localeCompare(a.date));
  }

  checkBox(event) {
    const checkArray = event.target.value;
    if (event.target.checked) {
      this.checkboxes.push(checkArray);
    } else {
      let index = this.checkboxes.indexOf(event.target.value);
      this.checkboxes.splice(index, 1);
    }

    console.log(this.checkboxes);
  }

  SubmitAns(id: number, type: number) {
    if (type == 1) {
      this.QuestionValue.forEach((ele: any) => {
        ele.type == type && ele.id == id
          ? ((ele.answer = this.AnsType.get('option2').value),
            (ele.answered = true),
            (ele.ansDate = new Date().toJSON()))
          : 'No Data';
      });

      localStorage.setItem('questions', JSON.stringify(this.QuestionValue));
    } else if (type == 2) {
      this.QuestionValue.forEach((ele: any) => {
        ele.type == type && ele.id == id
          ? ((ele.answer = this.checkboxes),
            (ele.answered = true),
            (ele.ansDate = new Date().toJSON()))
          : 'No Data';
      });
      localStorage.setItem('questions', JSON.stringify(this.QuestionValue));
    } else {
      this.QuestionValue.forEach((ele: any) => {
        ele.type == type && ele.id == id
          ? ((ele.answer = this.AnsType.get('ans').value),
            (ele.answered = true),
            (ele.ansDate = new Date().toJSON()))
          : 'No Data';
      });

      localStorage.setItem('questions', JSON.stringify(this.QuestionValue));
    }

    this.Unans = this.QuestionValue.filter((item) => item.answered == false);
    this.Unans?.sort((a, b) => b.date?.localeCompare(a.date));
    this.Ans = this.QuestionValue.filter((item) => item.answered == true);
    this.Ans?.sort((a, b) => b.date?.localeCompare(a.date));
  }

  BacktoUn(id: number, type: number) {
    if (type == 1) {
      this.QuestionValue.forEach((ele) => {
        ele.type == type && ele.id == id
          ? ((ele.answer = ''), (ele.answered = false))
          : 'No Data';
      });
      localStorage.setItem('questions', JSON.stringify(this.QuestionValue));
      this.AnsType.reset();
    } else if (type == 2) {
      this.QuestionValue.forEach((ele) => {
        ele.type == type && ele.id == id
          ? ((ele.answer = ''), (ele.answered = false))
          : 'No Data';
      });

      localStorage.setItem('questions', JSON.stringify(this.QuestionValue));
      this.AnsType.reset();
    } else {
      this.QuestionValue.forEach((ele) => {
        ele.type == type && ele.id == id
          ? ((ele.answer = ''), (ele.answered = false))
          : 'No Data';
      });
      localStorage.setItem('questions', JSON.stringify(this.QuestionValue));
      this.AnsType.reset();
    }

    this.Ans = this.QuestionValue.filter((item) => item.answered == true);
    this.Ans?.sort((a, b) => b.date?.localeCompare(a.date));
    this.Unans = this.QuestionValue.filter((item) => item.answered == false);
    this.Unans?.sort((a, b) => b.date?.localeCompare(a.date));
  }
}
