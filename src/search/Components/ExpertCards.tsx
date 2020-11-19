import React from 'react';
import { Icon, Card } from 'semantic-ui-react';
import ExportListDummy from '../model/ExportListDummy';
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
      ExportListDummy && ExportListDummy.map((item, index) => {
        return (
          <Card key={index}>
            <div className="card-inner">
              <a href="#" className="history">
                {/* .ui.profile */}
                <div className="ui profile">
                  <div className={`pic ${item.result.rows[0].fields.name}`} >
                    {/*프로필 사진 자리
                      <Image src='/images/all/profile-80-px.png' alt='프로필사진 임시이미지' />
                      */}
                  </div>
                </div>
                {/* // .ui.profile */}
                <span className="name">{item.result.rows[0].fields.name}</span>
                <span className="co">{item.result.rows[0].fields.department}</span>
                <span className="instructor">{item.result.rows[0].fields.position}</span>
              </a>
              {/* .channel */}
              <div className="channel">
                <Icon className="completed16" />
                <span className="blind">{item.result.rows[0].fields.name}</span>
                <span>{item.result.rows[0].fields.channel_name}</span>
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
