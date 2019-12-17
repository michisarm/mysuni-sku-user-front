
import React from 'react';
import { DatePeriod, reactAutobind } from '@nara.platform/accent';
import { BoardService } from '@sku/personalcube';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ContentLayout, LectureContentHeader, mobxHelper } from 'shared';
import { inject, observer } from 'mobx-react';

interface Props extends RouteComponentProps<{ cubeId: string }>{
  boardService?: BoardService
}

@inject(mobxHelper.injectFrom('personalCube.boardService'))
@observer
@reactAutobind
class MyPostListPage extends React.Component<Props> {
  //
  componentDidMount(): void {
    console.log(this.props);
  }

  render() {
    return (
      <ContentLayout
        className="content community"
        breadcrumb={[
          { text: `College` },
        ]}
      >
        <LectureContentHeader>
          <LectureContentHeader.ThumbnailCell
            image={`${process.env.PUBLIC_URL}/images/all/thumb-card-60-px.jpg`}
          />
          <LectureContentHeader.TitleCell
            label={{ color: 'blue', text: 'Leadership' }}
            title="Open Source를 활용한 Big Data 기반 플랫폼을 이용한 데이터 분석"
            type="ClassRoomLecture"
            creationTime={12123123}
            learningPeriod={{ startDate: '2019.01.01', endDate: '2020.01.01' } as DatePeriod}
          />
          <LectureContentHeader.RightCell>
          </LectureContentHeader.RightCell>
        </LectureContentHeader>
      </ContentLayout>
    );
  }
}

export default withRouter(MyPostListPage);
