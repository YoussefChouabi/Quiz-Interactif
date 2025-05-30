let score = 0;
async function loadQuizs(url,callback) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    callback(data);
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


function loadCurrentQustion(currentQuestion) {
    const question = document.getElementById("question");
    const level = document.getElementById("question_level");
    const options = document.getElementById("options");

    options.textContent = ''
    question.textContent = ''
    options.textContent = ''

    question.textContent = currentQuestion.question;
    level.textContent = "level :"+currentQuestion.level;
        currentQuestion.options.forEach((option,index)=> {
        let container = document.createElement('div');
        let label = document.createElement('label')
        label.textContent = option;
        label.setAttribute('for','input_'+index);
        let radioInput = document.createElement('input');
        radioInput.setAttribute('type','radio');
        radioInput.setAttribute('name','option');
        radioInput.setAttribute('id','input_'+index);
        radioInput.classList.add('question_option');
        container.appendChild(radioInput);
        container.appendChild(label);
        options.appendChild(container);
    });
}
function displayQuiz(data){
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");
    let i = 0;
    let questions = data.quiz.questions;
    loadCurrentQustion(questions[i]);
    nextBtn.addEventListener('click',()=>{
        i++;
        if(i >= questions.length) {
            i = questions.length - 1;
            return;
        };
        loadCurrentQustion(questions[i]);
    })
    prevBtn.addEventListener('click',()=>{
        i--;
        if(i <= 0) {
            i=0;
            return;
        };
        loadCurrentQustion(questions[i]);
    })
}

loadQuizs('quizes.json',displayQuiz);