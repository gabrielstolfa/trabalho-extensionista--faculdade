import {
    errorAlert
} from "./interface.js"

import{
    showDisplay
} from "./interface.js"



/***************Verificar e Pegar Usuario ***********/
function getUser(){
    return JSON.parse(localStorage.getItem('users')) || []
}

/************Salvar Usuário  ****************/
function saveUser(users){
    localStorage.setItem('users',JSON.stringify(users))
}

/*************Cadastro de Usuário ***************/



function createUser(){
    const registerError = document.querySelector('#registerError')
    const userName = document.querySelector('#newUserName')
    const userNickName = document.querySelector('#newNickName')
     const cUser ={
        name: userName.value,
        nickname: userNickName.value,
        infos: [],
        workouts: []
    }


    if(userName.value.trim()=== ''){
        registerError.textContent = 'Por favor, preencha seu nome!'
        errorAlert(userName)
        return
        
    } 
    
    if (userNickName.value.trim() === ''){
        registerError.textContent = 'Por favor, preencha seu apelido!'
        errorAlert(userNickName)
        return
        
    } 

    const users = getUser()

   if (users.some(u => u.nickname === userNickName.value.trim())) {
    registerError.textContent = 'Não é possível usar esse apelido, por favor tente outro.';
    errorAlert(userNickName);
    return;
}
    

     users.push(cUser);
     saveUser(users);
     alert('Usuário criado com sucesso!')
     showDisplay( document.querySelector('#starterDiv'),'hidden','show',document.querySelector('#registerDiv'), 'show', 'hidden' )
}

/******************Login *******************/
function login(){
    const loginError = document.querySelector('#loginError')
    const userName = document.querySelector('#userName').value.trim()
    const nickName = document.querySelector('#nickName').value.trim()
    const users = getUser() || []

    const currentUser = users.find(u=>u.name === userName && u.nickname === nickName)

    if (currentUser) {
    // salva o usuário logado no localStorage
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    // redireciona para a página principal
    window.location.href = 'main.html';
  
  } else {
    loginError.textContent = 'Usuário ou apelido não encontrados!';
    return
  }
}

export{
    createUser,
    login

}
