import React from 'react';
import { Icon, Card } from 'semantic-ui-react';

// DUMMY
const ExpertItem = [
  {
    name:"김유니",
    pic: "s80",
    co: "Rightbrain",
    instructor: "외부강사",
    blind: "completed",
    sort: "AI / Data Architect"
  },
  {
    name:"김유니",
    pic: "s80",
    co: "Rightbrain",
    instructor: "외부강사",
    blind: "completed",
    sort: "AI / Data Architect"
  },
  {
    name:"김유니",
    pic: "s80",
    co: "Rightbrain",
    instructor: "외부강사",
    blind: "completed",
    sort: "AI / Data Architect"
  },
  {
    name:"김유니",
    pic: "s80",
    co: "Rightbrain",
    instructor: "외부강사",
    blind: "completed",
    sort: "AI / Data Architect"
  },
  {
    name:"김유니",
    pic: "s80",
    co: "Rightbrain",
    instructor: "외부강사",
    blind: "completed",
    sort: "AI / Data Architect"
  },
]
const ExpertCards: React.FC = () => {
  return (
    <>
    {
      ExpertItem && ExpertItem.map((item, index) => {
        return (
          <Card key={index}>
            <div className="card-inner">
              <a href="#" className="history">
                {/* .ui.profile */}
                <div className="ui profile">
                  <div className={`pic ${item.pic}`} >
                    {/*프로필 사진 자리
                      <Image src='/images/all/profile-80-px.png' alt='프로필사진 임시이미지' />
                      */}
                  </div>
                </div>
                {/* // .ui.profile */}
                <span className="name">{item.name}</span>
                <span className="co">{item.co}</span>
                <span className="instructor">{item.instructor}</span>
              </a>
              {/* .channel */}
              <div className="channel">
                <Icon className="completed16" />
                <span className="blind">{item.blind}</span>
                <span>{item.sort}</span>
              </div>
              {/* // .channel */}
            </div>
          </Card>
        )
      })
    }
    </>
  );
};

export default ExpertCards;
