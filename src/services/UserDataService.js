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

    getUser(userId){
        return http.get("/user/"+userId);
    }

    updateUser(user){
        return http.put("/user/"+user.id,{user:user})
    }

    getAllUsers(){
        return http.get("/user/all")
    }

    deleteUser(userId){
        return http.delete("/user/"+userId);
    }

}

export default new UserDataService()
