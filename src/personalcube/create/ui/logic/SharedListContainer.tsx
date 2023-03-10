import React, { useEffect } from 'react';
import { reactAutobind, mobxHelper, reactAlert } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';
import { patronInfo } from '@nara.platform/dock';

import { ReviewService } from '@nara.drama/feedback';
import { CubeType } from 'shared/model';
import { PageService } from 'shared/stores';
import { NoSuchContentPanel } from 'shared';
import { ChannelModel } from 'college/model';
import { LectureModel, LectureServiceType } from 'lecture/model';
import { LectureService } from 'lecture/stores';
import { Lecture, SeeMoreButton } from 'lecture';
import lectureRoutePaths from 'lecture/routePaths';
import { InMyLectureModel, InMyLectureCdoModel } from 'myTraining/model';

import routePaths from '../../../routePaths';
import SharedListPanelTopLineView from '../view/SharedListPanelTopLineView';
import { useScrollMove } from 'myTraining/useScrollMove';
import { getPolyglotText } from 'shared/ui/logic/PolyglotText';

interface Props extends RouteComponentProps<{ tab: string; pageNo: string }> {
  pageService?: PageService;
  lectureService?: LectureService;
  reviewService?: ReviewService;
  onChangeSharedCount: (sharedCount: number) => void;
  scrollSave?: () => void;
}

interface States {
  channels: ChannelModel[];
}

const SharedListContainer: React.FC<Props> = ({
  pageService,
  lectureService,
  reviewService,
  onChangeSharedCount,
  match,
}) => {
  const histroy = useHistory();
  const location = useLocation();
  const { scrollOnceMove, scrollSave } = useScrollMove();

  useEffect(() => {
    setTimeout(() => {
      scrollOnceMove();
    }, 1000);
  }, [scrollOnceMove]);

  return (
    <SharedListInnerContainer
      pageService={pageService}
      lectureService={lectureService}
      reviewService={reviewService}
      onChangeSharedCount={onChangeSharedCount}
      match={match}
      history={histroy}
      location={location}
      scrollSave={scrollSave}
    />
  );
};

export default withRouter(SharedListContainer);
@inject(
  mobxHelper.injectFrom(
    'shared.pageService',
    'shared.reviewService',
    'lecture.lectureService',
    'myTraining.inMyLectureService'
  )
)
@observer
@reactAutobind
class SharedListInnerContainer extends React.Component<Props, States> {
  //
  PAGE_KEY = 'lecture.shared';

  PAGE_SIZE = 8;

  state = {
    channels: [],
  };

  componentDidMount() {
    // tab click ??? ????????? by gon
    this.init();
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    // tab click ??? ????????? by gon
    const prevTab = prevProps.match.params.tab;
    const currentTab = this.props.match.params.tab;
    if (prevTab === currentTab) {
      this.getSearchInTab(prevProps);
    } else {
      this.init();
    }
  }

  // tab click ??? ????????? by gon
  init() {
    const { pageService, lectureService } = this.props;
    const initialLimit = this.getPageNo() * this.PAGE_SIZE;
    pageService!.initPageMap(this.PAGE_KEY, 0, initialLimit);
    lectureService!.clearLectures();
    this.findSharedLectures();
    // tab click ??? ????????? by gon
    this.setState({ channels: [] }, () => {
      lectureService!.clearLectures();
      pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      this.findSharedLectures();
    });
  }

  // tab click ??? ????????? by gon
  getSearchInTab(prevProps: Readonly<Props>) {
    const { pageService, lectureService } = this.props;
    const prevTab = prevProps.match.params.tab;
    const currentTab = this.props.match.params.tab;
    const currentPageNo = this.props.match.params.pageNo;

    if (
      prevTab === currentTab &&
      prevProps.match.params.pageNo !== currentPageNo
    ) {
      const page = pageService!.pageMap.get(this.PAGE_KEY);
      const offset =
        page!.limit > this.PAGE_SIZE && page!.nextOffset === 0
          ? page!.nextOffset + this.PAGE_SIZE
          : page!.nextOffset;
      if (currentPageNo === '1') {
        lectureService!.clearLectures();
        pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      } else {
        pageService!.initPageMap(this.PAGE_KEY, offset, this.PAGE_SIZE);
      }
      this.findSharedLectures(this.getPageNo() - 1);
    }
  }

  async findSharedLectures(pageNo?: number) {
    //
    const { pageService, lectureService, reviewService, onChangeSharedCount } =
      this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);
    const { channels } = this.state;
    const channelIds = channels.map(
      (channel: ChannelModel) => channel.channelId
    );
    // shared list ??????
    const lectureOffsetList = await lectureService!.findSharedLectures(
      page!.limit,
      page!.nextOffset,
      channelIds
    );

