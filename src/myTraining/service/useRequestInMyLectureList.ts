import { useEffect, useState, useRef } from "react";
import InMyLectureService from "../present/logic/InMyLectureService";
import FilterBoxService from "../../shared/present/logic/FilterBoxService";
import { useParams } from "react-router-dom";
import { MyTrainingRouteParams } from "../model/MyTrainingRouteParams";
import { Offset } from "@nara.platform/accent";


interface ReturnValue {
  isLoading: boolean;
  resultEmpty: boolean;
  showSeeMore: boolean;
}

export function useRequestInMyLectureList(): ReturnValue {
  const params = useParams<MyTrainingRouteParams>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resultEmpty, setResultEmpty] = useState<boolean>(false);
  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);

  const pageInfo = useRef<Offset>({ offset: 0, limit: 20 });

  const { showResult, conditions } = FilterBoxService.instance;

  useEffect(() => {  
    requestInMyLectures();
    return () => {
      InMyLectureService.instance.clearAllTableViews();
    };
  }, []);

  useEffect(() => {
    if(showResult) {
      requestInMyLecturesByConditions();
    }
  }, [showResult])

  useEffect(() => {
    if(params.pageNo === '1') {
      return;
    }

    requestInMyLecturesWithPage();
  }, [params.pageNo]);

  const requestInMyLectures = async () => {  
    setIsLoading(true);
    InMyLectureService.instance.initFilterRdo();
    const isEmpty = await InMyLectureService.instance.findAllTableViews();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  };

  const requestInMyLecturesByConditions = async () => {
    setIsLoading(true);
    InMyLectureService.instance.setFilterRdoByConditions(conditions);
    const isEmpty = await InMyLectureService.instance.findAllTableViewsByConditions();
    setResultEmpty(isEmpty);
    checkShowSeeMore();
    setIsLoading(false);
  };

  const requestInMyLecturesWithPage = async () => {
    pageInfo.current.limit = 20;
    pageInfo.current.offset += pageInfo.current.limit;

    await InMyLectureService.instance.findAllTableViewsWithPage(pageInfo.current);
    checkShowSeeMore();
  }

  const checkShowSeeMore = () => {
    const { inMyLectureTableViews, inMyLectureTableCount } = InMyLectureService.instance;

    if (inMyLectureTableViews.length >= inMyLectureTableCount) {
      setShowSeeMore(false);
      return;
    }
    if (inMyLectureTableCount <= 20) {
      setShowSeeMore(false);
      return;
    }

    setShowSeeMore(true);
  }

  return { isLoading, resultEmpty, showSeeMore };
}