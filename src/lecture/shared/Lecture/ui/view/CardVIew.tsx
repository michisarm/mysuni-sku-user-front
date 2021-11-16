import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import classNames from 'classnames';
import { Button, Card, Icon, Rating, Label } from 'semantic-ui-react';
import {
  Field,
  Fields,
  SubField,
  Thumbnail,
} from '../../../ui/view/LectureElementsView';
import numeral from 'numeral';
import { reactAlert } from '@nara.platform/accent';
import { CardCategory } from 'shared/model/CardCategory';
import { dateTimeHelper } from 'shared';
import {
  getCollgeName,
  getColor,
} from '../../../../../shared/service/useCollege/useRequestCollege';
import { find } from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { toPath } from '../../../../detail/viewModel/LectureParams';
import { InMyLectureModel } from '../../../../../myTraining/model';
import { autorun, isObservableArray } from 'mobx';
import CardType from '../../../model/CardType';
import CubeIconType from '../../model/CubeIconType';
import CubeNameType from '../../../../../personalcube/personalcube/model/CubeTypeNameType';
import { PermittedCineroom } from '../../../../model/PermittedCineroom';
import isIncludeCineroomId from '../../../../../shared/helper/isIncludeCineroomId';
import { hoverTrack } from 'tracker/present/logic/ActionTrackService';
import { Area, FieldType } from 'tracker/model';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../../../shared/ui/logic/PolyglotText';
import {
  parsePolyglotString,
  PolyglotString,
} from 'shared/viewmodel/PolyglotString';
import { LangSupport, getDefaultLang } from 'lecture/model/LangSupport';

function parseLanguge(lang: string) {
  switch (lang) {
    case 'Chinese':
      return 'CHN';
    case 'English':
      return 'ENG';
    default:
      return 'KOR';
  }
}

interface Props {
  cardId: string;
  learningTime: number;
  additionalLearningTime: number;
  thumbImagePath: string;
  mainCategory: CardCategory;
  name: PolyglotString;
  htmlName?: string;
  stampCount: number;
  passedStudentCount: number;
  starCount: number;
  simpleDescription: PolyglotString;
  type: CardType;
  isRequired?: boolean;
  studentCount?: number;
  remainingDayCount?: number;
  capacity?: number;
  permittedCinerooms?: PermittedCineroom[];
  dataArea?: Area;
  langSupports?: LangSupport[];
}