    let feedbackIds: string[] = [];

    if (lectureOffsetList.results.length > 0) {
      feedbackIds = lectureOffsetList.results.map(
        (lecture) => lecture.reviewId
      );
      reviewService!.findReviewSummariesByFeedbackIds(feedbackIds);
    }

    pageService!.setTotalCountAndPageNo(
      this.PAGE_KEY,
      lectureOffsetList.totalCount,
      pageNo || pageNo === 0 ? pageNo + 1 : page!.pageNo + 1
    );
    onChangeSharedCount(lectureOffsetList.totalCount);
  }

  getPageNo() {
    //
    const { match } = this.props;

    return parseInt(match.params.pageNo, 10);
  }

  getRating(lecture: LectureModel) {
    //
    const { ratingMap } = this.props.reviewService!;

    let rating: number | undefined = ratingMap.get(lecture.reviewId) || 0;

    if (lecture.cubeType === CubeType.Community) {
      rating = undefined;
    }
    return rating;
  }

  isContentMore() {
    //
    const { pageService } = this.props;
    const page = pageService!.pageMap.get(this.PAGE_KEY);

    return page && page.pageNo < page.totalPages;
  }

  onFilter(channels: ChannelModel[]) {
    //
    const { pageService, lectureService } = this.props;

    this.setState({ channels }, () => {
      lectureService!.clearLectures();
      pageService!.initPageMap(this.PAGE_KEY, 0, this.PAGE_SIZE);
      this.findSharedLectures();
    });
  }

  onClickSeeMore() {
    //
    const { history } = this.props;

    history.replace(routePaths.currentPage(this.getPageNo() + 1));
  }

  onViewDetail(e: any, data: any) {
    //
    const { model } = data;
    const { history, scrollSave } = this.props;
    const collegeId = model.category.college.id;
    const cineroom =
      patronInfo.getCineroomByPatronId(model.servicePatronKeyString) ||
      patronInfo.getCineroomByDomain(model)!;

    if (model.serviceType === LectureServiceType.Card) {
      history.push(lectureRoutePaths.courseOverview(model.serviceId));
    } else {
      history.push(
        lectureRoutePaths.lectureCardOverview(model.serviceId, model.cubeId)
      );
    }
    scrollSave && scrollSave();
  }

  onToggleBookmarkLecture(lecture: LectureModel | InMyLectureModel) {
    //
    // const { inMyLectureService } = this.props;
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
    //     .addInMyLecture(InMyLectureCdoModel.fromLecture(lecture))
    //     .then(() =>
    //       inMyLectureService!.addInMyLectureInAllList(
    //         lecture.serviceId,
    //         lecture.serviceType
    //       )
    //     );
    // }
  }

  render() {
    //
    const { lectureService } = this.props;
    const { requiredLectures, totalLectureCount } = lectureService!;
    const { channels } = this.state;
    if (requiredLectures.length < 1) {
      return <NoSuchContentPanel message="?????? ????????? ????????? ????????????." />;
    }

    return (
      <>
        <SharedListPanelTopLineView
          totalCount={totalLectureCount}
          channels={channels}
          onFilter={this.onFilter}
        />

        <div className="section">
          <Lecture.Group type={Lecture.GroupType.Box}>
            {requiredLectures.map((lecture, index) => {
              // const inMyLecture =
              //   inMyLectureMap.get(lecture.serviceId) || undefined;
              return null;
              // return (
              //   <Lecture
              //     key={`lecture-${index}`}
              //     model={lecture}
              //     rating={this.getRating(lecture)}
              //     thumbnailImage={lecture.baseUrl || undefined}
              //     action={
              //       inMyLecture
              //         ? Lecture.ActionType.Remove
              //         : Lecture.ActionType.Add
              //     }
              //     onAction={() => {
              //       reactAlert({
              //         title: getPolyglotText('??????', '????????????-????????????-??????'),
              //         message: inMyLecture
              //           ? getPolyglotText(
              //               '??? ????????? ?????????????????? ?????????????????????.',
              //               '????????????-????????????-????????????'
              //             )
              //           : getPolyglotText(
              //               '??? ????????? ??????????????? ?????????????????????.',
              //               '????????????-????????????-????????????'
              //             ),
              //       });
              //       this.onToggleBookmarkLecture(inMyLecture || lecture);
              //     }}
              //     onViewDetail={this.onViewDetail}
              //   />
              // );
            })}
          </Lecture.Group>

          {this.isContentMore() && (
            <SeeMoreButton onClick={this.onClickSeeMore} />
          )}
        </div>
      </>
    );
  }
}
