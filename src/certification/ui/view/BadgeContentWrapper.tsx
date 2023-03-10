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
  backgroundImagePath: string;
  children: React.ReactNode;
}

export function BadgeContentWrapper({
  id,
  categoryId,
  badgeStyle,
  backgroundImagePath,
  children,
}: BadgeContentWrapperProps) {
  const history = useHistory();
  const { scrollSave } = useScrollMove();

  const onViewDetail = () => {
    scrollSave();
    history.push(badgeRoutePaths.badgeDetailPage(id));
  };

  return (
    <>
      {badgeStyle === 'List' ? (
        <a className={classNames('badge-box basic')} onClick={onViewDetail}>
          <span className="badge_thumb">
            <Image src={backgroundImagePath} alt="뱃지이미지" />
          </span>
          {children}
        </a>
      ) : (
        <>
          <span className="badge_thumb">
            <Image src={backgroundImagePath} alt="뱃지이미지" />
          </span>
          {children}
        </>
      )}
    </>
  );
}
