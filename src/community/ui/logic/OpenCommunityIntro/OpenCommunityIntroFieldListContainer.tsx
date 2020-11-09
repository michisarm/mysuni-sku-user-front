import React, { useCallback } from 'react';
import { Icon } from 'semantic-ui-react';
import { requestOpenCommunityList } from '../../../service/useOpenCommunityIntro/utility/requestOpenCommunityIntro';
import {
  getOpenCommunityIntro,
  setOpenCommunityIntro,
  useOpenCommunityIntro,
} from '../../../store/CommunityMainStore';
import FieldItem from '../../../viewModel/OpenCommunityIntro/FieldItem';

interface FieldItemViewProps {
  fieldId?: string;
}

const FieldItemView: React.FC<FieldItem &
  FieldItemViewProps> = function FieldItemView({ id, title, fieldId }) {
  const onClick = useCallback(() => {
    const openCommunityIntro = getOpenCommunityIntro() || {
      fields: [],
      communities: [],
      communitiesTotalCount: 0,
    };
    if (openCommunityIntro.fieldId === id) {
      return;
    }
    setOpenCommunityIntro({ ...openCommunityIntro, fieldId: id });
    requestOpenCommunityList();
  }, [id]);
  return (
    <label htmlFor={`field-item-view-${id}`} className="check-type1">
      <input
        type="checkbox"
        id={`field-item-view-${id}`}
        onClick={onClick}
        checked={id === fieldId}
      />
      <span className="check-type1-text">{title}</span>
    </label>
  );
};

function OpenCommunityIntroFieldListContainer() {
  const openCommunityIntro = useOpenCommunityIntro();

  const onClickAll = useCallback(() => {
    const openCommunityIntro = getOpenCommunityIntro() || {
      fields: [],
      communities: [],
      communitiesTotalCount: 0,
    };
    if (openCommunityIntro.fieldId === undefined) {
      return;
    }
    setOpenCommunityIntro({ ...openCommunityIntro, fieldId: undefined });
    requestOpenCommunityList();
  }, []);

  return (
    <div className="community-slide-wrap">
      <a className="community-slide-prev">
        {/* 활성시 on */}
        <Icon className="prev-off" />
      </a>
      <div className="community-slide-content">
        <div className="community-slide-inner">
          <label htmlFor="field-item-view-all" className="check-type1">
            <input
              type="checkbox"
              id="field-item-view-all"
              checked={openCommunityIntro?.fieldId === undefined}
              onClick={onClickAll}
            />
            <span className="check-type1-text">전체</span>
          </label>
          {openCommunityIntro &&
            openCommunityIntro.fields.map(fieldItem => (
              <FieldItemView
                key={fieldItem.id}
                fieldId={openCommunityIntro.fieldId}
                {...fieldItem}
              />
            ))}
        </div>
      </div>
      <a className="community-slide-next">
        {/* 비활성시 off */}
        <Icon className="next-on" />
      </a>
    </div>
  );
}

export default OpenCommunityIntroFieldListContainer;
