import { Component, OnInit } from '@angular/core';

type Data = {
  title: string;
  questions: [];
  results: {};
};

type Question = {
  id: number;
  question: string;
  options: [];
};

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  data: Data = { title: '', questions: [], results: {} };
  index: number = 0;
  current_question: Question = { id: 0, question: '', options: [] };

  constructor() {
    var json = require('../../../assets/data/quiz-questions.json');
    this.data = json;
    this.current_question = this.data.questions[this.index];
  }

  ngOnInit(): void {}
}
