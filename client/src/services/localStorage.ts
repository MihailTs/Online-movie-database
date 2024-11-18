export class LocalStorageService<T> {
  constructor(private key: string) {}
  
  get() {
    const value = localStorage.getItem(this.key);
    if (!value) {
      return undefined;
    }
  
    return this.safeParseJson(value) as T;
  }
  
  set(value: T) {
    return localStorage.setItem(this.key, JSON.stringify(value));
  }
  
  clear() {
    return localStorage.removeItem(this.key);
  }
  
  private safeParseJson(value: string) {
    try {
      return JSON.parse(value);
    } catch (err) {
      this.clear();
    }
  }
}
  