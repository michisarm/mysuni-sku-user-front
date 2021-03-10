import React, { useEffect, useState } from 'react';

interface Props {
  dashBoardTxt: any
}

const DashBoardSentenceView: React.FC<Props> = function DashBoardSentenceView(
  dashBoardTxt
) {

  // useEffect(() => {
  // }, [dashBoardTxt])

  return (
    <>
    {dashBoardTxt === undefined && (
      <p>기본 값입니다.</p>
    )}
    {dashBoardTxt && (
      <p>{dashBoardTxt.dashBoardTxt}</p>
    )}
    </>
  );
};

export default DashBoardSentenceView;
