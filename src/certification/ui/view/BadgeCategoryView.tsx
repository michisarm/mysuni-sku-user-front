import React from 'react';
import { Button } from 'semantic-ui-react';
import { BadgeCategory } from '../../model/BadgeCategory';
import Image from '../../../shared/components/Image';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from 'lecture/model/LangSupport';

interface BadgeCategoryViewProps {
  category: BadgeCategory;
  onClickCategory: (categoryId: string) => void;
}

export default function BadgeCategoryView({
  category,
  onClickCategory,
}: BadgeCategoryViewProps) {
  return (
    <>
      <a className="fn-click" onClick={() => onClickCategory(category.id)}>
        <span className="icon">
          <span>
            <Image
              className="ui image"
              src={category.iconPath}
              alt={parsePolyglotString(
                category.name,
                getDefaultLang(category.langSupports)
              )}
            />
          </span>
        </span>
        <span className="title">
          <span className="ellipsis">
            {parsePolyglotString(
              category.name,
              getDefaultLang(category.langSupports)
            )}
          </span>
        </span>
      </a>
    </>
  );
}
