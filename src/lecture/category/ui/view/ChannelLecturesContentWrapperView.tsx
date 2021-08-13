import React, { Component } from 'react';

import { Segment } from 'semantic-ui-react';
import { Area } from 'tracker/model';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props {
  lectureCount: number;
  countDisabled: boolean;
  children: React.ReactNode;
}

class ChannelLecturesContentWrapperView extends Component<Props> {
  //
  render() {
    //
    const { lectureCount, countDisabled, children } = this.props;

    return (
      <Segment className="full">
        <div
          className="sort-reult"
          data-area={
            window.location.pathname.includes('/recommend')
              ? Area.RECOMMEND_CARD
              : Area.COLLEGE_CARD
          }
        >
          {!countDisabled && (
            <div
              className="section-count"
              dangerouslySetInnerHTML={{
                __html: getPolyglotText(
                  `총 <span>{lectureCount}</span>개의 학습 과정이 있습니다.`,
                  'cicl-디테일-헤더',
                  {
                    lectureCount: lectureCount.toString(),
                  }
                ),
              }}
            />
          )}
          {children}
        </div>
      </Segment>
    );
  }
}

export default ChannelLecturesContentWrapperView;
