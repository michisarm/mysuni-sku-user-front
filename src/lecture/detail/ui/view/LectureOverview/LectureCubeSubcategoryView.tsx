import React, { useEffect, useRef, useState } from 'react';
import { Icon, Label, List } from 'semantic-ui-react';
import LectureSubcategory from '../../../viewModel/LectureOverview/LectureSubcategory';

interface LectureCubeSubcategoryViewProps {
  lectureSubcategory: LectureSubcategory;
}

interface IdName {
  id: string;
  name: string;
}

interface College extends IdName {
  channels: IdName[];
}
const LectureCubeSubcategoryView: React.FC<LectureCubeSubcategoryViewProps> = function LectureCubeSubcategoryView({
  lectureSubcategory,
}) {
  const [subcategoryTree, setSubcategoryTree] = useState<College[]>([]);
  useEffect(() => {
    const nextSubcategoryTree = lectureSubcategory.categories.reduce<College[]>(
      (r, c) => {
        if (!r.some(({ id }) => id === c.college.id)) {
          r.push({
            id: c.college.id,
            name: c.college.name,
            channels: [c.channel],
          });
        } else {
          const college = r.find(({ id }) => id === c.college.id);
          if (college !== undefined) {
            college.channels.push(c.channel);
          }
        }
        return r;
      },
      []
    );
    setSubcategoryTree(nextSubcategoryTree);
  }, [lectureSubcategory]);
  return (
    <div className="ov-paragraph fn-parents">
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
            <List.Item key={college.id}>
              <div className="title">{college.name}</div>
              <div className="detail">
                {college.channels.map(channle => channle.name).join(' / ')}
              </div>
            </List.Item>
          );
        })}
      </List>
    </div>
  );
};

export default LectureCubeSubcategoryView;
