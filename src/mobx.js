import { makeAutoObservable, runInAction } from "mobx";
import { getDatabase, ref, onValue, set } from "firebase/database";

class User {
    user = {
        id: 0,
        name: "",
        nickname: "",
        isAuthenticated: false,
    }

    users = [];
    
    constructor() {
        makeAutoObservable(this) 
    }
    set setUserID(val) {
        // this.user.id++;
        this.user.id = val;
    }

    // increment() {
    //     this.user.id++;
    // }

    get userID() {
       return this.user.id;
    }
    setUserName(val) {
        this.user["name"] = val;
    }

    set setNickName(val) {
        this.user["nickname"] = val;
    }

    getUserName() {
        return this.user["name"];
    }

    get nickName() {
        return this.user["nickname"];
    }

    set setAuthenticate (bool) {
        this.user.isAuthenticated = bool;
    }
    
    get authenticate () {
        return this.user["isAuthenticated"];
    }

    get signOut () {
        this.user["isAuthenticated"] = false;
        return this.user["isAuthenticated"];
    }

    // set setUser(val) {
    //     this.user = set(ref(getDatabase(), `users/${this.user.id}`), val);
    // }

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
    fetchUser (id) {
        const db = ref(getDatabase(), `users/${id}`);
        // const db = ref(getDatabase(), `users/dcf276c4-2684-4f63-a8bf-0d4ce6e5fb64`);
        onValue(db, (snapshot) => {
        const data = snapshot.val();
        // const obj = Object.keys(data).map((sn) => data[sn])
        // runInAction(() => {
            this.user = data;
        // });
        // });
        
        })
        return this.user
    }
    
}

export const myUser = new User();

// const user = myUser.fetchUser("dcf276c4-2684-4f63-a8bf-0d4ce6e5fb64")
// console.log(user)



