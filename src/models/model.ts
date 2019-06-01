import { DatabaseService } from "../services/Database";

export default class {
    protected collectionName;
    protected db: DatabaseService;

    constructor(dependencies: {
        db: DatabaseService
    }) {
        this.db = dependencies.db;
    }

    collection() {
        return this.db.collection(this.collectionName);
    }

    update(id: string, data) {
        return this.db.update(this.collectionName, id, data);
    }
}