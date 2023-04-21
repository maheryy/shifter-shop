import { Db, MongoClient } from "mongodb";

class Mongo {
  private static _instance: Mongo;
  private _db: Db;
  private _client: MongoClient;

  private constructor() {}
  public static async getInstance(): Promise<Mongo> {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new Mongo();
    this._instance._client = new MongoClient(process.env.DATABASE_URL!);

    await this._instance._client.connect();

    console.log("Connected to MongoDB");

    this._instance._db = this._instance._client.db(process.env.DATABASE_NAME!);
    return this._instance;
  }

  public static async getDatabase(): Promise<Db> {
    return (await Mongo.getInstance())._db;
  }

  get db() {
    return Mongo._instance._db;
  }

  get client() {
    return Mongo._instance._client;
  }
}

export default Mongo;
