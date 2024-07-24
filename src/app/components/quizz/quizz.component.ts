import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import houses_hogwarts from "../../../../data/houses_hogwarts.json";
import seu_patrono from "../../../../data/seu_patrono.json";

@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [
    NgOptimizedImage,
    CommonModule
  ],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.scss'
})
export class QuizzComponent implements OnInit{
  title:string = "";

  questions: any;
  questionSelected: any;

  answers:string[] = [];
  answersSelected:string = "";

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  finished:boolean = false;

  constructor() {}
  ngOnInit(): void {
    if(houses_hogwarts){
      this.finished = false
      this.title = houses_hogwarts.title

      this.questions = houses_hogwarts.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

    }
  }
  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
    console.log(this.answers);
  }

  async nextStep(){
    this.questionIndex+=1
    if(this.questionIndex < this.questionMaxIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answersSelected = houses_hogwarts.results[finalAnswer as keyof typeof houses_hogwarts.results]
    }
  }

  async checkResult(answers:string[]){
    const result = answers.reduce((previous,current,i,arr)=>{
      if (arr.filter(item => item === previous).length > arr.filter(item => item === previous).length ) {
        return previous
      } else {
        return current
      }
    })
    return result
  }

}
