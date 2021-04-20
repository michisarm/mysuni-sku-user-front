import { useEffect, useCallback } from "react";
import CreateCubeService from "../../personalcube/present/logic/CreateCubeService";
import { UserCubeRdo } from "../../personalcube/model/UserCubeRdo";
import { useScrollMove } from "../../../myTraining/useScrollMove";
import { CubeState } from "../../../shared/model";


const PAGE_SIZE = 8;

export function useRequestCreateCubeList(cubeState: CubeState, pageNo: number) {
  const { scrollOnceMove } = useScrollMove();

  useEffect(() => {
    const offset = (pageNo - 1) * PAGE_SIZE;
    
    const userCubeRdo: UserCubeRdo = {
      offset,
      limit: PAGE_SIZE,
      state: cubeState,
    };

    requestCreateCubeList(userCubeRdo);
  }, [pageNo, cubeState]);

  useEffect(() => {
    return () => {
      CreateCubeService.instance.clearCreateCubes();
    };
  }, []);

  useEffect(() => {
    CreateCubeService.instance.clearCreateCubes();
  }, [cubeState]);

  const requestCreateCubeList = useCallback(async (userCubeRdo: UserCubeRdo) => {
    await CreateCubeService.instance.findCreateCubes(userCubeRdo);
    scrollOnceMove();
  }, [scrollOnceMove]);
}

