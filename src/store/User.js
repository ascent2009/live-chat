import { makeAutoObservable, runInAction } from "mobx";
import { getDatabase, ref, onValue } from "firebase/database";

export class User {
    user = {
        id: 0,
        name: "",
        nickname: "",
        isAuthenticated: false,
        avatar: ""
    }

    users = [];
    
    constructor() {
        makeAutoObservable(this) 
    }
    set setUserID(val) {
        this.user.id = val;
    }

    get userID() {
       return this.user.id;
    }
    setUserName(val) {
        this.user["name"] = val;
    }

    set setNickName(val) {
        this.user["nickname"] = val;
    }

    get userName() {
        return this.user["name"];
    }

    get nickName() {
        return this.user["nickname"];
    }

    set setAuthenticate (bool) {
        this.user.isAuthenticated = bool;
    }

    set setAvatar (url) {
        this.user.avatar = url;
    }
    
    get authenticate () {
        return this.user["isAuthenticated"];
    }

    get signOut () {
        this.user["isAuthenticated"] = false;
        return this.user["isAuthenticated"];
    }

    get fetchUsers () {
        const db = ref(getDatabase(), 'users');
        onValue(db, (snapshot) => {
        const data = snapshot.val();
        const obj = Object.keys(data).map((sn) => data[sn])
        runInAction(() => {
            this.users = [...this.users, obj];
        });
        });
        return this.users;
    }
    fetchUser (url) {
        const db = ref(getDatabase(), url);
        onValue(db, (snapshot) => {
            const data = snapshot.val();
            this.setUserID = data.id;
            this.setUserName(data.name);
            this.setNickName = data.nickname;
            this.setAuthenticate = true;
            this.setAvatar = data.avatar;
        })
    }

}

export const myUser = new User();
