
import React from 'react';
import {Icon} from 'semantic-ui-react';
import classNames from 'classnames';
import {TRSContainerWrapper} from '../view/BadgeLectureElementView';

import BadgeLectureState from '../../ui/model/BadgeLectureState';
import BadgeLectureStateName from '../../ui/model/BadgeLectureStateName';


enum StateDefault {
  Learning = 'Learning',
  Test = 'Test',
  Report = 'Report',
  Survey = 'Survey',
}

enum StateDefaultName {
  Learning = '학습하기',
  Test = '평가응시',
  Report = '과제제출',
  Survey = '설문참여',
}


interface Props {
  parentType: string,
  subDepth?: boolean
}


// sample
const data = {
  type: 'Survey',
  state: 'Progress',
};



const TRSContainer: React.FC<Props> = (Props) => {
  //
  const { parentType, subDepth } = Props;

  // TRS 상태 및 이벤트 - onClick 이벤트 필요
  const setTRSState = (state: string) => {
    //
    const styleName = ( data.state === BadgeLectureState.Passed || data.state === BadgeLectureState.Missed ) ? 'completed' : 'black';

    return (
      <>
        {/*대기중 or 진행 중*/}
        { (state === null || state === BadgeLectureState.Progress) ? (
          <a href="#" className={classNames('btn-play', styleName)}>
            <span className="text">{StateDefaultName[data.type as StateDefault]}</span>
            <Icon className={`play-${styleName}24`} />
          </a>
        ) : (
          <span className={classNames('btn-play', (data.state === BadgeLectureState.Passed) ? 'completed' : '')}>
            <span className={classNames('text', (data.state === BadgeLectureState.Waiting) ? 'no-link' : '')}>{BadgeLectureStateName[data.state as BadgeLectureState]}</span>
            <Icon className={`play-${styleName}24-dim`}/>
          </span>
        )}
      </>
    );
  };


  return (
    <TRSContainerWrapper parentType={parentType} subDepth={subDepth}>
      <div className="category">
        <Icon className={classNames(`icon-${data.type.toLowerCase()}24`)}/>
        <span>{data.type}</span>
      </div>
      <div className="tit">
        <a href="#" className="ellipsis">제목제목</a>
      </div>
      <div className="right">
        {setTRSState(data.state)}
      </div>
    </TRSContainerWrapper>
  );
};

export default TRSContainer;
