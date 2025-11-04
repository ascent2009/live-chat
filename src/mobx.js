import { makeAutoObservable } from "mobx";
// import { users } from './data'

class User {
    name = "";
    nickname = "";
    isAuthenticated = false;

    constructor() {
        makeAutoObservable(this);
    }

    setUserName(val) {
        let string = val.toString();
        this.name = string;
    }

    getUserName() {
        return this.name;
    }

    get authenticate () {
        this.isAuthenticated = true;
        console.log('isAuthenticated: ', this.isAuthenticated);
        return this.isAuthenticated;
    }

    get signOut () {
        this.isAuthenticated = false;
        console.log('isAuthenticated: ', this.isAuthenticated);
        return this.isAuthenticated;
    }

}

export const myUser = new User();
