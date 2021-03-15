import React, { useEffect, useState } from 'react';

interface Props {
  dashBoardTxt: any
}

const DashBoardSentenceView: React.FC<Props> = function DashBoardSentenceView(
  dashBoardTxt
) {

  return (
    <>
      {dashBoardTxt && (
        <p>{dashBoardTxt.dashBoardTxt}</p>
      )}
      {!dashBoardTxt && (
        <p/>
      )}
    </>
  );
};

export default DashBoardSentenceView;
