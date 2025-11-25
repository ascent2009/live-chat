import { getDatabase, ref, get } from 'firebase/database';

const db = getDatabase();
const dbRef = ref(db, 'users')

export async function getData() {
        try {
            let users = [];
            await get(dbRef).then((snapshot) => {
                if (snapshot) {
                    const snap = snapshot.val()
                    
                    if (snap) {
                        users = Object.values(snap);
                        console.log('users: ', users);
                        return users;
                    }
                }
            })
         }
            catch(err) {
            console.log(err.message)
        }
}
