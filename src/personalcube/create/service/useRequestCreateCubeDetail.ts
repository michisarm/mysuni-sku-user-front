import { useEffect } from "react";
import CreateCubeService from "../../personalcube/present/logic/CreateCubeService";
import { FileService } from "../../../shared/present/logic/FileService";

export function useRequestCreateCubeDetail(cubeId?: string) {
  const { createCubeDetail } = CreateCubeService.instance;

  useEffect(() => {
    if (cubeId === undefined) {
      return;
    }

    CreateCubeService.instance.findCreateCubeDetail(cubeId);

    return () => {
      CreateCubeService.instance.clearCreateCubeDetail();
    };

  }, [cubeId]);

  useEffect(() => {
    if (!createCubeDetail || !createCubeDetail.cubeContents.fileBoxId) {
      return;
    }

    FileService.instance.findFiles('reference', createCubeDetail.cubeContents.fileBoxId);

    if (createCubeDetail.cubeMaterial.officeWeb?.fileBoxId) {
      FileService.instance.findFiles('officeWeb', createCubeDetail.cubeMaterial.officeWeb.fileBoxId);
    }

    return () => {
      FileService.instance.clearFileMap();
    };

  }, [createCubeDetail]);
}