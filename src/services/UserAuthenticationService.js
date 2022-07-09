export const isUsersLogged = () => {
    console.log("Is user Logged In called")
    let token = localStorage.token;
    if (token) {
        return true;
    } else {
        return false;
    }
}

export const isAdmin = ()=>{
    console.log("IsAdmin called")
    let isAdmin = localStorage.isAdmin;
    console.log(isAdmin=='true')
    return isAdmin == 'true'
}