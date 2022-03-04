import axios from "./http-common"

const API_URL = "http://localhost:8080/";

class Service {
    async login(email,password) {
        const response = await axios.post("signin", { email, password });
        if (response.data.accessToken) {
            console.log(response.data.accessToken);
            localStorage.setItem("user", JSON.stringify(response.data));
            
        }
        console.log(response.data.accessToken);
        return response.data;
    }

    logout() {
        localStorage.removeItem("user");
    }

    signup(email,password,secret) {
        return axios.post(API_URL + "signup" ,{email,password,secret})
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"))
    }

    addContact(name, email, phone) {
        const data = JSON.parse(localStorage.getItem('user'));
        const user_id = data.id;
        console.log(data.id);
        return axios.post(API_URL + "addContact" ,{user_id,name,email,phone})
    }

    async getContacts() {
        const data = JSON.parse(localStorage.getItem('user'));
        const user_id = data.id;
        return await axios.post(API_URL + "getContacts", {user_id});
    }
}

export default new Service();