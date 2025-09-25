// user-utils.js

export function getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if(!user){
        alert("Usuário não encontrado!");
        return null;
    }
    return user;
}

export function saveCurrentUserUpdates(currentUser){
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Substitui o usuário no array
    const updatedUsers = users.map(u => u.nickname === currentUser.nickname ? currentUser : u);

    // Salva o array completo
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Atualiza currentUser também
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}