export default function CardView({
  cardId,
  name,
  htmlName,
  starCount,
  stampCount,
  mainCategory,
  simpleDescription,
  learningTime,
  additionalLearningTime,
  thumbImagePath,
  passedStudentCount,
  type,
  capacity,
  remainingDayCount,
  studentCount,
  permittedCinerooms,
  isRequired = permittedCinerooms
    ? isIncludeCineroomId(permittedCinerooms)
    : false,
  dataArea,
  langSupports,
}: Props) {
  const [inMyLectureMap, setInMyLectureMap] =
    useState<Map<string, InMyLectureModel>>();

  const [inMyLectureModel, setInMyLectureModel] = useState<InMyLectureModel>();
  const [hovered, setHovered] = useState(false);
  const hoverTimer = useRef(0);
  const parseName = useMemo<string>(() => {
    if (langSupports !== undefined) {
      const parsed = parsePolyglotString(name, getDefaultLang(langSupports));
      return parsed;
    } else {
      const parsed = parsePolyglotString(name);
      return parsed;
    }
  }, [name, langSupports]);

  useEffect(() => {
    setInMyLectureModel(inMyLectureMap?.get(cardId));
  }, [inMyLectureMap, cardId]);

  const hourMinuteFormat = useMemo(
    () =>
      dateTimeHelper.timeToHourMinuteFormat(
        learningTime + additionalLearningTime
      ),
    [learningTime, additionalLearningTime]
  );

  const collegeId = useMemo(() => mainCategory.collegeId, [mainCategory]);

  const onHoverIn = () => {
    setHovered(true);
    hoverTimer.current = window.setTimeout(() => {
      hoverTrack({
        area: dataArea,
        actionName: '카드 Hover',
        field: {
          id: cardId,
          type: FieldType.Card,
        },
      });
    }, 1800);
  };

  const onHoverOut = useCallback(() => {
    setHovered(false);
    if (hoverTimer.current) {
      window.clearTimeout(hoverTimer.current);
    }
  }, []);

  const handleAlert = (inMyLectureModel?: InMyLectureModel) => {
    reactAlert({
      title: getPolyglotText('알림', 'home-관심목록alert-주요내용'),
      message: inMyLectureModel
        ? getPolyglotText(
            '본 과정이 관심목록에서 제외되었습니다.',
            'home-관심목록alert-상세2'
          )
        : getPolyglotText(
            '본 과정이 관심목록에 추가되었습니다.',
            'home-관심목록alert-상세1'
          ),
    });
  };

  const handleInMyLecture = () => {
    // if (inMyLectureModel) {
    //   InMyLectureService.instance.removeInMyLectureCard(cardId);
    // } else {
    //   InMyLectureService.instance.addInMyLectureCard({
    //     serviceId: cardId,
    //     serviceType: 'Card',
    //     category: {
    //       channelId: mainCategory.channelId,
    //       collegeId: mainCategory.collegeId,
    //       mainCategory: mainCategory.mainCategory,
    //     },
    //     name: parseName,
    //     cubeType: type,
    //     learningTime,
    //     stampCount,
    //   });
    // }

    handleAlert(inMyLectureModel);
  };

  const getEducationDate = (
    state: 'inProgressTableViews' | 'completedTableViews'
  ) => {
    const educationStateList = sessionStorage.getItem(state);

    const parserEducationStateList =
      educationStateList && JSON.parse(educationStateList);

    const filterEducationState = find(parserEducationStateList, {
      serviceId: cardId,
    });

    if (state === 'inProgressTableViews') {
      return (
        filterEducationState &&
        moment(Number(filterEducationState.startDate)).format('YYYY.MM.DD')
      );
    } else {
      return (
        filterEducationState &&
        moment(Number(filterEducationState.endDate)).format('YYYY.MM.DD')
      );
    }
  };

  const renderBottom = () => {
    const startDate = getEducationDate('inProgressTableViews');
    const endDate = getEducationDate('completedTableViews');

    if (startDate || endDate) {
      const text = startDate
        ? getPolyglotText('학습중', 'home-Inprogress-Card진행중')
        : endDate && getPolyglotText('학습 완료', 'home-Inprogress-Card완료');
      const date = startDate || endDate;
      return (
        <>
          <Label className="onlytext bold">
            <Icon className="state" />
            <span>{text}</span>
          </Label>
          <div className="study-date">
            {`${date} ${getPolyglotText(
              '학습 시작',
              'home-Inprogress-Card시작'
            )}`}
          </div>
        </>
      );
    }

    return (
      <div className="fixed-rating">
        <Rating
          className="rating-num"
          size="small"
          disabled
          rating={starCount}
          maxRating={5}
        />
      </div>
    );
  };

  const renderRibbon = () => {
    if (
      studentCount !== undefined &&
      capacity !== undefined &&
      remainingDayCount !== undefined
    ) {
      if (studentCount >= capacity) {
        return (
          <Label className="done">
            <PolyglotText
              defaultString="정원 마감"
              id="home-Inprogress-정원마감"
            />
          </Label>
        );
      }

      if (remainingDayCount === 0) {
        return (
          <Label className="day">
            <PolyglotText
              defaultString="오늘 마감"
              id="home-Inprogress-오늘마감"
            />
          </Label>
        );
      } else {
        return <Label className="day">D-{remainingDayCount}</Label>;
      }
    }

    if (isRequired) {
      return (
        <Label className="ribbon2">
          <PolyglotText
            defaultString="핵인싸과정"
            id="home-ribbon-핵인싸과정"
          />
        </Label>
      );
    }
  };

  return (
    <Card
      className={classNames({
        'card-h': true,
        on: hovered,
      })}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      <div className="card-ribbon-wrap">{renderRibbon()}</div>
      <div className="card-inner">
        <Thumbnail image={thumbImagePath} />
        <div className="title-area">
          {
            <Label className={getColor(collegeId)}>
              {getCollgeName(collegeId)}
            </Label>
          }
          {htmlName !== undefined && (
            <div
              className="header"
              dangerouslySetInnerHTML={{ __html: htmlName }}
            />
          )}
          {htmlName === undefined && <div className="header">{parseName}</div>}
        </div>

        <Fields>
          <div className="li">
            <Label className="onlytext bold">
              <Icon className={CubeIconType[type]} />
              <span>{CubeNameType[type]}</span>
            </Label>
          </div>
          {(learningTime || stampCount) && (
            <div className="li">
              <SubField icon="time2" bold text={hourMinuteFormat} />
              {stampCount > 0 && (
                <SubField
                  className={(learningTime && 'card-stamp') || ''}
                  bold
                  icon="stamp"
                  text={`Stamp x${stampCount}`}
                />
              )}
            </div>
          )}
          <Field
            icon="complete"
            text={getPolyglotText(
              `이수 {number}명`,
              'home-Inprogress-이수인원',
              { number: numeral(passedStudentCount).format('0,0') }
            )}
          />
        </Fields>
        <div className="foot-area">{renderBottom()}</div>
      </div>
      <div className="hover-content">
        {/*<div className="title-area">*/}
        {/*  {mainCategory && (*/}
        {/*    <Label className={getColor(collegeId)}>*/}
        {/*      {getCollgeName(collegeId)}*/}
        {/*    </Label>*/}
        {/*  )}*/}
        {/*</div>*/}
        {(Array.isArray(langSupports) || isObservableArray(langSupports)) && (
          <div className="g-lang-area">
            <Icon className="i-glb" />
            <div className="g-list">
              {langSupports.map((langSupport) => (
                // <span className={`${langSupport.defaultLang ? 'on' : ''}`}>
                <span>{parseLanguge(langSupport.lang)}</span>
              ))}
            </div>
          </div>
        )}

        <p
          className="text-area"
          dangerouslySetInnerHTML={{
            __html: parsePolyglotString(
              simpleDescription,
              getDefaultLang(langSupports)
            ),
          }}
        />
        <div className="btn-area">
          <Button icon className="icon-line" onClick={handleInMyLecture}>
            <Icon className={inMyLectureModel ? 'remove2' : 'add-list'} />
          </Button>
          <Link to={toPath({ cardId, viewType: 'view', pathname: '' })}>
            <button className="ui button fix bg">
              <PolyglotText
                defaultString="상세보기"
                id="home-Inprogress-상세보기2"
              />
            </button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
