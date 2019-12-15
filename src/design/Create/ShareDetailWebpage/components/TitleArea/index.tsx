import React, { Component, createRef } from 'react';

class TitleArea extends React.Component {
  render() {
    return (
      <div className="add-personal-learning support">
        <div className="add-personal-learning-wrap">
          <div className="apl-tit">Detail</div>
          <div className="apl-notice">
                        생성하신 학습에 대한 확인과 수정, 그리고 승인요청을 할수 있습니다.
          </div>
        </div>
      </div>
    );
  }
}

export default TitleArea;
