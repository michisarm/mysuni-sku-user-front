
import OffsetElementList from '../model/OffsetElementList';


export function responseToModels(response: any, Model: any): any[] {
  //
  if (response && Array.isArray(response.data)) {
    return response.data.map((model: any) => new Model(model));
  }
  return [];
}

export function responseToOffsetElementList(response: any, Model: any): OffsetElementList<any> {
  //
  if (response && response.data) {
    const offsetElementList = new OffsetElementList(response.data);

    offsetElementList.results = offsetElementList.results.map((model: any) => new Model(model));
    return offsetElementList;
  }
  return new OffsetElementList();
}

export function responseToModel(response: any, Model: any): any | null {
  //
  if (response && response.data) {
    return new Model(response.data);
  }
  return null;
}

export function responseToNotNullModel(response: any, Model: any): any {
  //
  if (response && response.data) {
    return new Model(response.data);
  }
  return new Model();
}

export default {
  responseToModels,
  responseToOffsetElementList,
  responseToModel,
  responseToNotNullModel,
};
