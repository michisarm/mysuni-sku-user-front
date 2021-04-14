import { reactAlert } from '@nara.platform/accent';
import moment from 'moment';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Cube } from '../../../../model/Cube';
import Media from '../../../../model/Media';
import { MediaType } from '../../../../model/MediaType';
import Student from '../../../../model/Student';
import { cPLinked } from '../../../service/useActionLog/cubeStudyEvent';
import {
  completeLearning,
  submit,
} from '../../../service/useLectureState/utility/cubeStateActions';
import { hasNoTestAndNoReport } from '../../../utility/cubeTester';
import LectureState from '../../../viewModel/LectureState';

const APPROVE = '학습하기';
const PROGRESS = '학습중';
const COMPLETE = '학습완료';

const actionClassName = 'bg';
const stateClassName = 'line';

interface CPAndLinkCanceledViewProps {
  media: Media;
}

function CPAndLinkCanceledView(props: CPAndLinkCanceledViewProps) {
  const { media } = props;
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
          title: '안내',
          message:
            '해당 컨텐츠는 서비스 기간 만료로 더 이상 이용하실 수 없습니다.',
        });
        return;
      }
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('target', '_blank');
      link.click();
      cPLinked();
    }
    if (mediaType === MediaType.LinkMedia) {
      const { linkMediaUrl } = mediaContents;
      const link = document.createElement('a');
      link.setAttribute('href', linkMediaUrl);
      link.setAttribute('target', '_blank');
      link.click();
    }
    submit(1);
  }, [media]);
  return (
    <>
      <button
        className={`ui button free ${actionClassName} p18`}
        onClick={action}
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
  const history = useHistory();
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
        title: '안내',
        message:
          '해당 컨텐츠는 서비스 기간 만료로 더 이상 이용하실 수 없습니다.',
      });
      return;
    }
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('target', '_blank');
    link.click();

    cPLinked();
  }, [media]);

  return (
    <>
      <button
        className={`ui button free ${actionClassName} p18`}
        onClick={action}
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
  const history = useHistory();
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
  const actionClassName = useMemo<string>(() => {
    const noTestAndNoReport = hasNoTestAndNoReport(cube);
    if (student.learningState === 'Passed' || noTestAndNoReport) {
      return 'bg2';
    }
    return 'bg';
  }, [student, cube]);
  const action = useCallback(async () => {
    const noTestAndNoReport = hasNoTestAndNoReport(cube);
    const {
      mediaContents: { linkMediaUrl },
    } = media;
    const link = document.createElement('a');
    link.setAttribute('href', linkMediaUrl);
    link.setAttribute('target', '_blank');
    link.click();
    if (student.learningState !== 'Passed' && noTestAndNoReport) {
      completeLearning();
    }
  }, [student, cube]);

  return (
    <>
      <button
        className={`ui button free ${actionClassName} p18`}
        onClick={action}
      >
        {actionText}
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
  if (media.mediaType === 'LinkMedia') {
    return <CPApprovedView media={media} student={student} />;
  }
  if (media.mediaType === 'ContentsProviderMedia') {
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
