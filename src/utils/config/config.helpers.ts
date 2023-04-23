export class ConfigHelper {
  public getStringOrError(key: string): string {
    return this.getValOrError(key);
  }

  private getValOrError(key: string): any {
    const val = process.env[key];
    if (!val) {
      throw new Error(`[config error] ${key} key is missing`);
    }
    return val;
  }

  private getValWithDefault(key: string, defaultVal: any): any {
    return process.env[key] ?? defaultVal;
  }

  public getStringWithDefault(key: string, defaultVal: string): string {
    return this.getValWithDefault(key, defaultVal);
  }
}

export const configHelper = new ConfigHelper();
