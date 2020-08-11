
import React, {useEffect, useState} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import {inject, observer} from 'mobx-react';
import {withRouter} from 'react-router';
import {mobxHelper} from '@nara.platform/accent';

import {Badge} from '../../shared/Badge';
import BadgeStyle from '../model/BadgeStyle';
import BadgeSize from '../model/BadgeSize';
import BadgeDetailModel from '../model/BadgeDetailModel';
import {BadgeService} from '../../stores';

interface Props {
  // badge: BadgeDetailModel,
  badgeId: string,
  successModal: boolean,
  onCloseSuccessModal: () => void,
  badgeService?: BadgeService,
}

const ChallengeSuccessModal: React.FC<Props> = (Props) => {
  //
  const { badgeId, successModal, onCloseSuccessModal, badgeService } = Props;

  const [badgeDetail, setBadgeDetail] = useState<BadgeDetailModel>();

  useEffect(() => {
    //
    findBadgeDetailInfo(badgeId);
  },[]);

  const findBadgeDetailInfo = async (badgeId: string) => {
    const badgeInfo = await badgeService!.findBadgeDetailInfo(badgeId);

    if ( badgeInfo ) {
      setBadgeDetail(badgeInfo);
    } else {
      setBadgeDetail(new BadgeDetailModel());
    }
  };

  return (
    <Modal open={successModal} className="base w588">
      <Modal.Header>Badge 획득 알림</Modal.Header>
      <Modal.Content>
        <div className="content-wrap6">
          <div className="badge-p01">
            <Badge
              badge={badgeDetail!}
              badgeStyle={BadgeStyle.Detail}
              badgeSize={BadgeSize.Small}
            />
            <div className="t1">축하합니다</div>
            <div className="t2">‘{badgeDetail?.name}’</div>
            <div className="t3">Badge가 발급되었습니다.</div>
          </div>
        </div>
      </Modal.Content>
      <Modal.Actions className="actions2">
        <Button className="pop2 p" onClick={onCloseSuccessModal}>확인</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default inject(mobxHelper.injectFrom(
  'badge.badgeService',
))(ChallengeSuccessModal);
