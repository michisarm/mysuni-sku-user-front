import React, {Component, createRef} from "react";
import {Segment, Sticky, Icon, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";
// import "../../style.css"
import ContentsMoreView from "./ContentsMoreView";

class ContentsArea extends Component {
  
  contextRef = createRef();
  state = {activeItem: "MyCommunity"};

  handleItemClick = (e:any, name:any) => this.setState({activeItem: name});

  render() {
    const {activeItem} = this.state;
    return (
        <Segment className="full">
          <div className="course-detail-center community-containter">
            <div className="community-main-contants">
              <div className="community-list-wrap">
                <table className="ui table fixed">
                  <colgroup>
                    <col width="130px"/>
                    <col width="*"/>
                    <col width="130px"/>
                    <col width="130px"/>
                    <col width="130px"/>
                  </colgroup>
                  <thead>
                  <tr>
                    <th scope="col">유형</th>
                    <th scope="col">커뮤니티명</th>
                    <th scope="col">관리자</th>
                    <th scope="col">멤버</th>
                    <th scope="col">생성일자</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Open</td>
                    <td className="title ellipsis"><span className="label">에너지솔루션</span>에너지 솔루션에 대한 모든 것 에너지 솔루션에 대한 모든 것에너지 솔루션에 대한 모든
                      것에너지 솔루션에 대한 모든 것에너지 솔루션에 대한 모든 것에너지 솔루션에 대한 모든 것에너지 솔루션에 대한 모든 것에너지 솔루션에 대한 모든 것에너지 솔루션에 대한 모든
                      것에너지
                      솔루션에 대한 모든 것에너지 솔루션에 대한 모든 것에너지 솔루션에 대한 모든 것에너지 솔루션에 대한 모든 것
                    </td>
                    <td><span className="manager">nickname</span></td>
                    <td>3,670</td>
                    <td>2020.09.21</td>
                  </tr>
                  <tr>
                    <td>Open</td>
                    <td className="title ellipsis"><span className="label">커뮤니티주제</span>반도체 4차산업 OLED 제약의료바이오 자동화장비설계의 모든 것</td>
                    <td><span>tmddnjs78</span></td>
                    <td>50,005</td>
                    <td>2020.09.21</td>
                  </tr>
                  <tr>
                    <td>Open</td>
                    <td className="title ellipsis"><span className="label">리더십</span>딥 러닝과 머신 러닝의 차이</td>
                    <td><span>EBBLE</span></td>
                    <td>3,670</td>
                    <td>2020.09.21</td>
                  </tr>
                  <tr>
                    <td>Cohort</td>
                    <td className="title ellipsis">에너지 거래의 현재와 미래</td>
                    <td><span>chang</span></td>
                    <td>3,670</td>
                    <td>2020.09.21</td>
                  </tr>
                  <tr>
                    <td>Open</td>
                    <td className="title ellipsis"><span className="label">에너지솔루션</span>에너지 솔루션에 대한 모든 것 에너지 솔루션에 대한 모든 것에너지 솔루션에 대한 모든
                      것에너지 솔루션에 대한 모든 것에너지 솔루션에 대한 모든 것에너지 솔루션에 대한 모든 것에너지 솔루션에 대한 모든 것에너지 솔루션에 대한 모든 것에너지 솔루션에 대한 모든
                      것에너지
                      솔루션에 대한 모든 것에너지 솔루션에 대한 모든 것에너지 솔루션에 대한 모든 것에너지 솔루션에 대한 모든 것
                    </td>
                    <td><span className="manager">nickname</span></td>
                    <td>3,670</td>
                    <td>2020.09.21</td>
                  </tr>
                  <tr>
                    <td>Open</td>
                    <td className="title ellipsis"><span className="label">커뮤니티주제</span>반도체 4차산업 OLED 제약의료바이오 자동화장비설계의 모든 것</td>
                    <td><span>tmddnjs78</span></td>
                    <td>50,005</td>
                    <td>2020.09.21</td>
                  </tr>
                  <tr>
                    <td>Open</td>
                    <td className="title ellipsis"><span className="label">리더십</span>딥 러닝과 머신 러닝의 차이</td>
                    <td><span>EBBLE</span></td>
                    <td>3,670</td>
                    <td>2020.09.21</td>
                  </tr>
                  <tr>
                    <td>Cohort</td>
                    <td className="title ellipsis">에너지 거래의 현재와 미래</td>
                    <td><span>chang</span></td>
                    <td>3,670</td>
                    <td>2020.09.21</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <ContentsMoreView />
            </div>
          </div>
        </Segment>
    );
  }
}

export default ContentsArea;
