export interface NavigatorUABrandVersion {
  brand: string;
  version: string;
}

export interface UADataValues {
  platform: string;
  platformVersion: string;
  architecture: string;
  model: string;
  uaFullVersion: string;
}
export interface NavigatorUAData {
  brands?: NavigatorUABrandVersion[];
  uaList?: NavigatorUABrandVersion[];
  mobile: boolean;
  getHighEntropyValues<T extends keyof UADataValues>(
    hints: T[]
  ): Promise<{ [key in T]: UADataValues[T] }>;
}
