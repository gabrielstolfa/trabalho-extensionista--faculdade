import{
    getWorkout
} from "./workout.js"

import{
    getCurrentUser
} from "./user-util.js"

import { 
    questionOne
 } from "./forms.js"

/******* Criação de Tags Genéricas*********/
function createTag(tag, infos = {}){
    const newTag = document.createElement(tag)

    for(let keys in infos){
        if(keys === 'text'){
            newTag.textContent = infos[keys]
        } else if (keys === 'html'){
            newTag.innerHTML = infos[keys]
        } else if(keys === 'ev'){
            newTag.addEventListener('click', infos[keys])
        } else {
            newTag.setAttribute(keys, infos[keys])
        }
    }


    return newTag
}


function errorAlert(input){
    input.classList.add('alertInput')
}

/***** Mudança de display's Iniciais */
function showDisplay(div1,classe1,classe2,div2,classe4,classe5){
    if(div1.classList.contains(classe1)){
        div1.classList.remove(classe1)
        div1.classList.add(classe2)

        div2.classList.remove(classe4)
        div2.classList.add(classe5)
    } else {
        div1.classList.remove(classe2)
        div1.classList.add(classe1)

        div2.classList.remove(classe5)
        div2.classList.add(classe4)
    }

}


  function currentUserName() {
  const user = getCurrentUser();
  if (!user) return;

  const nome = user.displayName || user.name || user.nickname || 'Usuário';
  const nameEl = document.querySelector('#currentUserName');
  if (nameEl) {
    nameEl.textContent = nome;
  }
  // garantir que a barra de usuário esteja visível
  const helloDiv = document.querySelector('#helloDiv');
  if (helloDiv) {
    helloDiv.classList.remove('hidden');
  }
}

/////////////////////// Renderizar treinos//////////////////////

function renderBtns(){ ///// Renderizar Botões
    const currentUser = getCurrentUser()
    if(!currentUser) return

    const btn4 = document.querySelector('#dayFourBtn')
    const btn5 = document.querySelector('#dayFiveBtn')
    const days = Number(currentUser.days)

    // Reset para evitar duplicação
    btn4.classList.add('hidden')
    btn4.classList.remove('show')
    btn5.classList.add('hidden')
    btn5.classList.remove('show')

    if(days >= 4){
        btn4.classList.remove('hidden')
        btn4.classList.add('show')
    } 
    if(days === 5){
        btn5.classList.remove('hidden')
        btn5.classList.add('show')
    }

}
/////// Formatando o tempo


function formatTime(seconds){
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
}

function renderWorkouts() {
  const workoutsSection = document.getElementById('workoutsSection');
  if (!workoutsSection) return;

  // Atualiza visibilidade de Day 4/5
  renderBtns();

  // Pega treinos do usuário
  const workouts = getWorkout() || [];

  // Limpa antes de renderizar
  workoutsSection.innerHTML = '';

  workouts.forEach((dayExercises, index) => {
    const dayDiv = document.createElement('div');
    dayDiv.id = `day${index + 1}Content`;
    dayDiv.classList.add('day-content', 'hidden');

    const ul = document.createElement('ul');

    dayExercises.forEach(ex => {
      const li = document.createElement('li');

      // Nome do exercício
      const nameSpan = document.createElement('span');
      nameSpan.classList.add('exercise-name');
      nameSpan.textContent = ex.name;

      // Sets/Reps
      const setsSpan = document.createElement('span');
      setsSpan.classList.add('exercise-sets');
      let setsText = '';
      if (ex.sets && ex.reps) {
        setsText = `${ex.sets}x${ex.reps}`;
      } else if (ex.reps) {
        setsText = ex.reps;
      } else if (ex.sets) {
        setsText = `${ex.sets} reps`;
      }
      setsSpan.textContent = setsText;

      // Descrição
      const descP = document.createElement('p');
      descP.classList.add('exercise-desc');
      descP.textContent = ex.description || '';

      // Botão de vídeo (abre nova aba)
      const videoBtn = document.createElement('button');
      videoBtn.textContent = 'Ver vídeo';
      videoBtn.addEventListener('click', () => {
        if (ex.link) window.open(ex.link, '_blank');
      });

      // Timer de descanso
      const timerBtn = document.createElement('button');
      const initial = Number(ex.restSeconds ?? 0);
      timerBtn.textContent = formatTime(initial);
      timerBtn.addEventListener('click', () => {
        let interval = initial;
        timerBtn.disabled = true;
        const rest = setInterval(() => {
          interval--;
          if (interval > 0) {
            timerBtn.textContent = formatTime(interval);
          } else {
            clearInterval(rest);
            timerBtn.textContent = 'Concluído';
          }
        }, 1000);
      });

      li.append(
        nameSpan, document.createTextNode(' '),
        setsSpan, document.createTextNode(' '),
        descP, document.createTextNode(' '),
        videoBtn, document.createTextNode(' '),
        timerBtn
      );

      ul.appendChild(li);
    });

    dayDiv.appendChild(ul);
    workoutsSection.appendChild(dayDiv);
  });

  // Mostrar barra de botões se houver treinos
  const btnsSection = document.getElementById('btnsSection');
  if (btnsSection && workouts.length > 0) btnsSection.classList.remove('hidden');

  const showDay = (i) => {
    document.querySelectorAll('.day-content').forEach((div, idx) => {
      if (idx === i) {
        div.classList.remove('hidden');
        div.classList.add('show');
      } else {
        div.classList.add('hidden');
        div.classList.remove('show');
      }
    });
  };

  document.getElementById('dayOneBtn')?.addEventListener('click', () => showDay(0));
  document.getElementById('dayTwoBtn')?.addEventListener('click', () => showDay(1));
  document.getElementById('dayThreeBtn')?.addEventListener('click', () => showDay(2));
  document.getElementById('dayFourBtn')?.addEventListener('click', () => showDay(3));
  document.getElementById('dayFiveBtn')?.addEventListener('click', () => showDay(4));

  if (workouts.length > 0) showDay(0);
}




////////////////////// Refazendo perguntas /////////////////////
function changeInfo(){
    const currentUser = getCurrentUser()
    if(!currentUser) return

    const divQuestion = document.querySelector('#questionsDiv')
     // Limpa treinos já renderizados
    workoutsSection.innerHTML = ''
    btnsSection.classList.add('hidden')

    // Limpa infos do usuário para refazer as perguntas
    currentUser.infos = []
    localStorage.setItem('currentUser', JSON.stringify(currentUser))

    // Mostra a primeira pergunta novamente
    divQuestion.classList.remove('hidden')
 
    questionOne()
}

export{
    createTag,
    errorAlert,
    currentUserName,
    showDisplay,
    renderWorkouts,
    changeInfo,
    renderBtns
}