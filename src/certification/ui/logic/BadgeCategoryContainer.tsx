import React, { useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { mobxHelper } from '@nara.platform/accent';
import classNames from 'classnames';
import ReactGA from 'react-ga';
import { BadgeCategoryService } from '../../../lecture/stores';
import { useRequestBadgeCategory } from '../../service/useRequestBadgeCategory';
import BadgeCategoryView from '../view/BadgeCategoryView';
import badgePaths from '../../routePaths';
import { BadgeCategory } from '../../model/BadgeCategory';

interface BadgeCategoryContainerProps {
  badgeCategoryService?: BadgeCategoryService;
}

function BadgeCategoryContainer({
  badgeCategoryService,
}: BadgeCategoryContainerProps) {
  const {
    categories,
    selectedCategoryId,
    setSelectedCategoryId,
  } = badgeCategoryService!;

  const history = useHistory();
  useRequestBadgeCategory();

  const onClickGA = useCallback((categoryName: string) => {
    ReactGA.event({
      category: 'Certification',
      action: 'Click',
      label: `Certification-${categoryName}`,
    });
  }, []);

  const onClickCategory = useCallback(
    (categoryId: string) => {
      if (selectedCategoryId === categoryId) {
        setSelectedCategoryId('');
      } else {
        setSelectedCategoryId(categoryId);
      }

      history.replace(badgePaths.currentPage(1));
    },
    [selectedCategoryId]
  );

  return (
    <div className="badge-slide-wrap">
      <div className="badge-slide-inner">
        <div className="badge-navi">
          <Button className="btn-prev prev-off">이전</Button>
          <Button className="btn-prev next-on">다음</Button>
        </div>
        <div className={classNames('fn-parent')}>
          <a className="fn-click">
            <span className="icon">
              <span>All</span>
            </span>
            <span className="title">
              <span className="ellipsis">전체보기</span>
            </span>
          </a>
        </div>
        <div className="badge-slide">
          <ul>
            {categories &&
              categories.length > 0 &&
              categories.map((category: BadgeCategory, index: number) => {
                const isActive = selectedCategoryId === category.id ? 'on' : '';

                return (
                  <li
                    key={`badge-category-${index}`}
                    className={classNames('fn-parent', isActive)}
                    onClick={() => onClickGA(category.name)}
                  >
                    <BadgeCategoryView
                      category={category}
                      onClickCategory={onClickCategory}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
      {/* <ul>
        {
          categories &&
          categories.length > 0 &&
          categories.map((category:BadgeCategory, index: number) => {
            const isActive = selectedCategoryId === category.id ? 'on' : '';
            
            return (
              <li
                key={`badge-category-${index}`}
                className={classNames('fn-parent', isActive)}
                onClick={() => onClickGA(category.name)}
              >
                <BadgeCategoryView 
                  category={category}
                  onClickCategory={onClickCategory}
                />
              </li>
            );
          })
        }
      </ul> */}
    </div>
  );
}

export default inject(mobxHelper.injectFrom('badge.badgeCategoryService'))(
  observer(BadgeCategoryContainer)
);
