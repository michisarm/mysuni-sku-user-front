import {OffsetElementList} from "shared/model";
import BadgeModel from "../../../badge/model/BadgeModel";

export const badgeData: OffsetElementList<BadgeModel> = {
  "empty": false,
  "totalCount": 1,
  "results": [
    {
      "id": 1,
      "badgeId": "BADGE-1",
      "name": "뱃지이름",
      "iconUrl": "아이콘Url",
      "autoIssued": true,
      "certiAdminCategory": {
        "certiAdminCategory": "인증관리주체분류",
        "certiAdminCategoryName": "인증관리주체명"
      },
      "certiAdminSubcategory": {
        "certiAdminSubcategory": "인증관리주체하위분류",
        "certiAdminSubcategoryName": "인증관리주체하위분류명"
      },
      "mainCategoryId": "Category1",
      "mainCategoryName": "Category1명",
      "badgeType": "Knowledge",
      "difficultyLevel": "Basic",
      "learningCompleted": false,
      "challengeState": "Challenged",
      "issueState": "",
    },
  ]
};

