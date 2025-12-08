import { makeAutoObservable, runInAction, toJS } from "mobx";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { User } from './User'


class Message {
    
    message = {
        name: "",
        nick: "",
        id: 0,
        text: "",
        createdAt: "",
    }

    messages = [];
    animation = false;

    constructor() {
        makeAutoObservable(this)
    }

    set setMessage(val) {
        this.message = val
    }

    get getMessage() {
        return this.message
    }
    
    set postMessage(val) {
        const obj = this.message
        set(ref(getDatabase(), `messages/${val}`), obj);
    }

    get fetchMessages() {
        const db = ref(getDatabase(), 'messages');
        onValue(db, (snapshot) => {
        const data = snapshot.val();
        const obj = Object.keys(data).map((sn) => data[sn])
        
        runInAction(() => {
            this.messages = [...this.messages, obj];
            
        });
        });
        return this.messages;
    }

    set messagesList(val) {
        this.messages = val;
    }

    set setAnimation(bool) {
        this.animation = bool;
    }
}

export const myMessage = new Message();
