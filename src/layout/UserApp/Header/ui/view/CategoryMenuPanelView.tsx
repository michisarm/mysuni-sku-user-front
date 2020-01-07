
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { CollegeModel, ChannelModel } from 'college';
import ChannelCountRdo from '../../../model/ChannelCountRdo';


interface Props {
  colleges: CollegeModel[],
  activeCollege?: CollegeModel,
  channels?: ChannelModel[],
  collegeCount?: number,
  channelCounts?: ChannelCountRdo[],
  actions: React.ReactNode,
  onActiveCollege: (e: any, college: CollegeModel) => void,
  onRouteChannel: (e: any, channel?: ChannelModel) => void,
}

@reactAutobind
@observer
class CategoryMenuPanelView extends Component<Props> {
  //
  static defaultProps = {
    collegeCount: 0,
  };

  render() {
    //
    const {
      colleges, activeCollege, channels, collegeCount, channelCounts, actions,
      onActiveCollege, onRouteChannel,
    } = this.props;

    return (
      <div className="layer">
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
                      <button onClick={(e) => onRouteChannel(e)}>
                        {activeCollege.name} 전체보기
                        <span>({collegeCount})</span>
                      </button>

                      { Array.isArray(channels) && (
                        channels.map((channel, index) => (
                          <button key={`sub-category-${channel.id}`} onClick={(e) => onRouteChannel(e, channel)}>
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

        { actions }
      </div>
    );
  }
}

export default CategoryMenuPanelView;
