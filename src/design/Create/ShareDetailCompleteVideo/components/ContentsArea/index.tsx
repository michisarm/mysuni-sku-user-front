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
                    {/* 유형에따라 Video, Audio, Webpage, Document, Community */}
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
                    <div>2019.10.07<span className="dash" />승인완료</div>
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


            <Form.Field>
              <label>교육목표</label>
              <div className="ui form">
                <div className="ui right-top-count input">
                  {/* .error // */}
                  <span className="count"><span className="now">0</span>/
                    <span className="max">500</span>
                  </span>
                  <textarea
                    placeholder="교육 목표를 입력해주세요. (최대 500자 입력 가능)"
                  >모든 구성원들의 한단계 발전을 위해
                  </textarea>
                  <span className="validation">You can enter up to 500 characters.</span>
                </div>
              </div>
            </Form.Field>
            <Form.Field>
              <label>교육대상</label>
              <div className="ui form">
                <div className="ui right-top-count input">
                  {/* .error // */}
                  <span className="count"><span className="now">0</span>/<span className="max">500</span>
                  </span>
                  <textarea placeholder="교육 대상을 입력해주세요. (최대 500자 입력가능)">SK Telecom 임직원 모두</textarea>
                  <span className="validation">You can enter up to 500 characters.</span>
                </div>
              </div>
            </Form.Field>
            <Form.Field>
              <label>교육내용</label>
              <div className="ui editor-wrap">
                <div className="ui editor-wrap">
                  <Editor />
                </div>
              </div>
            </Form.Field>
            <Form.Field>
              <div className="ui grid create create2">
                <div className="column"><label>이수조건</label></div>
                <div className="column">
                  <div className="text1">Classroom Join</div>
                </div>
              </div>
            </Form.Field>
            <Form.Field>
              <label>기타안내</label>
              <div className="ui editor-wrap">
                <Editor />
              </div>
            </Form.Field>
            <Form.Field>
              <div className="ui grid create create2">
                <div className="column"><label>교육시간</label></div>
                <div className="column">
                  <div className="text1">20h 55m</div>
                </div>
              </div>
            </Form.Field>

            <Form.Field>
              <label>난이도</label>

              <div className="ui grid create">
                <div className="column">
                  <Select placeholder="선택해주세요"
                    className="dropdown"
                    options={selectOptions01}
                    defaultValue={selectOptions01[1].value}
                  />
                </div>
              </div>
            </Form.Field>

            <Form.Field>
              <label>교육기관 / 출처</label>
              <div className="ui grid create">
                <div className="column">
                  <Select placeholder="선택해주세요"
                    className="dropdown w100"
                    options={selectOptions02}
                    defaultValue={selectOptions02[1].value}
                  />
                </div>
                <div className="column">
                  <div className="ui h48 input">
                    <input type="text" name="" placeholder="직접입력 선택 시 활성화 됩니다." value="EBS 중학" />
                    <Icon className="clear link" />
                  </div>
                </div>
              </div>
            </Form.Field>

            <hr className="dividing" />
            <div className="section-tit">
              <span className="text1">부가정보</span>
            </div>

            <Form.Field>
              <div className="ui grid create create2">
                <div className="column"><label>교육자료</label></div>
                <div className="column">
                  <div className="text2"><a href="#">Education UX/UI class_1.avi</a></div>
                </div>
              </div>
            </Form.Field>
            <Form.Field>
              <div className="ui grid create create2">
                <div className="column"><label>참고자료</label></div>
                <div className="column">
                  <div className="text2"><a href="#">Education UX/UI class_1.avi</a></div>
                  <div className="text2"><a href="#">Education UX/UI class_1.avi</a></div>
                  <div className="text2"><a href="#">Education UX/UI class_1.avi</a></div>
                  <div className="text2"><a href="#">Education UX/UI class_1.avi</a></div>
                  <div className="text2"><a href="#">Education UX/UI class_1.avi</a></div>
                </div>
              </div>
            </Form.Field>
            <Form.Field>
              <div className="ui grid create create2">
                <div className="column"><label>학습카드 공개여부</label></div>
                <div className="column">
                  <div className="field">
                    <div className="ui base radio checkbox">
                      <input type="radio" name="base" tabIndex={0} className="hidden" />
                      <label>공개</label>
                    </div>
                    <div className="ui base radio checkbox">
                      <input type="radio"
                        name="base"
                        checked
                        tabIndex={0}
                        className="hidden"
                      />
                      <label>비공개</label>
                    </div>
                  </div>
                </div>
              </div>
            </Form.Field>

            <ButtonGroup />
          </Form>
        </div>
      </Segment>
    );
  }
}


export default ContentsArea;
