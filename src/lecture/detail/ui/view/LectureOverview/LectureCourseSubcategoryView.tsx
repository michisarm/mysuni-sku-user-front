import React, { useEffect, useState } from 'react';
import { Icon, Label, List } from 'semantic-ui-react';
import {
  getChannelName,
  getCollgeName,
} from '../../../../../shared/service/useCollege/useRequestCollege';
import LectureSubcategory from '../../../viewModel/LectureOverview/LectureSubcategory';

interface LectureCourseSubcategoryViewProps {
  lectureSubcategory: LectureSubcategory;
}

interface College {
  collegeId: string;
  channelIds: string[];
}
const LectureCourseSubcategoryView: React.FC<LectureCourseSubcategoryViewProps> = function LectureCourseSubcategoryView({
  lectureSubcategory,
}) {
  const [subcategoryTree, setSubcategoryTree] = useState<College[]>([]);
  useEffect(() => {
    const nextSubcategoryTree = lectureSubcategory.categories.reduce<College[]>(
      (r, c) => {
        if (!r.some(({ collegeId }) => collegeId === c.collegeId)) {
          r.push({
            collegeId: c.collegeId,
            channelIds: [c.channelId],
          });
        } else {
          const college = r.find(({ collegeId }) => collegeId === c.collegeId);
          if (college !== undefined) {
            college.channelIds.push(c.channelId);
          }
        }
        return r;
      },
      []
    );
    setSubcategoryTree(nextSubcategoryTree);
  }, [lectureSubcategory]);
  return (
    <div className="ov-paragraph fn-parents intro">
      <div className="section-head">
        <h3 className="title-style">
          <Label className="onlytext bold size24">
            <Icon className="category" />
            <span>{/* Sub Category */}관련 Category</span>
          </Label>
        </h3>
      </div>

      <List bulleted>
        {subcategoryTree.map(college => {
          return (
            <List.Item key={college.collegeId}>
              <div className="title">{getCollgeName(college.collegeId)}</div>
              <div className="detail">
                {college.channelIds
                  .map(channelId => getChannelName(channelId))
                  .join(' / ')}
              </div>
            </List.Item>
          );
        })}
      </List>
    </div>
  );
};

export default LectureCourseSubcategoryView;
