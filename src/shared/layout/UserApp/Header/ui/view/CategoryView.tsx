
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import { Button } from 'semantic-ui-react';
// import { CategoryModel, SubCategoryModel } from 'shared';
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
        <Button className="detail-open" onClick={onClick}>Category</Button>

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
                        <button onClick={(e) => onClickChannel(e)}>{activeCollege.name} 전체보기<span>(125)</span></button>
                        { Array.isArray(channels) && (
                          channels.map((channel) => (
                            <button key={`sub-category-${channel.id}`} onClick={(e) => onClickChannel(e, channel)}>{channel.name}<span>(125)</span></button>
                          ))
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="ui close" onClick={onClick}>
            <i className="new16x17 icon"><span className="blind">close</span></i>
          </button>
        </div>
      </div>
    );
  }
}

export default CategoryView;
