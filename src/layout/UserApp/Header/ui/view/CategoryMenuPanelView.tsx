import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { IdNameCount } from 'shared/model';
import { CollegeLectureCountRdo } from 'lecture/model';
import { ActionLogService } from 'shared/stores';

import ReactGA from 'react-ga';

interface Props {
  actionLogService?: ActionLogService;
  colleges: CollegeLectureCountRdo[];
  activeCollege?: CollegeLectureCountRdo;
  channels?: IdNameCount[];
  actions: React.ReactNode;
  onActiveCollege: (e: any, college: CollegeLectureCountRdo) => void;
  onRouteChannel: (e: any, channel?: IdNameCount) => void;
}

@inject(mobxHelper.injectFrom('shared.actionLogService'))
@reactAutobind
@observer
class CategoryMenuPanelView extends Component<Props> {
  //

  onClickChannelActionLog(text: string) {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: text });

    setTimeout(() => {
      ReactGA.pageview(window.location.pathname, [], `${text}`);
    }, 1000);
  }

  onClickActionLog(text: string) {
    const { actionLogService } = this.props;
    actionLogService?.registerClickActionLog({ subAction: text });
  }

  render() {
    //
    const {
      colleges,
      activeCollege,
      channels,
      actions,
      onActiveCollege,
      onRouteChannel,
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
                  {colleges.map(college => (
                    <button
                      key={`category_${college.collegeId}`}
                      className={
                        activeCollege &&
                        activeCollege.collegeId === college.collegeId
                          ? 'active'
                          : ''
                      }
                      onClick={e => {
                        this.onClickActionLog(college.name);
                        onActiveCollege(e, college);
                      }}
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
                  {activeCollege && (
                    <>
                      <button
                        onClick={e => {
                          this.onClickChannelActionLog(
                            `${activeCollege.name} 전체보기`
                          );
                          onRouteChannel(e);
                        }}
                      >
                        {activeCollege.name} 전체보기
                        <span>({activeCollege.totalCount})</span>
                      </button>

                      {Array.isArray(channels) &&
                        channels.map(channel => (
                          <button
                            key={`sub-category-${channel.id}`}
                            onClick={e => {
                              this.onClickChannelActionLog(channel.name);
                              onRouteChannel(e, channel);
                            }}
                          >
                            {channel.name}
                            <span>({channel.count})</span>
                          </button>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {actions}
      </div>
    );
  }
}

export default CategoryMenuPanelView;
