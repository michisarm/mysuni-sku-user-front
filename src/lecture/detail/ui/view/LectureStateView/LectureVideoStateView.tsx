import { reactAlert } from '@nara.platform/accent';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Cube } from '../../../../model/Cube';
import Media from '../../../../model/Media';
import { MediaType } from '../../../../model/MediaType';
import Student from '../../../../model/Student';
import {
  completeLearning,
  submit,
} from '../../../service/useLectureState/utility/cubeStateActions';
import { hasNoTestAndNoReport } from '../../../utility/cubeTester';
import LectureState from '../../../viewModel/LectureState';
import { Action, ActionType, Area } from 'tracker/model';
import { getPolyglotText } from '../../../../../shared/ui/logic/PolyglotText';

const APPROVE = getPolyglotText('학습하기', 'CollageState-Video-학습하기');
const PROGRESS = getPolyglotText('학습중', 'CollageState-Video-학습중');
const COMPLETE = getPolyglotText('학습완료', 'CollageState-Video-학습완료');

const actionClassName = 'bg';

interface CPAndLinkCanceledViewProps {
  media: Media;
}

function CPAndLinkCanceledView(props: CPAndLinkCanceledViewProps) {
  const { media } = props;
  const [externalLink, setExternalLink] = useState<string>();
  const action = useCallback(() => {
    const { mediaType, mediaContents } = media;
    if (mediaType === MediaType.ContentsProviderMedia) {
      const {
        contentsProvider: { expiryDate, url },
      } = mediaContents;
      if (
        moment(expiryDate)
          .endOf('day')
          .valueOf() < Date.now()
      ) {
        reactAlert({
          title: getPolyglotText('안내', 'CollageState-Video-안내1'),
          message:
            getPolyglotText('해당 컨텐츠는 서비스 기간 만료로 더 이상 이용하실 수 없습니다.', 'CollageState-Video-Subtitle1'),
        });
        return;
      }
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('target', '_blank');
      link.click();
    }
    if (mediaType === MediaType.LinkMedia) {
      const { linkMediaUrl } = mediaContents;
      setExternalLink(linkMediaUrl);
      const link = document.createElement('a');
      link.setAttribute('href', linkMediaUrl);
      link.setAttribute('target', '_blank');
      link.click();
    }
    submit(1);
  }, [media]);

  useEffect(() => {
    const { mediaType, mediaContents } = media;
    if (mediaType === MediaType.ContentsProviderMedia) {
      setExternalLink(mediaContents.contentsProvider.url);
    } else if (mediaType === MediaType.LinkMedia) {
      setExternalLink(mediaContents.linkMediaUrl);
    }
  }, [media]);
  return (
    <>
      <button
        className={`ui button free ${actionClassName} p18`}
        onClick={action}
        data-area={
          window.location.pathname.includes('/cube')
            ? Area.CUBE_HEADER
            : Area.CARD_HEADER
        }
        data-action={Action.CLICK}
        data-action-type={ActionType.STUDY}
        data-action-external-link={externalLink}
        data-action-name={`${APPROVE} ${getPolyglotText('클릭', 'CollageState-Video-클릭')}`}
      >
        {APPROVE}
      </button>
    </>
  );
}

interface CanceledViewProps {
  media: Media;
}

function CanceledView(props: CanceledViewProps) {
  const { media } = props;
  if (
    media.mediaType === 'LinkMedia' ||
    media.mediaType === 'ContentsProviderMedia'
  ) {
    return <CPAndLinkCanceledView media={media} />;
  }
  return null;
}

interface CPApprovedViewProps {
  student: Student;
  media: Media;
}

