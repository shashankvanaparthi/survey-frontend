import http from "../http-common";

class UserDataService{
    login(user){
        console.log(user);
        return http.post("/signin",{
            email: user.email,
            password: user.password
        });
    }

    signup(user){
        console.log("In signup ",user);
        return http.post("/signup",user)
    }
}

export default new UserDataService()
