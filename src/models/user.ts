import { DatabaseService } from "../services/Database";

export class UserModel {
    protected collectionName = 'users';
    protected db: DatabaseService;
    protected session: firebase.User;

    constructor(dependencies: {
        db: DatabaseService,
        session: firebase.User
    }) {
        this.db = dependencies.db;
        this.session = dependencies.session;
    }


    collection() {
        return this.db.collection(this.collectionName);
    }

    getTodos(callback: (snapshot) => void, error: (error) => void) {
        return this.collection().doc(this.session.uid).collection('todos').onSnapshot(callback, error);
    }

    addTodo(data: {
        todo: string;
    }) {
        return this.db.collection('users').doc(this.session.uid).collection('todos').add(data);
    }

    toggleTodo(ref: firebase.firestore.DocumentReference, finished: boolean) {
        return ref.update({
            finished
          });
    }

    deleteTodo(ref: firebase.firestore.DocumentReference) {
        return ref.delete();
    }

    update(id: string, data) {
        return this.db.update(this.collectionName, id, data);
    }
}