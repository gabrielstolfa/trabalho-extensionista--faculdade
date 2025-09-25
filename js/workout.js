import{
    chestExercises,
    legExercises,
    backExercises,
    bicepsExercises,
    tricepsExercises,
    shoulderExercises,
    absExercises,
    stretchingExercises ,
    cardioExercises
} from './workout-databse.js'

import{
    getCurrentUser,
    saveCurrentUserUpdates
} from './user-util.js'


// Filtragem de Array por nível
function filterByLevel(array){
    let currentUser = getCurrentUser()
    if(!currentUser || !currentUser.level) return []

    const userLevel = currentUser.level.toLowerCase(); // força minúscula
    return array.filter(ex => ex.level.toLowerCase() === userLevel)
}

function cardioAndStretching(cardioIndex, stretchingIndex, array){
    const cardio = cardioExercises.slice(cardioIndex, cardioIndex + 1)
    const stretching = stretchingExercises.slice(stretchingIndex, stretchingIndex + 2)

    // Adiciona cardio no começo do treino
    array.unshift(...cardio)

    // Adiciona alongamento no final do treino 
    array.push(...stretching)
}

// Primeiro treino  / peito,ombro,triceps

function dayOne(){
    const currentUser = getCurrentUser();
    if(!currentUser) return;
    const workoutOne = [] // Inicialização do primeiro dia

    const muscleGroupsOne = [chestExercises,shoulderExercises,tricepsExercises]

    muscleGroupsOne.forEach(group =>{
        filterByLevel(group).forEach(ex =>{
            if(!workoutOne.some(e => e.name === ex.name)){
                workoutOne.push(ex)
            }
        })
    })

    cardioAndStretching(1,1, workoutOne)

    currentUser.workouts.push(workoutOne)
   saveCurrentUserUpdates(currentUser)

}


// Segundo treino  / costas e biceps 

function dayTwo(){
    const currentUser = getCurrentUser();
    if(!currentUser) return;    
    const workoutTwo = [] // Inicializando o segundo treino 

    const muscleGroupsTwo = [backExercises, bicepsExercises]

    muscleGroupsTwo.forEach(group =>{
        filterByLevel(group).forEach(ex =>{
            if(!workoutTwo.some(e => e.name === ex.name)){
                workoutTwo.push(ex)
            }
        })
    })

    cardioAndStretching(2,6, workoutTwo)
    currentUser.workouts.push(workoutTwo)
    saveCurrentUserUpdates(currentUser)
}


//// Terceiro treino / pernas 
function dayThree(){
    const currentUser = getCurrentUser();
    if(!currentUser) return;    
    
    const workoutThree = [] // Inicializando o terceiro treino 
    
    const muscleGroupsThree = [legExercises,absExercises]

      muscleGroupsThree.forEach(group =>{
        filterByLevel(group).forEach(ex =>{
            if(!workoutThree.some(e => e.name === ex.name)){
                workoutThree.push(ex)
            }
        })
    })

    cardioAndStretching(0,3,workoutThree)
    currentUser.workouts.push(workoutThree)
    saveCurrentUserUpdates(currentUser)


}

//////////// Quarto dia (opcional) // Mobilidade Completo
function dayFour(){
    const currentUser = getCurrentUser();
    if(!currentUser) return; 
    
    const workoutFour = stretchingExercises

    currentUser.workouts.push(workoutFour)
    saveCurrentUserUpdates(currentUser)

}

////// Quinto dia (opcional) /// Cardio Completo
function dayFive(){
    const currentUser = getCurrentUser();
    if(!currentUser) return; 
    
    const workoutFive = cardioExercises
    
    currentUser.workouts.push(workoutFive)
    saveCurrentUserUpdates(currentUser)
    
}

function getWorkout(){
    const currentUser = getCurrentUser();
    if(!currentUser) return; 
    
    // Retorna os workouts já salvos ou um array vazio
    return currentUser.workouts || [];

}

export{
    dayOne,
    dayTwo,
    dayThree,
    dayFour,
    dayFive,
    getWorkout
}