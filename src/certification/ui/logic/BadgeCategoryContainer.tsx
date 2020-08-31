import React, { FunctionComponent } from 'react';
import { Button, Image } from 'semantic-ui-react';
import { getPublicUrl } from 'shared/helper/envHelper';
import classNames from 'classnames';

enum CategoryImageURL {
  BDGCAT_AIDT = '/static/media/icon-ai.png',
  BDGCAT_JOB = '/static/media/icon-common.png',
  BDGCAT_BIZ = '/static/media/icon-biz.png',
  BDGCAT_HAPPY = '/static/media/icon-happy.png',
  BDGCAT_BM = '/static/media/icon-bmdesign.png',
}

interface BadgeCategoryProps {
  categories: any;
  categorySelection: string;
  onClickBadgeCategory: (e: any, categoryId: any) => void;
}

const BadgeCategoryContainer: FunctionComponent<BadgeCategoryProps> = ({
  categories,
  categorySelection,
  onClickBadgeCategory,
}) => {
  //
  const domainPath =
    process.env.REACT_APP_ENVIRONMENT === undefined ||
    process.env.REACT_APP_ENVIRONMENT === 'server'
      ? window.location.protocol + '//' + window.location.host
      : process.env.REACT_APP_PUBLIC_URL;

  return (
    <div className="badge-category">
      <ul>
        {categories.map((category: any, index: number) => (
          <li
            key={`badge-category-${index}`}
            className={classNames(
              'fn-parent',
              category.categoryId === categorySelection ? 'on' : ''
            )}
          >
            <Button
              className="fn-click"
              onClick={e => onClickBadgeCategory(e, category.categoryId)}
            >
              <span className="icon">
                <span>
                  {/*<Image src={domainPath + category.iconUrl} alt={category.name}/>*/}
                  {/*<Image src={category.iconUrl && (domainPath + category.iconUrl)} alt={category.name}/>*/}
                  <Image
                    src={
                      // domainPath +
                      `${getPublicUrl()}${CategoryImageURL[
                          category.categoryId as keyof typeof CategoryImageURL
                      ]}`
                    }
                    alt={category.name}
                  />
                </span>
              </span>
              <span className="title">
                <span className="ellipsis">{category.name}</span>
              </span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BadgeCategoryContainer;
