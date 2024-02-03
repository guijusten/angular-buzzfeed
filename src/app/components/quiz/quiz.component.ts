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

type Option = {
  id: number;
  name: string;
  alias: string;
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
  user_choices: string[] = [];
  isPlaying: boolean = true;
  result: string = '';

  countOccurences(element: string) {
    return this.user_choices.reduce(
      (count, current_elt) => (current_elt == element ? count + 1 : count),
      0
    );
  }

  handleClick = (prop: Option) => {
    this.user_choices.push(prop.alias);

    this.index += 1;
    if (this.data.questions[this.index]) {
      this.current_question = this.data.questions[this.index];
    } else {
      this.result = 'Herói';
      if (this.countOccurences('A') > this.countOccurences('B'))
        this.result = 'Vilão';
      this.isPlaying = !this.isPlaying;
    }
  };

  constructor() {
    var json = require('../../../assets/data/quiz-questions.json');
    this.data = json;
    this.current_question = this.data.questions[this.index];
  }

  ngOnInit(): void {}
}
