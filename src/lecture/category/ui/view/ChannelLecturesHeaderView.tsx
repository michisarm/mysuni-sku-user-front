
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ChannelModel, CollegeModel } from 'college/model';
import { Link } from 'react-router-dom';
import { Image } from 'semantic-ui-react';


interface Props {
  channel: ChannelModel,
  college: CollegeModel
}

const PUBLIC_URL = process.env.PUBLIC_URL;

@reactAutobind
@observer
class CategoryLecturesHeaderView extends Component<Props> {

  render() {
    //
    const { channel, college } = this.props;
    return (
      <>
        <div className="white-title">
          <div className="inner">
            <strong>{channel.name}</strong>의 학습 과정 입니다.
            { college.collegeId === 'CLG00020' ? null :
              <Link to={`/introduction/College?subTab=${college.name}`} className="personal line round">
                <a href="" className="personal line round">
                  <Image style={{display: 'inline'}} src={`${PUBLIC_URL}/images/all/icon-course-view.png`} alt="" />
                  <span style={{
                    marginTop: '0.34rem',
                    display: 'inline-block',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    marginLeft: '0.4rem',
                  }}
                  >
                    커리큘럼 보기
                  </span>
                </a>
              </Link>
            }
          </div>
        </div>
      </>
    );
  }
}

export default CategoryLecturesHeaderView;
