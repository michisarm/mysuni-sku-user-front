import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Card, Image } from 'semantic-ui-react';
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
                  to={`/expert/instructor/${item.id}/Introduce`}
                  className="history"
                >
                  {/* .ui.profile */}
                  <div className="ui profile">
                    <div className="pic">
                      {item.photo_id !== null && item.photo_id !== '' && (
                        <Image
                          src={
                            item.photo_id.startsWith('http')
                              ? item.photo_id
                              : `https://mysuni.sk.com${item.photo_id}`
                          }
                          alt="프로필사진 임시이미지"
                        />
                      )}
                    </div>
                  </div>
                  {/* // .ui.profile */}
                  <span
                    className="name"
                    dangerouslySetInnerHTML={{ __html: item.name }}
                  />
                  <span
                    className="co"
                    dangerouslySetInnerHTML={{ __html: item.department }}
                  />
                  <span
                    className="instructor"
                    dangerouslySetInnerHTML={{ __html: item.position }}
                  />
                </Link>
                {/* .channel */}
                <div className="channel">
                  <Icon className="completed16" />
                  <span
                    className="blind"
                    dangerouslySetInnerHTML={{ __html: item.name }}
                  />
                  <span
                    dangerouslySetInnerHTML={{ __html: item.channel_name }}
                  />
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
