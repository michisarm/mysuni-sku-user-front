import React, { useCallback } from 'react';
import { Button, Icon, Radio } from 'semantic-ui-react';
import {
  getOpenCommunityIntro,
  setOpenCommunityIntro,
  useOpenCommunityIntro,
} from '../../../store/CommunityMainStore';
import OpenCommunityItem from '../../../viewModel/OpenCommunityIntro/OpenCommunityItem';
import managerIcon from '../../../../style/media/icon-community-manager.png';
import { Link } from 'react-router-dom';

interface FieldItemViewProps {}

const OpenCommunityItemView: React.FC<OpenCommunityItem &
  FieldItemViewProps> = function OpenCommunityItemView({
  communityId,
  fieldTitle,
  approvedState,
  name,
  contents,
  manager,
  memberCount,
  image,
}) {
  return (
    <Link to={`/community/${communityId}`}>
      <div className="community-open-card">
        <div className="open-card-top">
          <span className="label">{fieldTitle}</span>
          <span className="wait">{approvedState}</span>
        </div>
        <div className="open-card-content">
          <p>{name}</p>
          <div className="thumbnail">
            <img
              src={image}
              style={{ height: 72, width: 72, borderRadius: 8 }}
            />
          </div>
          <div className="community-main-left-list">
            <div
              className="community-main-left-h3"
              dangerouslySetInnerHTML={{ __html: contents }}
            />
          </div>
        </div>
        <div className="open-card-bottom">
          <div className="title-area">
            <div className="text-list">
              <img src={managerIcon} />
              <span>{manager}</span>
            </div>
          </div>
          <div className="right-area">
            <span>멤버</span>
            <span>{memberCount}</span>
          </div>
        </div>
      </div>{' '}
    </Link>
  );
};

function OpenCommunityIntroCommunityListContainer() {
  const openCommunityIntro = useOpenCommunityIntro();

  const onClickAll = useCallback(() => {
    const openCommunityIntro = getOpenCommunityIntro() || {
      fields: [],
      communities: [],
      communitiesTotalCount: 0,
    };
    setOpenCommunityIntro({ ...openCommunityIntro, fieldId: undefined });
  }, []);

  return (
    <>
      <div className="open-tab-radio">
        {/* <Radio
          className="base"
          label="최신순"
          name="radioGroup"
          value="value01"
          // checked={this.state.value === 'value01'}
          // onChange={this.handleChange}
        />
        <Radio
          className="base"
          label="멤버순"
          name="radioGroup"
          value="value02"
        />
        <Radio
          className="base"
          label="가나다순"
          name="radioGroup"
          value="value03"
        />
        <Radio
          className="base"
          label="가입대기"
          name="radioGroup"
          value="value04"
        /> */}
      </div>
      <div className="course-detail-center community-containter padding-none">
        <div className="community-open-contants">
          {openCommunityIntro &&
            openCommunityIntro.communities.map(communityItem => (
              <OpenCommunityItemView
                key={communityItem.communityId}
                {...communityItem}
              />
            ))}
        </div>
      </div>
      <div className="more-comments">
        <Button icon className="left moreview">
          {/* <Icon className="moreview" />
          list more */}
        </Button>
      </div>
    </>
  );
}

export default OpenCommunityIntroCommunityListContainer;
