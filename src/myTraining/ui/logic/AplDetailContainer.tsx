import React from 'react';
import { Button, Form, Segment, Table } from 'semantic-ui-react';

interface Props {

}

function AplDetailContainer(props: Props) {

  return (
    <Segment className="full">
      <div className="apl-form-wrap create">
        <Form>
          <div className="section-tit">
            <span className="text1">승인정보</span>
          </div>
          <div className="create-detail type-apl">
            <dl>
              <dt>생성자 및 등록일자</dt>
              <dd>
                <span>김써니</span>
                <span className="1">2020.05.29 23:59</span>
              </dd>
            </dl>
            <dl>
              <dt>처리상태</dt>
              <dd>
                <span className="blue">승인</span>
                <span className="1">2020.05.29 23:59</span>
              </dd>
            </dl>
          </div>
          <div className="section-tit">
            <span className="text1">교육정보</span>
          </div>
          <Table>
            <Table.Body>
              <Table.Row>
                <Table.Header>
                  교육형태
                </Table.Header>
                <Table.Cell>
                  <div>
                    {'기타-직접입력 > On-Line Video 특강'}
                  </div>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Header>
                  Channel
                </Table.Header>
                <Table.Cell>
                  <div>
                    AI
                  </div>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Header>
                  <div>
                    2020.05.29~2020.06.29
                  </div>
                </Table.Header>
                <Table.Cell></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Header>
                  교육기간
                </Table.Header>
                <Table.Cell>
                  <div>

                  </div>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Header>
                  교육기관
                </Table.Header>
                <Table.Cell>
                  <div>Youtube & Facebook</div>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Header>
                  교육시간
                </Table.Header>
                <Table.Cell>
                  <div className="time-wrap">
                    <div className="time">
                      <div></div>
                    </div>
                    <div className="time">
                      <div></div>
                    </div>
                    <div className="info-text">
                      <i className="info16 icon">
                        <span className="blind">infomation</span>
                      </i>
                      학습시간으로 인정되는 교육시간을 입력해주세요. / 승인자에 의해 교육시간은 변경될 수 있습니다.
                    </div>
                  </div>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Header>
                  교육내용
                </Table.Header>
                <Table.Cell>
                  <div>
                    Youtube를 보면서 “AI와 Block chain과의 상관관계는 어떻게 되는가?”라는 주제로 학습을 하였습니다.
                    Facebook에서도 비슷한 강의가 있어서 함께 들어봤는데 의외로 나쁘지 않았어요
                    3시간 정도 들었는데 2시간만 교육시간으로 인정해주세요.
                  </div>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Header>
                  첨부파일
                </Table.Header>
                <Table.Cell>
                  <div>
                    <a href="#">Education UX/UI class_1.avi</a>
                  </div>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <div className="buttons editor">
            <Button>List</Button>
            <Button>반려</Button>
            <Button>승인</Button>
          </div>
        </Form>
      </div>
    </Segment>
  );
}

export default AplDetailContainer;