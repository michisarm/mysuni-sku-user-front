
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { ChannelModel, CollegeModel } from 'college/model';
import { Image } from 'semantic-ui-react';


interface Props {
  channel: ChannelModel,
  college: CollegeModel
}

const PUBLIC_URL = process.env.PUBLIC_URL;

@reactAutobind
@observer
class CategoryLecturesHeaderView extends Component<Props> {


  linkMove = () => {
    // console.log('ch',this.props.channel.name);
    
    if(this.props.channel.name === 'AI/DT Literacy') {
      window.history.replaceState('college', '', '/certification/badge/badge-detail/BADGE-2t');
    }

    else {
      window.history.pushState('college', '', `/introduction/College?subTab=${this.props.college.name}`);
    }
  }

  render() {
    //
    const { channel, college } = this.props;
    return (
      <>
        <div className="white-title">
          <div className="inner">
            <strong>{channel.name}</strong>의 학습 과정 입니다.
            { college.collegeId === 'CLG00020' ? null :
              <a className="personal line round" onClick={this.linkMove}>
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
              </a>
            }
          </div>
        </div>
      </>
    );
  }
}

export default CategoryLecturesHeaderView;
