import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Image } from 'semantic-ui-react';
import { includes } from 'lodash';
import { reactAutobind } from '@nara.platform/accent';
import mainRoutePaths from 'main/routePaths';
import { ChannelModel, CollegeModel } from 'college/model';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';

const PUBLIC_URL = process.env.PUBLIC_URL;

const VISIBLE_COLLEGE_IDS = [
  'CLG00001',
  'CLG00002',
  'CLG00003',
  'CLG00004',
  'CLG00005',
  'CLG00006',
  'CLG00007',
  'CLG00008',
  'CLG00019',
  'CLG0001c',
  'CLG00020',
  'CLG00018',
];

interface Props {
  channel: ChannelModel;
  college: CollegeModel;
}

@reactAutobind
@observer
class CategoryLecturesHeaderView extends Component<Props> {
  render() {
    const { channel, college } = this.props;
    const displayCurriculum = includes(VISIBLE_COLLEGE_IDS, college.collegeId);
    const linkUrl =
      channel.name === 'AI/DT Literacy'
        ? '/certification/badge/badge-detail/BADGE-2t'
        : mainRoutePaths.introductionCollege(college.name);
    return (
      <>
        <div className="white-title">
          <div className="inner">
            <strong>{channel.name}</strong>의 학습 과정 입니다.
            {displayCurriculum === true && (
              <Link to={linkUrl} className="personal line round">
                <a href="" className="personal line round">
                  <Image
                    style={{ display: 'inline' }}
                    src={`${PUBLIC_URL}/images/all/icon-course-view.png`}
                    alt=""
                  />
                  <span
                    style={{
                      marginTop: '0.34rem',
                      display: 'inline-block',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      marginLeft: '0.4rem',
                    }}
                  >
                    <PolyglotText
                      defaultString="커리큘럼 보기"
                      id="cicl-목록-커리큘럼"
                    />
                  </span>
                </a>
              </Link>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default CategoryLecturesHeaderView;
