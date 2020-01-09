import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Button } from 'semantic-ui-react';
import { ChannelModel } from 'college';
import SubCategoryModalContainer from './SubCategoryModalContainer';
import { CategoryModel } from '../../../../shared';


interface Props {
  // count: number,
  colleges: CategoryModel[]
  channels?: ChannelModel[]
  onSubCategory:(channels: ChannelModel[]) => void
  //selectedChannels?: (channels: ChannelModel[]) => void
}

@reactAutobind
class SubCategoryContainer extends Component<Props> {
  //
  render() {
    //
    const { channels, onSubCategory, colleges } = this.props;
    console.log(channels);
    console.log(colleges);
    return (
      <div className="table-css type5">
        <div className="row">
          <div className="cell v-middle">
            <span className="text1">서브 카테고리</span>
            {
              channels && (
                <SubCategoryModalContainer
                  channels={channels}
                  onSubCategory={onSubCategory}
                  colleges={colleges}
                  trigger={<Button icon className="left post delete">카테고리 선택</Button>}
                />
              )
            }
          </div>
          <div className="cell v-middle">
            <span className="text1">서브 카테고리를 선택해주세요.</span>
            {
              channels && channels.length
              && channels.map((channel) => (
                <span className="text2">
                  {channel.name}
                </span>
              )) || ''
            }
            {/*
                <span className="text2">AI > AI Biz. Implemetation, AI Tech Essential, Computer Vison AI</span>
                <span className="text2">DT > DT Basics, Data Analytics, Data Analytics, Cloud Developing, Cloud Engineering</span>
                <span className="text2">Global Collage > 국제정세, Global 사업개발전문가, 지역 전문가</span>
                <span className="text2">Management > HR , 전략, Biz. Development</span>
             */}
          </div>
        </div>
      </div>
    );
  }
}

export default SubCategoryContainer;
