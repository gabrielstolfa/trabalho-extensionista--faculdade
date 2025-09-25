import {
    createTag, 
    errorAlert,
    renderWorkouts,
    currentUserName
} from "./interface.js";

import {
    dayOne,
    dayTwo,
    dayThree,
    dayFour,
    dayFive
} from "./workout.js";

// Div de perguntas e mensagem de erro
const questionDiv = document.querySelector('#questionsDiv');
const msgError = document.querySelector('.msgError');

// Pegar usuário logado e lista de usuários
function getCurrentUserData() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = currentUser ? users.findIndex(u => u.nickname === currentUser.nickname) : -1;
    return { currentUser, users, userIndex };
}

// Função para criar perguntas
function createQuestion(text, inputs = [], btn) {
    const questionText = document.createElement('h2');
    questionText.textContent = text;
    const questionInput = Array.isArray(inputs) ? inputs : [inputs];
    const questionBtn = btn;
    return { questionText, questionInput, questionBtn };
}

// Pergunta 1: Nome do usuário
function questionOne() {
  const { currentUser, users, userIndex } = getCurrentUserData();
  if (!currentUser) return;

  questionDiv.innerHTML = '';

  const nameInput = createTag('input', {
    type: 'text',
    id: 'nameInput',
    placeholder: 'Digite seu nome'
  });

  const saveBtn = createTag('button', {
    type: 'button',
    text: 'Salvar',
    ev: () => {
      const value = nameInput.value.trim();
      if (!value) {
        msgError.textContent = 'Por favor, preencha o campo!';
        errorAlert(nameInput);
        return;
      }

      // atualiza e persiste imediatamente
      currentUser.displayName = value;
      users[userIndex] = currentUser;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      msgError.textContent = '';
      currentUserName()
      questionTwo();
    }
  });

  const qOne = createQuestion('Por favor, informe seu nome:', nameInput, saveBtn);
  questionDiv.append(qOne.questionText, ...qOne.questionInput, qOne.questionBtn);
}


// Pergunta 2: Dias disponíveis
function questionTwo() {
  const { currentUser, users, userIndex } = getCurrentUserData();
  if (!currentUser) return;

  questionDiv.innerHTML = '';

  const selectInput = createTag('select', { id: 'daysInput' });

  const op = createTag('option', { text: 'Dias disponíveis', value: '' });
  op.disabled = true;
  op.selected = true;
  const op3 = createTag('option', { text: '3', value: '3' });
  const op4 = createTag('option', { text: '4', value: '4' });
  const op5 = createTag('option', { text: '5', value: '5' });

  selectInput.append(op, op3, op4, op5);

  // limpa erro ao mudar
  selectInput.addEventListener('change', () => {
    msgError.textContent = '';
    selectInput.classList.remove('alertInput');
  });

  const qSix = createQuestion(
    'Quantos dias disponíveis você tem para treinar ?',
    selectInput,
    createTag('button', {
      type: 'button',
      text: 'Salvar',
      ev: () => {
        const daysInput = document.querySelector('#daysInput');
        // validar corretamente: placeholder tem value == ''
        if (!daysInput || !daysInput.value) {
          msgError.textContent = 'Por favor, selecione quantos dias você pode treinar!';
          errorAlert(daysInput);
          return;
        }

        // atualiza e persiste imediatamente
        currentUser.days = Number(daysInput.value);
        users[userIndex] = currentUser;
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        msgError.textContent = '';
        questionThree();
      }
    })
  );

  questionDiv.append(qSix.questionText, ...qSix.questionInput, qSix.questionBtn);
}


// Pergunta 3: Nível físico
function questionThree() {
  const { currentUser, users, userIndex } = getCurrentUserData();
  if (!currentUser) return;

  questionDiv.innerHTML = '';

  const selectedOption = createTag('option', { text: 'Nível', value: '' });
  selectedOption.disabled = true;
  selectedOption.selected = true;

  const beginner = createTag('option', { text: 'Iniciante', value: 'iniciante' });
  const intermediary = createTag('option', { text: 'Intermediário', value: 'intermediário' });
  const advanced = createTag('option', { text: 'Avançado', value: 'avançado' });

  const selectInput = createTag('select', { id: 'levelInput' });
  selectInput.append(selectedOption, beginner, intermediary, advanced);

  selectInput.addEventListener('change', () => {
    msgError.textContent = '';
    selectInput.classList.remove('alertInput');
  });

  const saveBtn = createTag('button', {
    type: 'button',
    text: 'Salvar',
    ev: () => {
      if (!selectInput.value) {
        msgError.textContent = 'Por favor, selecione o seu nível físico!';
        errorAlert(selectInput);
        return;
      }

      // atualiza e persiste imediatamente
      currentUser.level = selectInput.value;
      users[userIndex] = currentUser;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(currentUser));

      msgError.textContent = '';
      finishQuestions();
    }
  });

  const qThree = createQuestion('Qual o seu nível físico?', selectInput, saveBtn);
  questionDiv.append(qThree.questionText, ...qThree.questionInput, qThree.questionBtn);
}

// Função final para salvar usuário e gerar treinos

    function finishQuestions() {
  const { currentUser, users, userIndex } = getCurrentUserData();
  if (!currentUser || userIndex === -1) return alert('Erro: usuário não encontrado.');

  // salva infos
  const info = { name: currentUser.name, days: currentUser.days, level: currentUser.level };
  currentUser.infos = currentUser.infos || [];
  currentUser.infos.push(info);

  // limpa workouts antigos
  currentUser.workouts = [];
  users[userIndex] = currentUser;
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(currentUser));

  // gera treinos
  dayOne();
  dayTwo();
  dayThree();
  if (currentUser.days >= 4) dayFour();
  if (currentUser.days === 5) dayFive();

  // pega versão atualizada do usuário
  const updatedUser = JSON.parse(localStorage.getItem('currentUser'));

  // renderiza workouts
  const divQuestion = document.querySelector('#questionsDiv');
  divQuestion.innerHTML = '';
  renderWorkouts(); // agora vai pegar os workouts atualizados
}




export { questionOne };
