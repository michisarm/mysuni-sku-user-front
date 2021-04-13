import React from 'react';
import { useHistory } from 'react-router';
import { useScrollMove } from 'myTraining/useScrollMove';
import Image from 'shared/components/Image';
import badgeRoutePaths from '../../routePaths';
import classNames from 'classnames';

interface BadgeContentWrapperProps {
  id: string;
  categoryId: string;
  badgeStyle: string;
  onViewDetail?: () => void;
  children: React.ReactNode;
}

export function BadgeContentWrapper({
  id,
  categoryId,
  badgeStyle,
  children,
}: BadgeContentWrapperProps) {
  const history = useHistory();
  const { scrollSave } = useScrollMove();

  const onViewDetail = () => {
    scrollSave();
    history.push(badgeRoutePaths.badgeDetailPage(id));
  };

  const badgeURL = `/static/media/badge/${categoryId}.png`;
  return (
    <>
      {badgeStyle === 'List' ? (
        <a className={classNames('badge-box basic')} onClick={onViewDetail}>
          <span className="badge_thumb">
            <Image src={badgeURL} alt="뱃지이미지" />
          </span>
          {children}
        </a>
      ) : (
        <>
          <span className="badge_thumb">
            <Image src={badgeURL} alt="뱃지이미지" />
          </span>
          {children}
        </>
      )}
    </>
  );
}
