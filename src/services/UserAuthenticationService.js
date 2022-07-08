export const isUsersLogged = () => {
    console.log("Is user Logged In called")
    let token = localStorage.token;
    if (token) {
        return true;
    } else {
        return false;
    }
}