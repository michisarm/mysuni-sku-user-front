import React, { useEffect, useState } from 'react';

interface Props {
  dashBoardTxt: any
}

const DashBoardSentenceView: React.FC<Props> = function DashBoardSentenceView(
  dashBoardTxt
) {

  useEffect(() => {
    // if(dashBoardTxt === undefined) {
    //   return
    // }
    console.log("dashBoardTxt", dashBoardTxt)
  }, [dashBoardTxt])

  return (
    <>
    {dashBoardTxt === undefined && (
      <span>기본 값입니다.</span>
    )}
    {dashBoardTxt && (
      <span>{dashBoardTxt.dashBoardTxt}</span>
    )}
    </>
  );
};

export default DashBoardSentenceView;
