import { useParams } from "react-router-dom";
import { CreateCubeDetailPageParams } from "../model/CreateCubeDetailPageParams";
import { useEffect } from "react";
import CreateCubeService from "../../personalcube/present/logic/CreateCubeService";
import { FileService } from "../../../shared/present/logic/FileService";

export function useRequestCreateCubeDetail() {
  const params = useParams<CreateCubeDetailPageParams>();
  const { createCubeDetail } = CreateCubeService.instance;

  useEffect(() => {
    if (params.personalCubeId === undefined) {
      return;
    }

    CreateCubeService.instance.findCreateCubeDetail(params.personalCubeId);

    return () => {
      CreateCubeService.instance.clearCreateCubeDetail();
      CreateCubeService.instance.clearCompanyCineroomId();
    };
    
  }, [params.personalCubeId]);

  useEffect(() => {
    if(!createCubeDetail || !createCubeDetail.cubeContents.fileBoxId) {
      return;
    }

    FileService.instance.findFiles('reference', createCubeDetail.cubeContents.fileBoxId);

    if(createCubeDetail.cubeMaterial.officeWeb?.fileBoxId) {
      FileService.instance.findFiles('officeweb', createCubeDetail.cubeMaterial.officeWeb.fileBoxId);
    }

    return () => {
      FileService.instance.clearFileMap();
    };

  }, [createCubeDetail]);
}