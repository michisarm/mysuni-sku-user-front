import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Card } from 'semantic-ui-react';
import ExportListDummy from '../model/ExportListDummy';
import { useExpert } from './SearchFilter';

const ExpertCards: React.FC = () => {
  const expert = useExpert();

  return (
    <>
      {expert &&
        expert.map((item, index) => {
          return (
            <Card key={index}>
              <div className="card-inner">
                <Link
                  to={`/expert/instructor/${item.fields.pk}/Introduce`}
                  className="history"
                >
                  {/* .ui.profile */}
                  <div className="ui profile">
                    <div className={`pic ${item.fields.name}`}>
                      {/*프로필 사진 자리
                      <Image src='/images/all/profile-80-px.png' alt='프로필사진 임시이미지' />
                      */}
                    </div>
                  </div>
                  {/* // .ui.profile */}
                  <span className="name">{item.fields.name}</span>
                  <span className="co">{item.fields.department}</span>
                  <span className="instructor">{item.fields.position}</span>
                </Link>
                {/* .channel */}
                <div className="channel">
                  <Icon className="completed16" />
                  <span className="blind">{item.fields.name}</span>
                  <span>{item.fields.channel_name}</span>
                </div>
                {/* // .channel */}
              </div>
            </Card>
          );
        })}
    </>
  );
};

export default ExpertCards;
