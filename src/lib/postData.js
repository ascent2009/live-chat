import { getDatabase, ref, set } from 'firebase/database';

const db = getDatabase();
const dbRef = ref(db, 'users')

export function writeUserData(id, phone, nickname, isAuthenticated) {
  
    set(ref(dbRef, `users/${id}`), {
      id: id,
      name: phone,
      nickname: nickname && "",
      isAuthenticated: isAuthenticated
    });
    
  }