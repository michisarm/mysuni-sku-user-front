
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button, Icon } from 'semantic-ui-react';
import { CollegeModel, ChannelModel } from 'college';
import ChannelCountRdo from '../../../model/ChannelCountRdo';


interface Props {
  open: boolean,
  colleges: CollegeModel[],
  activeCollege?: CollegeModel,
  channels?: ChannelModel[],
  collegeCount?: number,
  channelCounts?: ChannelCountRdo[],
  onClick: (e: any) => void,
  onActiveCollege: (e: any, college: CollegeModel) => void,
  onClickChannel: (e: any, channel?: ChannelModel) => void,
  onModalOpen: () => void,
}

@reactAutobind
@observer
class CategoryView extends Component<Props> {
  //
  static defaultProps = {
    collegeCount: 0,
  };

  render() {
    //
    const {
      open, colleges, activeCollege, channels, collegeCount, channelCounts,
      onClick, onActiveCollege, onClickChannel, onModalOpen,
    } = this.props;

    return (
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
                      <button onClick={(e) => onClickChannel(e)}>
                        {activeCollege.name} 전체보기
                        <span>({collegeCount})</span>
                      </button>

                      { Array.isArray(channels) && (
                        channels.map((channel, index) => (
                          <button key={`sub-category-${channel.id}`} onClick={(e) => onClickChannel(e, channel)}>
                            {channel.name}
                            <span>
                              ({channelCounts && channelCounts.length > 0 && channelCounts[index] && channelCounts[index].lectureCount})
                            </span>
                          </button>
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
          onClick={onModalOpen}
        >
          <span className="underline">관심 Channel 변경 <Icon className="setting17" /></span>
        </Button>
        <Button className="close" onClick={onClick}>
          <i className="new16x17 icon"><span className="blind">close</span></i>
        </Button>
      </div>
    );
  }
}

export default CategoryView;
