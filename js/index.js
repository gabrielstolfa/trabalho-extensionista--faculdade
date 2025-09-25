import{
    createUser,
    login
} from "./login.js"

import{
    currentUserName,
    showDisplay,
    renderWorkouts,
    changeInfo,
    renderBtns
} from "./interface.js"

import{
    questionOne
} from "./forms.js"

import{
    getCurrentUser
} from './user-util.js'

import { dayOne, dayTwo, dayThree, dayFour, dayFive } from './workout.js'

/*******************Tela de Login  ********************/
////////////////Logout

const logoutBtn = document.getElementById('logout')


// Função Sair
if(logoutBtn)
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser') // remove usuário atual
    window.location.href = 'index.html'    // redireciona para tela de login
})

//////// Manipulação de Layout caso seja registrado:
const toLoginBtn = document.querySelector('#toLoginSectionBtn')
if(toLoginBtn){
toLoginBtn.addEventListener('click',()=>{
    showDisplay(document.querySelector('#loginDiv'),'hidden','show', document.querySelector('#starterDiv'),'show','hidden')
}) 
}



const backToStartBtn = document.querySelector('#backToStart')
if(backToStartBtn){
backToStartBtn.addEventListener('click',()=>{
    showDisplay(document.querySelector('#starterDiv'),'hidden','show', document.querySelector('#loginDiv'),'show','hidden')
    // Limpar mensagem de erro
    document.querySelector('#loginError').textContent = ''
})
}
/////// Manipulação de layout Caso não seja :
const toRegisterBtn = document.querySelector('#toRegister')
if(toRegisterBtn){
toRegisterBtn.addEventListener('click',()=>{
    showDisplay(document.querySelector('#registerDiv'),'hidden','show', document.querySelector('#starterDiv'),'show','hidden')
})
}
const backToStartTwo = document.querySelector('#backToStartTwo')
if(backToStartTwo){
    backToStartTwo.addEventListener('click', () => {
    showDisplay(
        document.querySelector('#starterDiv'), 'hidden', 'show',
        document.querySelector('#registerDiv'), 'show', 'hidden'
    );
})
}


////////// Salvar novo Usuário 
const saveUser = document.querySelector('#saveNewUserBtn')
if(saveUser){
saveUser.addEventListener('click', createUser )
}
////////// Login

const loginBtn = document.querySelector('#loginBtn')
if(loginBtn){
loginBtn.addEventListener('click', login)
}


/**************** Página principal *****************/

//////////Nome de usuário ao carregar página 
// Nome + render ao carregar a página principal
  function initMainPage() {
  const helloDiv = document.querySelector('#helloDiv');
  if (!helloDiv) return;

  const currentUser = getCurrentUser();

  // Se não tiver usuário logado, mostra mensagem pequena sem destruir a estrutura
  if (!currentUser) {
    // opcional: esconder actions se quiser
    const nameEl = document.querySelector('#currentUserName');
    if (nameEl) nameEl.textContent = 'Faça login';
    // esconder botões que só fazem sentido quando logado
    helloDiv.classList.remove('hidden');
    return;
  }

  // mostra a barra e atualiza o nome
  helloDiv.classList.remove('hidden');
  currentUserName();

  // Se não tem infos, não gera nem renderiza treinos (mantém botão "Começar" visível)
  if (!currentUser.infos || currentUser.infos.length === 0) {
    // atualiza visibilidade dos buttons de dia (vai esconder dia 4/5 corretamente)
    if (typeof renderBtns === 'function') renderBtns();
    return;
  }

  // Se infos existem, garante workouts (gera apenas se realmente não existirem)
  if (!currentUser.workouts || currentUser.workouts.length === 0) {
    dayOne();
    dayTwo();
    dayThree();
    if (currentUser.days >= 4) dayFour();
    if (currentUser.days === 5) dayFive();
  }

  // Atualiza visibilidade dos botões e renderiza (renderWorkouts lê do localStorage)
  if (typeof renderBtns === 'function') renderBtns();
  renderWorkouts();
}


// Chama na hora de carregar a página
document.addEventListener('DOMContentLoaded', initMainPage);


//////// Começar fluxo de perguntas
const startBtn = document.querySelector('#start')
if(startBtn){
    startBtn.addEventListener('click', questionOne)
}

// Recomeçar
const restartBtn = document.querySelector('#changeInfo')
if(restartBtn){
    restartBtn.addEventListener('click', changeInfo)
}
