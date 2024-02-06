import { Component, OnInit } from '@angular/core';

type Quiz = { img: string; name: string; id: number };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  quizzes: Quiz[] = [];

  handleQuizClick() {
    console.log('click on quiz card');
  }

  constructor() {}

  ngOnInit(): void {
    var json = require('../../../assets/data/quiz-questions.json');

    this.quizzes = json.map(
      (quiz: { img: string; name: string; id: number }) => {
        const object = { img: quiz.img, name: quiz.name, id: quiz.id };
        return object;
      }
    );
  }
}
