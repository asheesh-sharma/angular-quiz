import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Quiz';
  start: number = 0;
  prevbtnDis: boolean = false;
  nextbtnDis: boolean = false;
  rightAnswer: number = 0;
  totalAnswered: number = 0;
  unattended: boolean = false;
  answerArray = [];
  unattendedQuestionArray = [];
  isSubmitted: boolean = false;

  question: any = [{
    "id": 1,
    "question": "What is the capital of Inida?",
    "a": "Lucknow",
    "b": "Delhi",
    "c": "Varanasi",
    "d": "Hyderabad",
    "answer": "b"
  },
  {
    "id": 2,
    "question": "Full form of HTML?",
    "a": "Hypertext Make up lang",
    "b": "Hypertext transfer Protocol",
    "c": "Hypertext Markup language",
    "d": "Hypetext markup language",
    "answer": "c"
  },
  {
    "id": 3,
    "question": "Grand Central Terminal, Park Avenue, New York is the world's?",
    "a": "largest railway station",
    "b": "highest railway station",
    "c": "longest railway station",
    "d": "None of these",
    "answer": "a"
  },
  {
    "id": 4,
    "question": "Eritrea, which became the 182nd member of the UN in 1993, is in the continent of",
    "a": "Asia",
    "b": "Africa",
    "c": "Brussels",
    "d": "London",
    "answer": "b"
  },
  {
    "id": 5,
    "question": "Garampani sanctuary is located at",
    "a": "Junagarh, Gujarat",
    "b": "Diphu, Assam",
    "c": "Kohima, Nagaland",
    "d": "Gangtok, Sikkim",
    "answer": "b"
  },
  {
    "id": 6,
    "question": "For which of the following disciplines is Nobel Prize awarded?",
    "a": "Physics and Chemistry",
    "b": "Physiology or Medicine",
    "c": "Literature, Peace and Economics",
    "d": "All of the Above",
    "answer": "d"
  },
  {
    "id": 7,
    "question": "Hitler party which came into power in 1933 is known as",
    "a": "Labour Party",
    "b": "Nazi Party",
    "c": "Ku-Klux-Klan",
    "d": "Democratic Party",
    "answer": "b"
  },
  {
    "id": 8,
    "question": "Which of the following special symbol allowed in a variable name?",
    "a": "* (asterisk)",
    "b": "| (pipeline)",
    "c": "- (hyphen)",
    "d": "_ (underscore)",
    "answer": "d"
  },
  {
    "id": 9,
    "question": "How would you round off a value from 1.66 to 2.0?",
    "a": "ceil(1.66)",
    "b": "floor(1.66)",
    "c": "roundup(1.66)",
    "d": "roundto(1.66)",
    "answer": "a"
  },
  {
    "id": 10,
    "question": "What is the term used for describing the judgmental or commonsense part of problem solving?",
    "a": "Heuristic",
    "b": "Critical",
    "c": "Value based",
    "d": "Analytical",
    "answer": "a"
  }
  ];

  ngOnInit() {
    if (this.start === 0) {
      this.prevbtnDis = true;
    }
  }

  /* Onclick of Previous Button */
  getPreviousQuestion(index) {
    if(this.unattendedQuestionArray.indexOf(index-1)){
      this.unattended = false;
    }else{
      this.unattended = true;
    }
    this.start--
    this.nextbtnDis = false;
    if (this.start === 0) {
      this.nextbtnDis = false;
      this.prevbtnDis = true;
    }
    
  }

  /* Onclick of Next Button */
  getNextQuestion(index) {
    if(this.unattendedQuestionArray.indexOf(index+1)){
      this.unattended = false;
    }else{
      this.unattended=true;
    }
    this.start++;
    this.prevbtnDis = false;
    if (this.start === 9) {
      this.nextbtnDis = true;
      this.prevbtnDis = false;
    }
  }

  /* Submit Quiz */
  submitTest() {
    this.isSubmitted = true;
    this.unattendedQuestionArray = [];
    this.rightAnswer = 0;
    this.totalAnswered = 0;
    for (let i = 0; i < this.question.length; i++) {
      if ("selected" in this.question[i] && (this.question[i]["selected"] != null)) {
        this.totalAnswered++;
        if (this.question[i]["selected"] == this.question[i]["answer"]) {
          this.rightAnswer++;
        }
      } else {
        this.unattendedQuestionArray.push(i); {
          this.unattended = true;
          /* Handling unattended question */
          if (this.unattendedQuestionArray.length > 0) {
            this.start = this.unattendedQuestionArray[0]
          }
          /* disabling the previous button if user not attended the first quest and enabling the next button*/
          if (this.unattendedQuestionArray[0] === 0) {
            this.prevbtnDis = true;
            this.nextbtnDis = false;
          } else if (this.unattendedQuestionArray[0] === (this.question.length - 1)) {
          } else {
            this.nextbtnDis = false;
          }
        }

      }

    }
    // alert('All Questions are Mandatory!')
    if (this.totalAnswered === 10) {
      this.reportGenerate();
      alert('You got' + this.rightAnswer + ' out of ' + this.totalAnswered)
    }
  }

  selectedValue(event,index:number) {
    if (event.target.checked) {
      this.unattended = false;
    } else {
      this.unattended = true;
    }
  }

  /* Creating pie chart */

  reportGenerate() {
    $('#report').html('');
    let data = [this.rightAnswer, this.totalAnswered - this.rightAnswer];
    let width = 900,
      height = 300,
      radius = Math.min(width, height) / 2;
    let color = d3.scaleOrdinal()
      .range(["#68A74E", "#DC4437"]);

    let arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    let labelArc = d3.arc()
      .outerRadius(radius - 20)
      .innerRadius(radius - 20);

    let pie = d3.pie()
      .sort(null)
      .value(function (d) { return d; });

    let svg = d3.select("#report").append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    let g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    g.append("path")
      .attr("d", arc)
      .style("fill", function (d) {
        return color(d.data);
      });

    g.append("text")
      .attr("transform", function (d) {
        return "translate(" + labelArc.centroid(d) + ")";
      })
      .attr("dy", ".35em")
      .text(function (d) { return d.data; });
  }


}

