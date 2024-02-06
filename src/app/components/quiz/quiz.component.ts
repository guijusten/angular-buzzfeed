import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

type Data = {
  title: string;
  questions: [];
  results: { A: string; B: string };
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
  data: Data = { title: '', questions: [], results: { A: '', B: '' } };
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

  handleOptionClick = (prop: Option) => {
    this.user_choices.push(prop.alias);

    this.index += 1;
    if (this.data.questions[this.index]) {
      this.current_question = this.data.questions[this.index];
    } else {
      this.result = this.data.results.B;
      if (this.countOccurences('A') > this.countOccurences('B'))
        this.result = this.data.results.A;
      this.isPlaying = !this.isPlaying;
    }
  };

  handleAgainClick = () => {
    this.user_choices = [];
    this.isPlaying = !this.isPlaying;
    this.index = 0;
    this.current_question = this.data.questions[this.index];
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    var id: any = '';

    this.route.paramMap.subscribe((value) => (id = value.get('id')));

    this.setValuesToComponent(id);
  }

  setValuesToComponent(id: any) {
    var json = require('../../../assets/data/quiz-questions.json');
    this.data = json[id];

    this.current_question = this.data.questions[this.index];
    console.log(this.data);
  }
}
