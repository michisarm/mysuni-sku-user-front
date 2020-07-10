
import React from 'react';

const BadgeListContainer: React.FC = () => {
  //
  return (
    <div className="badge-list">
      <ul>
        <li>
          <a href="#" className="badge s280 basic">
            <span className="college">
              <img src="/images/all/icon-chanel-64-px.svg" alt="" />
            </span>
            <span className="part">분야명</span>
            <span className="title">뱃지명</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default BadgeListContainer;
