import React, { useEffect, useRef, useState } from 'react';
import { Icon, Label, List } from 'semantic-ui-react';
import LectureTags from '../../../viewModel/LectureOverview/LectureTags';

interface LectureTagsViewProps {
  lectureTags: LectureTags;
}

const LectureTagsView: React.FC<LectureTagsViewProps> = function LectureTagsView({
  lectureTags,
}) {
  return (
    <div className="ov-paragraph fn-parents">
      <List>
        <List.Item>
          <div className="title">
            <h3 className="title-style">
              <Label className="onlytext bold size24">
                <Icon className="tag2" />
                <span>{/*Tag*/}태그</span>
              </Label>
            </h3>
          </div>
          <div className="detail">
            {lectureTags.tags.map((tag, key) => (
              <span className="ui label tag" key={key}>
                {tag}
              </span>
            ))}
          </div>
        </List.Item>
      </List>
    </div>
  );
};

export default LectureTagsView;