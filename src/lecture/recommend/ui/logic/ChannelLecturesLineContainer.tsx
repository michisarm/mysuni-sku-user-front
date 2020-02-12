
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';

import { OffsetElementList } from 'shared/model';
import { NoSuchContentPanel } from 'shared';
import { ChannelModel } from 'college/model';
import { SkProfileService } from 'profile/stores';
import { InMyLectureCdoModel, InMyLectureModel } from 'myTraining/model';
import { InMyLectureService } from 'myTraining/stores';
import routePaths from '../../../routePaths';
import Lecture from '../../../shared/Lecture';
import LectureModel from '../../../model/LectureModel';
import LectureServiceType from '../../../model/LectureServiceType';


interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService,
  inMyLectureService?: InMyLectureService,
  lectures: OffsetElementList<LectureModel>
  channel: ChannelModel
  onViewAll: (e: any, data: any) => void
}

@inject(mobxHelper.injectFrom(
  'profile.skProfileService',
  'myTraining.inMyLectureService'
))
@reactAutobind
@observer
class ChannelLecturesLineContainer extends Component<Props> {
  //
  componentDidMount() {
    //
    this.props.inMyLectureService!.findAllInMyLectures();
  }

  onActionLecture(lecture: LectureModel | InMyLectureModel) {
    //
    const { inMyLectureService } = this.props;

    if (lecture instanceof InMyLectureModel) {
      inMyLectureService!.removeInMyLecture(lecture.id)
        .then(() => inMyLectureService!.removeInMyLectureInAllList(lecture.serviceId, lecture.serviceType));
    }
    else {
      inMyLectureService!.addInMyLecture(new InMyLectureCdoModel({
        serviceId: lecture.serviceId,
        serviceType: lecture.serviceType,
        category: lecture.category,
        name: lecture.name,
        description: lecture.description,
        cubeType: lecture.cubeType,
        learningTime: lecture.learningTime,
        stampCount: lecture.stampCount,
        coursePlanId: lecture.coursePlanId,

        requiredSubsidiaries: lecture.requiredSubsidiaries,
        cubeId: lecture.cubeId,
        courseSetJson: lecture.courseSetJson,
        courseLectureUsids: lecture.courseLectureUsids,
        lectureCardUsids: lecture.lectureCardUsids,

        reviewId: lecture.reviewId,
        baseUrl: lecture.baseUrl,
        servicePatronKeyString: lecture.patronKey.keyString,
      }))
        .then(() => inMyLectureService!.addInMyLectureInAllList(lecture.serviceId, lecture.serviceType));
    }
  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history } = this.props;
    const collegeId = model.category.college.id;
    const cineroom = patronInfo.getCineroomByPatronId(model.servicePatronKeyString) || patronInfo.getCineroomByDomain(model)!;

    if (model.serviceType === LectureServiceType.Program || model.serviceType === LectureServiceType.Course) {
      history.push(routePaths.courseOverview(cineroom.id, collegeId, model.coursePlanId, model.serviceType, model.serviceId));
    }
    else if (model.serviceType === LectureServiceType.Card) {
      history.push(routePaths.lectureCardOverview(cineroom.id, collegeId, model.cubeId, model.serviceId));
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
    const { skProfileService, inMyLectureService, channel, lectures } = this.props;
    const { profileMemberName } = skProfileService!;
    const { inMyLectureMap } =  inMyLectureService!;
    const { results, totalCount } =  lectures;

    return (
      <>
        <Lecture.LineHeader
          channel={channel}
          title={(
            <>
              채널에서 {profileMemberName}님께 추천하는 과정입니다. <span className="channel">({totalCount})</span>
            </>
          )}
          onViewAll={this.onViewAll}
        />

        {
          results && results.length > 0 ?
            <Lecture.Group type={Lecture.GroupType.Line}>
              {
                results.map((lecture: LectureModel, index: number) => {
                  const inMyLecture = inMyLectureMap.get(lecture.serviceId) || undefined;

                  return (
                    <Lecture
                      key={`lecture-${index}`}
                      model={lecture}
                      rating={lecture.rating}
                      thumbnailImage={lecture.baseUrl || undefined}
                      action={inMyLecture ? Lecture.ActionType.Remove : Lecture.ActionType.Add}
                      onAction={() => this.onActionLecture(inMyLecture || lecture)}
                      onViewDetail={this.onViewDetail}
                    />
                  );
                })
              }
            </Lecture.Group>
            :
            <NoSuchContentPanel message="선택하신 채널에 해당하는 추천 학습과정이 없습니다." />
        }
      </>
    );
  }
}

export default withRouter(ChannelLecturesLineContainer);
