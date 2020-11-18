import React from 'react';
import { Icon, Card } from 'semantic-ui-react';

const ExpertCards: React.FC = () => {
  return (
    <Card>
      <div className="card-inner">
        <a href="#" className="history">
          {/* .ui.profile */}
          <div className="ui profile">
            <div className="pic s80">
              {/*프로필 사진 자리
                <Image src='/images/all/profile-80-px.png' alt='프로필사진 임시이미지' />
                */}
            </div>
          </div>
          {/* // .ui.profile */}
          <span className="name">김유니</span>
          <span className="co">Rightbrain</span>
          <span className="instructor">외부강사</span>
        </a>
        {/* .channel */}
        <div className="channel">
          <Icon className="completed16" />
          <span className="blind">completed</span>
          <span>AI / Data Architect</span>
        </div>
        {/* // .channel */}
      </div>
    </Card>
  );
};

export default ExpertCards;
