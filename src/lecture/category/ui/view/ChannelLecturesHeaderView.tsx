import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Button, Image } from 'semantic-ui-react';
import { includes } from 'lodash';
import { reactAutobind } from '@nara.platform/accent';
import mainRoutePaths from 'main/routePaths';
import { ChannelModel, CollegeModel } from 'college/model';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../model/LangSupport';
import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';

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
  onClickCurriculum: () => void;
}

@reactAutobind
@observer
class CategoryLecturesHeaderView extends Component<Props> {
  render() {
    const { channel, college, onClickCurriculum } = this.props;
    const displayCurriculum = includes(VISIBLE_COLLEGE_IDS, college.collegeId);
    return (
      <>
        <div className="white-title" data-area={Area.COLLEGE_INFO}>
          <div className="inner curri-box">
            <div className="inner_txt">
              <strong>
                {parsePolyglotString(
                  channel.name,
                  getDefaultLang(channel.langSupports)
                )}
              </strong>
              <PolyglotText
                defaultString="의 학습 과정 입니다."
                id="cicl-목록-학습과정2"
              />
              <p
                dangerouslySetInnerHTML={{
                  __html: parsePolyglotString(
                    channel.description,
                    getDefaultLang(channel.langSupports)
                  ),
                }}
              />
            </div>
            {displayCurriculum === true && (
              <div className="inner_btn">
                <Button
                  className="personal line"
                  onClick={() => {
                    onClickCurriculum();
                  }}
                >
                  <span>
                    <PolyglotText
                      defaultString="커리큘럼 보기"
                      id="cicl-mall-clcm"
                    />
                  </span>
                </Button>
              </div>

              // <Link to={linkUrl} className="personal line round">
              //   <a href="" className="personal line round">
              //     <Image
              //       style={{ display: 'inline' }}
              //       src={`${PUBLIC_URL}/images/all/icon-course-view.png`}
              //       alt=""
              //     />
              //     <span
              //       style={{
              //         marginTop: '0.34rem',
              //         display: 'inline-block',
              //         fontSize: '0.75rem',
              //         fontWeight: 'bold',
              //         marginLeft: '0.4rem',
              //       }}
              //     >
              //       <PolyglotText
              //         defaultString="커리큘럼 보기"
              //         id="cicl-목록-커리큘럼"
              //       />
              //     </span>
              //   </a>
              // </Link>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default CategoryLecturesHeaderView;
