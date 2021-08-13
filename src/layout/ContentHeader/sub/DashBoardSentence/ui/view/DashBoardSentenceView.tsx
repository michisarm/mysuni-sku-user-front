import React from 'react';

interface Props {
  dashBoardTxt: any;
}

const DashBoardSentenceView: React.FC<Props> = function DashBoardSentenceView(
  dashBoardTxt
) {
  return <p>{dashBoardTxt?.dashBoardTxt || ''}</p>;
};

export default DashBoardSentenceView;
