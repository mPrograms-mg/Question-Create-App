import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss'],
})
export class CreateQuestionComponent implements OnInit {
  isSingle: boolean;
  isMultiple: boolean;
  isOpen: boolean;
  QuesType: string;
  QuesCreateType: FormGroup;
  QuestionId: any;
  QuestionData = [];
  isEdit: boolean;

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
  constructor(
    private route: Router,
    private QuestionCreate: FormBuilder,
    private activetedRoute: ActivatedRoute
  ) {
    this.QuesCreateType = this.QuestionCreate.group({
      question: new FormControl('', [Validators.required]),
      option1: new FormControl('', [Validators.required]),
      option2: new FormControl('', [Validators.required]),
      option3: new FormControl('', [Validators.required]),
      option4: new FormControl('', [Validators.required]),
      // ansDate: new FormControl('', [Validators.required]),
      // date: new FormControl(new Date().toJSON()),
      // id: new FormControl(new Date().getTime()),
      // answered: new FormControl(false),
      // type: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.activetedRoute.paramMap.subscribe((param) => {
      this.QuestionId = param.get('id');
      if (this.QuestionId) {
        this.isEdit = true;
      }
    });

    if (this.QuestionData !== null) {
      this.QuestionData = JSON.parse(localStorage.getItem('questions'));
    }

    console.log(this.QuestionData);
    this.QuestionData?.forEach((ele: any) => {
      if (ele.id == this.QuestionId) {
        if (ele.type == 1) {
          this.isSingle = true;
          this.QuesCreateType.patchValue({
            question: ele.question,
            option1: ele.option1,
            option2: ele.option2,
          });
        } else if (ele.type == 2) {
          this.isMultiple = true;
          this.QuesCreateType.patchValue({
            question: ele.question,
            option1: ele.option1,
            option2: ele.option2,
            option3: ele.option3,
            option4: ele.option4,
          });
        } else if (ele.type == 3) {
          this.isOpen = true;
          this.QuesCreateType.patchValue({
            question: ele.question,
          });
        } else {
          this.isSingle = false;
          this.isMultiple = false;
          this.isOpen = false;
        }
      }
    });
  }

  createQues(event: any) {
    this.QuesType = event.target.value;
    if (this.QuesType == 'single') {
      this.isSingle = true;
      this.isMultiple = false;
      this.isOpen = false;
      this.QuesCreateType.reset();
    } else if (this.QuesType == 'multiple') {
      this.isMultiple = true;
      this.isSingle = false;
      this.isOpen = false;
      this.QuesCreateType.reset();
    } else if (this.QuesType == 'open') {
      this.isOpen = true;
      this.isSingle = false;
      this.isMultiple = false;
      this.QuesCreateType.reset();
    } else {
      this.isSingle = false;
      this.isMultiple = false;
      this.isOpen = false;
    }
  }

  QuestionSet(type: number) {
    this.isEdit ? this.UpdateQuestion() : this.createQuestion(type);
    // this.createQuestion(type);

    // if (type == 1) {
    //   console.log(this.QuesCreateType.value);
    //   this.data.question = this.QuesCreateType.get('question').value;
    //   this.data.type = type;
    //   this.data.option1 = this.QuesCreateType.get('option1').value;
    //   this.data.option2 = this.QuesCreateType.get('option2').value;
    //   const Qdata = this.data;
    //   const localData = localStorage.getItem('questions')
    //     ? JSON.parse(localStorage.getItem('questions'))
    //     : [];
    //   localData.push(Qdata);
    //   localStorage.setItem('questions', JSON.stringify(localData));
    //   this.route.navigate(['']);
    // } else if (type == 2) {
    //   this.data.question = this.QuesCreateType.get('question').value;
    //   this.data.type = type;
    //   this.data.option1 = this.QuesCreateType.get('option1').value;
    //   this.data.option2 = this.QuesCreateType.get('option2').value;
    //   this.data.option3 = this.QuesCreateType.get('option3').value;
    //   this.data.option4 = this.QuesCreateType.get('option4').value;
    //   const Qdata = this.data;
    //   const localData = localStorage.getItem('questions')
    //     ? JSON.parse(localStorage.getItem('questions'))
    //     : [];
    //   localData.push(Qdata);
    //   localStorage.setItem('questions', JSON.stringify(localData));
    //   this.QuesCreateType.reset();
    //   this.route.navigate(['']);
    // } else if (type == 3) {
    //   this.data.question = this.QuesCreateType.get('question').value;
    //   this.data.type = type;
    //   const Qdata = this.data;
    //   const localData = localStorage.getItem('questions')
    //     ? JSON.parse(localStorage.getItem('questions'))
    //     : [];
    //   localData.push(Qdata);
    //   localStorage.setItem('questions', JSON.stringify(localData));
    //   this.route.navigate(['']);
    // } else {
    //   alert('Select Question');
    // }
  }

  createQuestion(type: number) {
    if (type == 1) {
      console.log(this.QuesCreateType.value);
      this.data.question = this.QuesCreateType.get('question').value;
      this.data.type = type;
      this.data.option1 = this.QuesCreateType.get('option1').value;
      this.data.option2 = this.QuesCreateType.get('option2').value;
      const Qdata = this.data;
      const localData = localStorage.getItem('questions')
        ? JSON.parse(localStorage.getItem('questions'))
        : [];
      localData.push(Qdata);
      localStorage.setItem('questions', JSON.stringify(localData));
      this.route.navigate(['']);
    } else if (type == 2) {
      this.data.question = this.QuesCreateType.get('question').value;
      this.data.type = type;
      this.data.option1 = this.QuesCreateType.get('option1').value;
      this.data.option2 = this.QuesCreateType.get('option2').value;
      this.data.option3 = this.QuesCreateType.get('option3').value;
      this.data.option4 = this.QuesCreateType.get('option4').value;
      const Qdata = this.data;
      const localData = localStorage.getItem('questions')
        ? JSON.parse(localStorage.getItem('questions'))
        : [];
      localData.push(Qdata);
      localStorage.setItem('questions', JSON.stringify(localData));
      this.QuesCreateType.reset();
      this.route.navigate(['']);
    } else if (type == 3) {
      this.data.question = this.QuesCreateType.get('question').value;
      this.data.type = type;
      const Qdata = this.data;
      const localData = localStorage.getItem('questions')
        ? JSON.parse(localStorage.getItem('questions'))
        : [];
      localData.push(Qdata);
      localStorage.setItem('questions', JSON.stringify(localData));
      this.route.navigate(['']);
    } else {
      alert('Select Question');
    }
  }

  UpdateQuestion() {
    console.log(this.QuesCreateType.value);
    this.QuestionData.forEach((ele: any) => {
      ele.id == this.QuestionId
        ? ((ele.question = this.QuesCreateType.get('question').value),
          (ele.option1 = this.QuesCreateType.get('option1').value),
          (ele.option2 = this.QuesCreateType.get('option2').value),
          (ele.option3 = this.QuesCreateType.get('option3').value),
          (ele.option4 = this.QuesCreateType.get('option4').value))
        : 'Not Update Table';
    });
    localStorage.setItem('questions', JSON.stringify(this.QuestionData));
    console.log(this.QuestionData);

    this.route.navigate(['/']);
  }
}
