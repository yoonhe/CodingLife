// 1. 화면에 문제 보여주기
// 2. 5초 동안 문제 보여준 뒤 5초동안 답안 보여주기

let widget = App.showWidget('widget.html', 'top', 200, 300);

App.onStart.Add(function(){
  widget.sendMessage({
    question : "A는 무엇일까요 ?",
    answer : "",
  });
});


App.onUpdate.Add(function(dt){
  if(!widget) {
    return;
  }

  if(!questionTimer.isExpired()) {
    questionTimer.add(dt);
  }

  if(questionTimer.isExpired() && !answerTimer.isExpired()){
    answerTimer.add(dt);
  }

  if(questionTimer.isExpired()){
    widget.sendMessage({
      question : "A는 무엇일까요 ?",
      answer: "정답은 A !"
    });
  }

  if(answerTimer.isExpired()){
    widget.destroy();
    widget = null;

    App.showCenterLabel("🔥 골든벨이 종료되었습니다 🔥");
  }
})


class Timer {
  constructor(time) {
    this.time = time;
    this.elapsedTime = 0;
  }

  add(dt) {
    this.increaseElapsedTime(dt);
  
    if(this.isPlaying()) {
      App.showCenterLabel(this.time);
    }
    
    if(this.isOneSecondPassed()){
      this.initElapsedTime();
      this.decreaseTime();
    }
  }

  increaseElapsedTime(dt) {
    this.elapsedTime += dt;
  }

  decreaseTime() {
    this.time -= 1;
  }

  initElapsedTime() {
    this.elapsedTime = 0;
  }

  isPlaying() {
    return this.time >= 1
  }

  isOneSecondPassed() {
    return this.elapsedTime >= 1
  }

  isExpired() {
    return this.time < 1;
  }
}

const questionTimer = new Timer(5);
const answerTimer = new Timer(5);
