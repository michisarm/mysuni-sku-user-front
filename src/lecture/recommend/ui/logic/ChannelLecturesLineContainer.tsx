import React, { Component } from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';

import { OffsetElementList } from 'shared/model';
import { NoSuchContentPanel } from 'shared';
import { ChannelModel } from 'college/model';
import { SkProfileService } from 'profile/stores';
import { InMyLectureCdoModel, InMyLectureModel } from 'myTraining/model';
import routePaths from '../../../routePaths';
import { Lecture } from '../../../shared/Lecture';
import LectureModel from '../../../model/LectureModel';
import LectureServiceType from '../../../model/LectureServiceType';
import { getPolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService;
  lectures: OffsetElementList<LectureModel>;
  channel: ChannelModel;
  onViewAll: (e: any, data: any) => void;
}

@inject(
  mobxHelper.injectFrom(
    'profile.skProfileService',
    'myTraining.inMyLectureService'
  )
)
@reactAutobind
@observer
class ChannelLecturesLineContainer extends Component<Props> {
  //

  onActionLecture(lecture: LectureModel | InMyLectureModel) {
    //
    // if (lecture instanceof InMyLectureModel) {
    //   inMyLectureService!
    //     .removeInMyLecture(lecture.id)
    //     .then(() =>
    //       inMyLectureService!.removeInMyLectureInAllList(
    //         lecture.serviceId,
    //         lecture.serviceType
    //       )
    //     );
    // } else {
    //   inMyLectureService!
    //     .addInMyLecture(
    //       new InMyLectureCdoModel({
    //         serviceId: lecture.serviceId,
    //         serviceType: lecture.serviceType,
    //         category: lecture.category,
    //         name: lecture.name ? parsePolyglotString(lecture.name) : '',
    //         description: lecture.description,
    //         cubeType: lecture.cubeType,
    //         learningTime: lecture.learningTime,
    //         stampCount: lecture.stampCount,
    //         coursePlanId: lecture.coursePlanId,
    //         requiredSubsidiaries: lecture.requiredSubsidiaries,
    //         cubeId: lecture.cubeId,
    //         courseSetJson: lecture.courseSetJson,
    //         courseLectureUsids: lecture.courseLectureUsids,
    //         lectureCardUsids: lecture.lectureCardUsids,
    //         reviewId: lecture.reviewId,
    //         baseUrl: lecture.baseUrl,
    //         servicePatronKeyString: lecture.patronKey.keyString,
    //       })
    //     )
    //     .then(() =>
    //       inMyLectureService!.addInMyLectureInAllList(
    //         lecture.serviceId,
    //         lecture.serviceType
    //       )
    //     );
    // }
  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;
    const collegeId = model.category.college.id;
    const cineroom =
      patronInfo.getCineroomByPatronId(model.servicePatronKeyString) ||
      patronInfo.getCineroomByDomain(model)!;

    if (model.serviceType === LectureServiceType.Card) {
      history.push(routePaths.courseOverview(model.cardId));
    } else {
      history.push(routePaths.lectureCardOverview(model.cardId, model.cubeId));
    }
  }

  onViewAll(e: any) {
    const { channel, onViewAll } = this.props;
    onViewAll(e, {
      channel,
    });
  }

  render() {
    //
    const { skProfileService, channel, lectures } = this.props;
    const { profileMemberName } = skProfileService!;
    const { results, totalCount } = lectures;

    return (
      <>
        {results && results.length > 0 ? (
          <>
            <Lecture.LineHeader
              channel={channel}
              title={
                <>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: getPolyglotText(
                        '채널에서 {name}님께 추천하는 과정입니다.',
                        'rcmd-추천-Channel',
                        { name: profileMemberName }
                      ),
                    }}
                  />{' '}
                  <span className="channel">({totalCount})</span>
                </>
              }
              onViewAll={this.onViewAll}
            />
            <Lecture.Group type={Lecture.GroupType.Line}>
              {results.map((lecture: LectureModel, index: number) => {
                return (
                  <Lecture
                    key={`lecture-${index}`}
                    model={lecture}
                    rating={lecture.rating}
                    thumbnailImage={lecture.baseUrl || undefined}
                    onAction={() => {
                      // reactAlert({
                      //   title: getPolyglotText('알림', 'rcmd-관심목록-알림'),
                      //   message: inMyLecture
                      //     ? getPolyglotText(
                      //         '본 과정이 관심목록에서 제외되었습니다.',
                      //         'rcmd-관심목록-상세1'
                      //       )
                      //     : getPolyglotText(
                      //         '본 과정이 관심목록에 추가되었습니다.',
                      //         'rcmd-관심목록-상세2'
                      //       ),
                      // });
                      // this.onActionLecture(inMyLecture || lecture);
                    }}
                    onViewDetail={this.onViewDetail}
                  />
                );
              })}
            </Lecture.Group>
          </>
        ) : (
          <NoSuchContentPanel
            message={getPolyglotText(
              '선택하신 채널에 해당하는 추천 학습과정이 없습니다.',
              'rcmd-추천-목록없음'
            )}
          />
        )}
      </>
    );
  }
}

export default withRouter(ChannelLecturesLineContainer);
