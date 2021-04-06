import React from 'react';
import { OverviewField } from '../../../personalcube';


interface BadgeTagViewProps {
  tags: string;
}

export function BadgeTagView({
  tags,
}: BadgeTagViewProps) {

  const getTagHtml = (tags: string) => {
    let tagList = new Array();
    let tagHtml = '';

    if (tags.indexOf(',') !== -1) {
      tagList = tags.split(',');
    } else {
      tagList.push(tags);
    }

    tagList.map((tag, index) => {
      if (tag !== '') {
        tagHtml +=
          '<span class="ui label tag" id="tag-' +
          index +
          '">' +
          tag +
          '</span>';
      }
    });

    return tagHtml;
  };

  return (
    <OverviewField.List icon>
      <OverviewField.Item
        titleIcon="tag2"
        title="태그"
        contentHtml={getTagHtml(tags)}
      />
    </OverviewField.List>
  );
}