import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { mobxHelper } from '@nara.platform/accent';
import { Badge } from 'certification';
import BadgeService from '../../present/logic/BadgeService';
import BadgeDetailModel from '../model/BadgeDetailModel';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';

interface Props extends RouteComponentProps<{ badgeId: string }> {
  badgeService?: BadgeService;
}

const BadgePreviewPage: React.FC<Props> = Props => {
  //
  const { badgeService, match } = Props;

  const [badgeDetail, setBadgeDetail] = useState<BadgeDetailModel | null>(
    new BadgeDetailModel()
  );

  const [badgeStudentId, setBadgeStudentId] = useState();

  useEffect(() => {
    //
    findMyContent(match.params.badgeId);
  }, [match.params.badgeId]);

  const findMyContent = async (id: string) => {
    //
    const badgeInfo: BadgeDetailModel | null = await badgeService!.findBadgeDetailInfo(id);

    if (badgeInfo) {
      setBadgeDetail(badgeInfo);
    }
    else {
      setBadgeDetail(new BadgeDetailModel());
    }
  };

  console.log(badgeDetail);
  // 뱃지 미리보기 호출
  return (
    <div className="badge-list">
      <ul>
        <li>
          <Badge
            badge={badgeDetail!}
            badgeStyle={BadgeStyle.Detail}
            badgeSize={BadgeSize.Large}
          />
          <div className="badge-name">{badgeDetail!.name}</div>
        </li>
        <li>
          <Badge
            badge={badgeDetail!}
            badgeStyle={BadgeStyle.Detail}
            badgeSize={BadgeSize.Small}
          />
          <div className="badge-name">{badgeDetail!.name}</div>
        </li>
      </ul>
    </div>
  );
};

export default inject(mobxHelper.injectFrom('badge.badgeService'))(
  withRouter(observer(BadgePreviewPage))
);
