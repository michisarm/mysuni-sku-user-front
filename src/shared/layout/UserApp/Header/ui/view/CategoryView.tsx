
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button, Icon, Popup } from 'semantic-ui-react';
import { CollegeModel, ChannelModel } from 'college';


interface Props {
  open: boolean,
  colleges: CollegeModel[],
  activeCollege?: CollegeModel,
  channels?: ChannelModel[],
  onClick: (e: any) => void,
  onActiveCollege: (e: any, college: CollegeModel) => void,
  onClickChannel: (e: any, channel?: ChannelModel) => void,
}

@reactAutobind
@observer
class CategoryView extends Component<Props> {
  //
  render() {
    //
    const {
      open, colleges, activeCollege, channels,
      onClick, onActiveCollege, onClickChannel,
    } = this.props;

    return (
      <div className="g-menu-detail">
        <Popup
          trigger={<Button className="ui detail-open">Category</Button>}
          on="click"
          className="g-menu-detail"
          basic
          open={open}
          onClose={onClick}
          onOpen={onClick}
        >

          <div className="layer" style={{ display: open ? 'block' : 'none' }}>
            <div className="table-css">
              <div className="row head">
                <div className="cell v-middle">College</div>
                <div className="cell v-middle">Channel</div>
              </div>
              <div className="row body">
                <div className="cell vtop">
                  <div className="select-area">
                    <div className="scrolling">
                      { colleges.map((college) => (
                        <button
                          key={`category_${college.collegeId}`}
                          className={activeCollege && activeCollege.collegeId === college.collegeId ? 'active' : ''}
                          onClick={(e) => onActiveCollege(e, college)}
                        >
                          {college.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="cell vtop">
                  <div className="select-area">
                    <div className="scrolling">
                      { activeCollege && (
                        <>
                          <button onClick={(e) => onClickChannel(e)}>{activeCollege.name} 전체보기</button>
                          { Array.isArray(channels) && (
                            channels.map((channel) => (
                              <button key={`sub-category-${channel.id}`} onClick={(e) => onClickChannel(e, channel)}>{channel.name}</button>
                            ))
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              icon
              className="img-icon change-channel-of-interest"
              href="../mypage/channel-change-modal"
              target="_blank"
            >
              <span className="underline">관심 Channel 변경 <Icon className="setting17" /></span>
            </Button>
            <Button className="close" onClick={onClick}>
              <i className="new16x17 icon"><span className="blind">close</span></i>
            </Button>
          </div>
        </Popup>
      </div>
    );
  }
}

export default CategoryView;
