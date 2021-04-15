import React from 'react';
import { Button } from 'semantic-ui-react';
import { BadgeCategory } from '../../model/BadgeCategory';
import Image from '../../../shared/components/Image';

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
              alt={category.name}
            />
          </span>
        </span>
        <span className="title">
          <span className="ellipsis">{category.name}</span>
        </span>
      </a>
    </>
  );
}
