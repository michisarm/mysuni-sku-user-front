import React from 'react';
import classNames from 'classnames';


enum BadgeCategoryId {
  BDGCAT_AIDT = 'aidt',
  BDGCAT_JOB = 'job',
  BDGCAT_BIZ = 'biz',
  BDGCAT_HAPPY = 'happy',
  BDGCAT_BM = 'bm',
}

interface BadgeContentWrapperProps {
  categoryId: string;
  badgeStyle: string;
  onViewDetail?: () => void;
  children: React.ReactNode;
}

export function BadgeContentWrapper({
  categoryId,
  badgeStyle,
  onViewDetail,
  children,
}: BadgeContentWrapperProps) { 
  
  return (
    <>
      {badgeStyle === 'List' ? (
        <a
          className={classNames('badge_new', getCategoryStyle(categoryId))}
          onClick={onViewDetail}
        >
          {children}
        </a>
      ) : (
        <div className={classNames('badge_new', getCategoryStyle(categoryId))}>
          {children}
        </div>
      )}
    </>
  );
}


const getCategoryStyle = (categoryId: string) => {
  return BadgeCategoryId[categoryId as keyof typeof BadgeCategoryId];
}