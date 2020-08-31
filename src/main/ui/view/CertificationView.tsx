
import React, { Component } from 'react';
import { Image, Segment } from 'semantic-ui-react';


class CertificationView extends Component {
  //
  render() {
    //
    return (
      <>
        <div className="common-intro case3">
          <div className="inner">
            <div className="strong">mySUNI에서는 구성원의 자발적 학습과 Career 개발을 위해<br/>인증제도를 운영하고 있습니다.</div>
          </div>
        </div>

        <Segment className="full">
          <div className="certification">

            {/*new contents 0820*/}
            <div className="img-wrap">
              <Image src={`${process.env.PUBLIC_URL}/images/all/intro-certification2.png`} alt="mySUNI의 인증제도 소개" />
            </div>

            <div className="table-wrap">
              <div className="title">
                <div className="left">Badge 체계</div>
                <div className="right">
                  <span className="orange">*</span>
                  8월 중 Open 가능 Badge -&gt; 현재 운영 중인 Badge
                  <span className="gray">(나머지 회색 음영은 추후 오픈 예정)</span>
                </div>
              </div>
              <div className="table">
                <table>
                  <tbody>
                    <tr className="level">
                      <th>분야</th>
                      <td><span/> Lv.1</td>
                      <td><span/> Lv.2</td>
                      <td><span/> Lv.3</td>
                    </tr>
                    <tr>
                      <th>AI/DT</th>
                      <td>
                        <ul>
                          <li><span className="open">AI/DT Literacty</span></li>
                          <li><span className="open">(MS) Azure Fundamentals</span></li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li><span className="open">Citizen Data Scientist(Python/R)</span></li>
                          <li><span className="open">Machine Learning Engineer</span></li>
                          <li><span className="open">Cloud Engineer Associate</span></li>
                          <li><span className="open">- (MS) Azure Developer/Admin</span></li>
                          <li><span>Data [Analyst | Engineer] Associate</span></li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li><span>Data Scientist</span></li>
                          <li><span>Data Engineer Professional</span></li>
                          <li><span>Cloud Engineer Professional</span></li>
                          <li><span>AI Engineer Professional</span></li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th>공통직무</th>
                      <td>
                        <ul>
                          <li><span className="open">Financial Story</span></li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li><span className="open">Scenario Planning</span></li>
                          <li><span>조직 Self-Design</span></li>
                          <li><span className="open">Digital HR Transformation</span></li>
                          <li><span className="open">Investment Financing</span></li>
                          <li><span>Data Driven Marketing</span></li>
                        </ul>
                      </td>
                      <td/>
                    </tr>
                    <tr>
                      <th>미래 Biz</th>
                      <td/>
                      <td className="exp">추후 오픈 예정</td>
                      <td/>
                    </tr>
                    <tr>
                      <th>행복 경영</th>
                      <td>
                        <ul>
                          <li><span>Leadership Essentials</span></li>
                          <li><span className="open">마음 관리</span></li>
                          <li><span>행복 Fundamentals</span></li>
                          <li><span>행복추구실천</span></li>
                          <li><span>SV Fundamentals</span></li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li><span className="open">Coaching Leadership</span></li>
                          <li><span>조직행복추구(가칭)</span></li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li><span>Coaching Export</span></li>
                          <li><span>행복지도 Export</span></li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <th>BM Design</th>
                      <td>
                        <ul>
                          <li><span className="open">Innovation Essentials</span></li>
                          <li><span>Design Thinking Essentials</span></li>
                          <li><span className="open">Agile Essentials</span></li>
                          <li><span>BM Design Essentials</span></li>
                          <li><span>5개 지역 Local Mgmt.(주재원후보군)</span></li>
                        </ul>
                      </td>
                      <td>
                        <ul>
                          <li><span>혁신 Biz 발굴 Initiator</span></li>
                          <li><span>Agile Leading</span></li>
                          <li><span>BM Design Advanced</span></li>
                        </ul>
                      </td>
                      <td>
                        <span>Agile Coach</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Segment>

      </>
    );
  }
}

export default CertificationView;
