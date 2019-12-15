import React, { Component } from 'react';
import {
  Segment, Form, Icon, Radio, Select, Step, Image, Checkbox, Button, Grid, Table,
} from 'semantic-ui-react';

import ButtonGroup from '../ButtonGroup';
import MainCategoryModal from '../MainCategoryModal';
import SubCategoryChoiceModal from '../SubCategoryChoiceModal';
import Editor from '../../../../Editor';

const selectOptions01 = [
  { key: 'val01', value: 'val01', text: 'Basic' },
  { key: 'val02', value: 'val02', text: 'Intermediate' },
  { key: 'val03', value: 'val03', text: 'Advanced' },
  { key: 'val04', value: 'val04', text: 'Export' },
];
const selectOptions02 = [
  { key: 'val01', value: 'val01', text: '교육기관1' },
  { key: 'val02', value: 'val02', text: '교육기관2' },
  { key: 'val03', value: 'val03', text: '교육기관3' },
  { key: 'val04', value: 'val04', text: '교육기관4' },
  { key: 'val05', value: 'val05', text: '직접입력' },
];

class ContentsArea extends React.Component {
  render() {
    return (
      <Segment className="full">
        <div className="apl-form-wrap create">
          <Form>
            <div className="section-tit">
              <span className="text1">기본정보</span>
            </div>
            <Table className="create">
              <Table.Body>
                <Table.Row>
                  <Table.HeaderCell>강좌명</Table.HeaderCell>
                  <Table.Cell>
                    <div>Mobile App UI UX GUI Design Tutorials (모바일 앱 UX UI GUI 디자인 실무)</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>대표 카테고리</Table.HeaderCell>
                  <Table.Cell>
                    <div>AI<span className="dash" />AI Fundamental</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>서브 카테고리</Table.HeaderCell>
                  <Table.Cell>
                    <div>AI<span className="dash" />AI Biz. Implemetation, AI Tech Essential,
                                            Computer Vison AI
                    </div>
                    <div>DT<span className="dash" />DT Basics, Data Analytics, Data Analytics,
                                            Cloud Developing, Cloud Engineering
                    </div>
                    <div>Global Collage<span className="dash" />국제정세, Global 사업개발전문가, 지역 전문가</div>
                    <div>Management<span className="dash" />HR , 전략, Biz. Development</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>교육형태</Table.HeaderCell>
                  <Table.Cell>
                    <div>Community</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>생성정보</Table.HeaderCell>
                  <Table.Cell>
                    <div>2019.10.08<span className="dash" />홍길동</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>승인정보</Table.HeaderCell>
                  <Table.Cell>
                    <div>2019.10.07<span className="dash" />승인대기</div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <div className="section-tit">
              <span className="text1">노출정보</span>
            </div>

            <Table className="create">
              <Table.Body>
                <Table.Row>
                  <Table.HeaderCell>아이콘</Table.HeaderCell>
                  <Table.Cell>
                    <div><Image src="/images/all/thumb-card-60-px.jpg" /></div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>관계사 공개 범위 설정</Table.HeaderCell>
                  <Table.Cell>
                    <div>A관계사, B관계사, C관계사, D관계사, E관계사</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>Tag 정보</Table.HeaderCell>
                  <Table.Cell>
                    <div>UX, UI, 유엑스, 유아이, UX/UI, 유엑스유아이, UX, UI, 유엑스, 유아이</div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <div className="section-tit">
              <span className="text1">교육정보</span>
            </div>


            <Table className="create">
              <Table.Body>
                <Table.Row>
                  <Table.HeaderCell>교육목표</Table.HeaderCell>
                  <Table.Cell>
                    <div>모든 구성원들의 한단계 발전을 위해</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>교육대상</Table.HeaderCell>
                  <Table.Cell>
                    <div>SK Telecom 임직원 모두</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>교육내용</Table.HeaderCell>
                  <Table.Cell>
                    <div>the offline marketing bootcamp aims to help you & your business in
                                            marketing in
                                            the offline world. We live in a digital age where marketing focuses on
                                            things
                                            like your website, SEO, and so on. We take a look at the traditional &
                                            original
                                            forms of advertising that can still play a vital role in your marketing
                                            campaigns
                    </div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>이수조건</Table.HeaderCell>
                  <Table.Cell>
                    <div>Classroom Join</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>기타안내</Table.HeaderCell>
                  <Table.Cell>
                    <div>You should be able to use a computer. The Bonus modules at the end offers
                                            you
                                            an overview of what services you could offer to clients as well as how to
                                            outsource the tasks so you do less work while earning more money.
                    </div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>교육시간</Table.HeaderCell>
                  <Table.Cell>
                    <div>20h 55m</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>난이도</Table.HeaderCell>
                  <Table.Cell>
                    <div>Intermediate</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>커뮤니티 구분</Table.HeaderCell>
                  <Table.Cell>
                    <div>오픈형</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>기간</Table.HeaderCell>
                  <Table.Cell>
                    <div>20.01.01 ~ 20.12.31</div>
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>교육기관 / 출처</Table.HeaderCell>
                  <Table.Cell>
                    <div>EBS 중학</div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>

            <div className="section-tit">
              <span className="text1">부가정보</span>
            </div>

            <Table className="create">
              <Table.Body>
                <Table.Row>
                  <Table.HeaderCell>학습카드 공개여부</Table.HeaderCell>
                  <Table.Cell>
                    <div>공개</div>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <ButtonGroup />
          </Form>
        </div>
      </Segment>
    );
  }
}


export default ContentsArea;
