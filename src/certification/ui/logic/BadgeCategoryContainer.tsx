import { mobxHelper } from '@nara.platform/accent';
import classNames from 'classnames';
import { getDefaultLang } from 'lecture/model/LangSupport';
import { inject, observer } from 'mobx-react';
import React, { useCallback, useEffect } from 'react';
import ReactGA from 'react-ga';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { BadgeCategoryService } from '../../../lecture/stores';
import { BadgeCategory } from '../../model/BadgeCategory';
import badgePaths from '../../routePaths';
import { useBadgeSlide } from '../../service/useBadgeSlide';
import BadgeCategoryView from '../view/BadgeCategoryView';

interface BadgeCategoryContainerProps {
  badgeCategoryService?: BadgeCategoryService;
}

function BadgeCategoryContainer({
  badgeCategoryService,
}: BadgeCategoryContainerProps) {
  const { categories, selectedCategoryId, setSelectedCategoryId } =
    badgeCategoryService!;

  useEffect(() => {
    return () => {
      BadgeCategoryService.instance.clearSelectedCategoryId();
    };
  }, []);

  const { isNext, isPrev, onClickNext, onClickPrev, sliceCategories } =
    useBadgeSlide(categories);

  const history = useHistory();

  const isAllCheck = selectedCategoryId === '' ? 'on' : '';

  const handleAllCheck = () => {
    setSelectedCategoryId('');
  };

  const onClickCategory = useCallback(
    (categoryId: string) => {
      setSelectedCategoryId(categoryId);

      history.replace(badgePaths.currentPage(1));
    },
    [history, setSelectedCategoryId]
  );

  const onClickGA = useCallback((categoryName: string) => {
    ReactGA.event({
      category: 'Certification',
      action: 'Click',
      label: `Certification-${categoryName}`,
    });
  }, []);

  return (
    <div className="badge-slide-wrap">
      <div className="badge-slide-inner">
        <div className="badge-navi">
          <Button
            className={classNames('btn-prev', isPrev)}
            onClick={onClickPrev}
          >
            <PolyglotText
              defaultString="이전"
              id="Certification-섭탭메뉴-이전"
            />
          </Button>
          <Button
            className={classNames('btn-next', isNext)}
            onClick={onClickNext}
          >
            <PolyglotText
              defaultString="다음"
              id="Certification-섭탭메뉴-다음"
            />
          </Button>
        </div>
        <div className={classNames('fn-parent', isAllCheck)}>
          <a className="fn-click" onClick={handleAllCheck}>
            <span className="icon">
              <span>
                <PolyglotText
                  defaultString="All"
                  id="Certification-섭탭메뉴-all"
                />
              </span>
            </span>
            <span className="title">
              <span className="ellipsis">
                <PolyglotText
                  defaultString="전체보기"
                  id="Certification-섭탭메뉴-전체보기"
                />
              </span>
            </span>
          </a>
        </div>
        <div className="badge-slide">
          <ul>
            {sliceCategories &&
              sliceCategories.length > 0 &&
              sliceCategories.map((category: BadgeCategory, index: number) => {
                const isActive = selectedCategoryId === category.id ? 'on' : '';

                return (
                  <li
                    key={`badge-category-${index}`}
                    className={classNames('fn-parent', isActive)}
                    onClick={() =>
                      onClickGA(
                        parsePolyglotString(
                          category.name,
                          getDefaultLang(category.langSupports)
                        )
                      )
                    }
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