function CPApprovedView(props: CPApprovedViewProps) {
  const { student, media } = props;
  const stateText = useMemo<string>(() => {
    if (student.learningState === 'Passed') {
      return COMPLETE;
    }
    return PROGRESS;
  }, [student]);

  const action = useCallback(async () => {
    const {
      mediaContents: {
        contentsProvider: { expiryDate, url },
      },
    } = media;
    if (
      moment(expiryDate)
        .endOf('day')
        .valueOf() < Date.now()
    ) {
      reactAlert({
        title: getPolyglotText('안내', 'CollageState-Video-안내2'),
        message:
          getPolyglotText('해당 컨텐츠는 서비스 기간 만료로 더 이상 이용하실 수 없습니다.', 'CollageState-Video-Subtitle2'),
      });
      return;
    }
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('target', '_blank');
    link.click();
  }, [media]);
  const stateClassName = useMemo(() => {
    const { learningState } = student;
    switch (learningState) {
      case 'Passed':
        return 'complete';
      default:
        break;
    }
    return 'line';
  }, [student]);

  return (
    <>
      <button
        className={`ui button free ${actionClassName} p18`}
        onClick={action}
        data-area={
          window.location.pathname.includes('/cube')
            ? Area.CUBE_HEADER
            : Area.CARD_HEADER
        }
        data-action={Action.CLICK}
        data-action-type={ActionType.STUDY}
        data-action-external-link={media.mediaContents.contentsProvider.url}
        data-action-name={`${APPROVE} ${getPolyglotText('클릭', 'CollageState-Video-클릭')}`}
      >
        {APPROVE}
      </button>
      <button
        className={`ui button free ${stateClassName} p18`}
        style={{ cursor: 'default' }}
      >
        {stateText}
      </button>
    </>
  );
}

interface LinkApprovedViewProps {
  student: Student;
  media: Media;
  cube: Cube;
}

function LinkApprovedView(props: LinkApprovedViewProps) {
  const { student, media, cube } = props;
  const stateText = useMemo<string>(() => {
    if (student.learningState === 'Passed') {
      return COMPLETE;
    }
    return PROGRESS;
  }, [student]);
  const actionText = useMemo<string>(() => {
    if (student.learningState === 'Passed') {
      return COMPLETE;
    }
    return APPROVE;
  }, [student]);
  const stateClassName = useMemo(() => {
    const { learningState } = student;
    switch (learningState) {
      case 'Passed':
        return 'complete';
      default:
        break;
    }
    return 'line';
  }, [student]);

  return (
    <>
      {student.learningState !== 'Passed' && hasNoTestAndNoReport(cube) && (
        <button
          className={`ui button free ${actionClassName} p18`}
          onClick={completeLearning}
          id="ACTION"
          data-area={
            window.location.pathname.includes('/cube')
              ? Area.CUBE_HEADER
              : Area.CARD_HEADER
          }
          data-action={Action.CLICK}
          data-action-type={ActionType.STUDY}
          data-action-external-link={media.mediaContents.linkMediaUrl}
          data-action-name={`${COMPLETE} ${getPolyglotText('클릭', 'CollageState-Video-클릭')}`}
        >
          {COMPLETE}
        </button>
      )}
      <button
        className={`ui button free ${stateClassName} p18`}
        style={{ cursor: 'default' }}
      >
        {stateText}
      </button>
    </>
  );
}

interface NormalApprovedViewProps {
  student: Student;
}

function NormalApprovedView(props: NormalApprovedViewProps) {
  const { student } = props;
  const stateText = useMemo<string>(() => {
    if (student.learningState === 'Passed') {
      return COMPLETE;
    }
    return PROGRESS;
  }, [student]);
  const stateClassName = useMemo(() => {
    const { learningState } = student;
    switch (learningState) {
      case 'Passed':
        return 'complete';
      default:
        break;
    }
    return 'line';
  }, [student]);
  return (
    <>
      <button
        className={`ui button free ${stateClassName} p18`}
        style={{ cursor: 'default' }}
      >
        {stateText}
      </button>
    </>
  );
}

interface ApprovedViewProps {
  student: Student;
  media: Media;
  cube: Cube;
}

function ApprovedView(props: ApprovedViewProps) {
  const { media, student, cube } = props;
  if (media.mediaType === 'ContentsProviderMedia') {
    return <CPApprovedView media={media} student={student} />;
  }
  if (media.mediaType === 'LinkMedia') {
    return <LinkApprovedView media={media} student={student} cube={cube} />;
  }
  return <NormalApprovedView student={student} />;
}

interface LectureVideoStateViewProps {
  lectureState: LectureState;
}

const LectureVideoStateView: React.FC<LectureVideoStateViewProps> = function LectureVideoStateView({
  lectureState,
}) {
  const { student, cubeDetail } = lectureState;
  const { cube } = cubeDetail;
  const [media, setMedia] = useState<Media | null>(null);
  useEffect(() => {
    const {
      cubeMaterial: { media },
    } = cubeDetail;
    setMedia(media);
  }, [cubeDetail]);

  return (
    <>
      {(student === undefined || student?.proposalState === 'Canceled') &&
        media !== null && <CanceledView media={media} />}
      {student?.proposalState === 'Approved' && media !== null && (
        <ApprovedView student={student} media={media} cube={cube} />
      )}
    </>
  );
};

export default LectureVideoStateView;
