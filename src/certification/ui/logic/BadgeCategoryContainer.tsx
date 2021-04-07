import React, { useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
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
  
  const onClickCategory = useCallback((categoryId: string) => {

    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId('');
    } else {
      setSelectedCategoryId(categoryId);
    }
  
    history.replace(badgePaths.currentPage(1));
  }, [selectedCategoryId]);


  return (
    <div className="badge-category">
      <ul>
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
      </ul>
    </div>
  );
}

export default inject(mobxHelper.injectFrom(
  'badge.badgeCategoryService'
))(observer(BadgeCategoryContainer));
