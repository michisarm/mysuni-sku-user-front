
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { IdNameCount } from 'shared';
import { CollegeLectureCountRdo } from 'lecture';


interface Props {
  colleges: CollegeLectureCountRdo[],
  activeCollege?: CollegeLectureCountRdo,
  channels?: IdNameCount[],
  actions: React.ReactNode,
  onActiveCollege: (e: any, college: CollegeLectureCountRdo) => void,
  onRouteChannel: (e: any, channel?: IdNameCount) => void,
}

@reactAutobind
@observer
class CategoryMenuPanelView extends Component<Props> {
  //
  render() {
    //
    const {
      colleges, activeCollege, channels, actions,
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
                        <span>({activeCollege.collegeCount})</span>
                      </button>

                      { Array.isArray(channels) && (
                        channels.map((channel) => (
                          <button key={`sub-category-${channel.id}`} onClick={(e) => onRouteChannel(e, channel)}>
                            {channel.name}
                            <span>({channel.count})</span>
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
