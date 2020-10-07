
import React, { Component } from 'react';
import { Image, Segment } from 'semantic-ui-react';
import introductionCertification2 from '../../../style/media/introduction-certification2.png';


class CertificationView extends Component {
  //
  render() {
    //
    return (
      <>
        <div className="common-intro case3">
          <div className="inner">
            <div className="strong">mySUNI에서는 구성원의 자발적 학습과 Career 개발을 위해<br/>인증제도를 운영하고 있습니다.</div>
            <iframe title="인증안내 영상" className="inner-video" src="https://sku.ap.panopto.com/Panopto/Pages/Embed.aspx?id=4ecc2936-9626-4201-af48-ac4b0098f10c&amp;offerviewer=false&amp;showtitle=false&amp;interactivity=none&amp;showbrand=false"/>
            <img src="../../img/certification.png" alt=""/>
          </div>
        </div>

        <Segment className="full">
          <div className="certification">
            <div className="img-wrap">
              <img src={introductionCertification2} alt=""/>
              <div className="table-wrap">
                <div className="title">
                  <div className="left">Badge 체계</div>
                  <div className="right"><span className="orange">*</span>8월 중 Open 가능 Badge -&gt; 현재 운영 중인 Badge <span className="gray">(나머지 회색 음영은 추후 오픈 예정)</span></div>
                </div>
                <div className="table">
                  <table>
                    <tbody>
                      <tr className="level">
                        <th>유형</th>
                        <td><span/>Badge (Lv.1)</td>
                        <td><span/>Badge (Lv.2)</td>
                        <td><span/>Badge (Lv.3)</td>
                      </tr>
                      <tr>
                        <th>AI/DT</th>
                        <td>
                          <ul>
                            <li><span className="open">AI/DT Literacy</span></li>
                            <li><span className="open">(MS) Azure Fundamentals</span></li>
                          </ul>
                        </td>
                        <td>
                          <ul>
                            <li><span className="open">Citizen Data Scientist(Python/R)</span></li>
                            <li><span className="open">Machine Learning Engineer</span></li>
                            <li><span className="open">Cloud Engineer Associate</span></li>
                            <li><span className="open">(MS) Azure Developer Associate</span></li>
                            <li><span className="open">(MS) Azure Data Engineer Associate</span></li>
                            <li><span className="open">(MS) Azure Data Scientist Associate</span></li>
                            <li><span className="open">(MS) Azure AI Engineer Associate</span></li>
                          </ul>
                        </td>
                        <td>
                          <ul>
                            <li><span className="open">(MS) Azure Solutions Architect Expert</span></li>
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
                            <li><span className="open">조직 Self-Design</span></li>
                            <li><span className="open">Digital HR Transformation</span></li>
                            <li><span className="open">Investment Financing</span></li>
                            <li><span>Data Driven Marketing</span></li>
                          </ul>
                        </td>
                        <td/>
                      </tr>
                      <tr>
                        <th>미래 Biz</th>
                        <td>
                          <ul>
                            <li><span>반도체 Biz Essentials</span></li>
                            <li><span>반도체 Tech Essentials</span></li>
                          </ul>
                        </td>
                        <td className="exp"/>
                        <td/>
                      </tr>
                      <tr>
                        <th>행복 경영</th>
                        <td>
                          <ul>
                            <li><span className="open">Leadership Essentials</span></li>
                            <li><span className="open">마음 관리</span></li>
                            <li><span>행복 Fundamentals</span></li>
                            <li><span>행복추구실천(행실러)</span></li>
                            <li><span className="open">SV Fundamentals</span></li>
                          </ul>
                        </td>
                        <td>
                          <ul>
                            <li><span className="open">Coaching Leadership</span>
                            </li>
                          </ul>
                        </td>
                        <td>
                          <ul>
                            <li><span className="open">Coaching Expert</span></li>
                            <li><span>행복지도 Expert</span></li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <th>BM Design</th>
                        <td>
                          <ul>
                            <li><span className="open">디자인씽킹 Essentials</span></li>
                            <li><span className="open">애자일 Essentials</span></li>
                            <br/>
                            <li><span className="open">BM Design Essentials</span></li>
                            <li><span className="open">5개 지역 Local Mgmt.(주재원후보군)</span></li>
                          </ul>
                        </td>
                        <td>
                          <ul>
                            <li><span className="open">혁신 Biz 발굴 Initiator</span></li>
                            <li><span>애자일 리더</span></li>
                            <br/>
                            <li><span className="open">BM Design Advanced</span></li>
                          </ul>
                        </td>
                        <td>
                          <ul>
                            <li><span>애자일 코치</span></li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Segment>

      </>
    );
  }
}

export default CertificationView;
