import { Db, MongoClient } from "mongodb";

class Mongo {
  private static _instance: Mongo;
  private _db: Db;
  private _client: MongoClient;

  private constructor() {}

  public async init() {
    return this._client.connect();
  }

  public static getInstance(): Mongo {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new Mongo();
    this._instance._client = new MongoClient(process.env.DATABASE_URL!);
    this._instance._db = this._instance._client.db(process.env.DATABASE_NAME!);

    return this._instance;
  }

  get db() {
    return Mongo._instance._db;
  }

  get client() {
    return Mongo._instance._client;
  }
}

export const db = Mongo.getInstance().db;

export default Mongo;
