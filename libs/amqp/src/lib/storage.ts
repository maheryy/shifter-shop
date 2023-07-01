import { EExchange } from "../types/exchange";
import { EQueue } from "../types/queue";

class Storage<T extends StorageData> {
  private data = new Map<string, T>();

  save(item: T) {
    this.data.set(item.name, item);
  }

  getAll() {
    return Array.from(this.data.values());
  }

  clear() {
    this.data.clear();
  }

  isEmpty() {
    return this.data.size === 0;
  }
}

export interface StorageData {
  name: string;
}
export interface QueueStorage extends StorageData {
  name: EQueue;
  callback: (data: Record<string, unknown>) => Promise<void>;
}

export interface ExchangeStorage extends StorageData {
  name: EExchange;
  callback: (data: Record<string, unknown>) => Promise<void>;
}

export default Storage;
