import { useEffect } from "react";
import CreateCubeService from "../../personalcube/present/logic/CreateCubeService";
import { getMainCategory } from "../model/CreateCubeDetail";
import { setSelectedCollege } from "../../store/SelectedCollegeStore";
import { CollegeService } from "../../../college/stores";

export function useRequestSelectedCollege() {
  const cubeSdo = CreateCubeService.instance.cubeSdo;
  const mainCategory = getMainCategory(cubeSdo.categories);

  useEffect(() => {
    if (mainCategory === undefined) {
      return;
    }

    requestSelectedCollege(mainCategory.collegeId);
  }, [mainCategory]);

  const requestSelectedCollege = async (collegeId: string) => {
    const college = await CollegeService.instance.findCollege(collegeId);

    if (college) {
      setSelectedCollege({
        collegeId: college.id,
        collegeType: college.collegeType,
      });
    }
  }
}