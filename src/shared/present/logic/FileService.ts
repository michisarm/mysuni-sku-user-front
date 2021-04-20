import { observable, computed, action, runInAction } from "mobx";
import { autobind } from "@nara.platform/accent";
import depot, { DepotFileViewModel } from "@nara.drama/depot";


@autobind
export class FileService {
  static instance: FileService;

  @observable
  _fileMap: Map<string,  any> = new Map();

  @computed get fileMap() {
    return this._fileMap;
  }

  @action
  async findFiles(type: string, fileBoxId: string) {
    const files = await depot.getDepotFiles(fileBoxId);
    const newFileMap = new Map(this._fileMap.set(type, files));
    
    runInAction(() => {
      this._fileMap = newFileMap;
    });
  }

  @action
  clearFileMap() {
    this._fileMap = new Map();
  }
}

Object.defineProperty(FileService, 'instance', {
  value: new FileService(),
  writable: false,
  configurable: false,
})