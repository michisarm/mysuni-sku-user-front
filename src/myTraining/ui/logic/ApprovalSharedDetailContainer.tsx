import React from 'react';
import { mobxHelper, reactAlert, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Button, Segment } from 'semantic-ui-react';
import { patronInfo } from '@nara.platform/dock';
import routePaths from '../../routePaths';
import { ApprovalCubeService } from '../../stores';
import ApprovalDetailBasicInfoView from '../view/ApprovalDetailBasicInfoView';
import { IdNameApproval } from '../../model/IdNameApproval';
import { ProposalState } from '../../model/ProposalState';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';

interface Props
  extends RouteComponentProps<{
    studentId: string;
    cubeType: string;
    cubeState: string;
  }> {
  approvalCubeService?: ApprovalCubeService;
}

@inject(mobxHelper.injectFrom('approvalCube.approvalCubeService'))
@observer
@reactAutobind
class ApprovalSharedDetailContainer extends React.Component<Props> {
  //
  componentDidMount() {
    //
    const approvalCubeService = this.props.approvalCubeService!;
    const { studentId } = this.props.match.params;

    // 리스트 삭제
    this.checkRemoveAll();

    approvalCubeService.findApprovalCube(studentId);
  }

  componentWillUnmount(): void {
    //
    const approvalCubeService = this.props.approvalCubeService!;
    approvalCubeService!.clearApprovalCube();
  }

  routeToCreateList() {
    //
    // 리스트 삭제
    this.checkRemoveAll();

    // this.clearAll();
    //window.location.href='/suni-main/my-training/my-page/ApprovalList/pages/1';
    this.props.history.push(routePaths.approvalPaidCourse());
  }

  // 전체 삭제
  checkRemoveAll() {
    //
    this.onChangeSelectedStudentProps([]);
    this.onChangeSelectedProposalStateProps([]);
  }

  onChangeSelectedProposalStateProps(selectedList: string[]) {
    //
    const { approvalCubeService } = this.props;
    if (approvalCubeService) {
      approvalCubeService.changeSelectedProposalStateProps(selectedList);
    }
  }

  onChangeStudentRequestCdoProps(name: string, value: any) {
    //
    const { approvalCubeService } = this.props;
    if (approvalCubeService) {
      approvalCubeService.changeStudentRequestProps(name, value);
    }
  }

  async onChangeSelectedStudentProps(selectedList: string[]) {
    //
    const { approvalCubeService } = this.props;
    if (approvalCubeService) {
      approvalCubeService.changeSelectedStudentProps(selectedList);
    }
  }

  async addApprovedLectureSingle() {
    //
    const { approvalCubeService } = this.props;
    const { studentRequest } =
      this.props.approvalCubeService || ({} as ApprovalCubeService);
    const { approvalCube } = this.props.approvalCubeService!;

    const name = patronInfo.getPatronName() || '';
    const email = patronInfo.getPatronEmail() || '';

    const studentId = approvalCube.studentId;

    if (!studentId) return;

    const newSelectedList: string[] = [studentId];
    this.onChangeSelectedStudentProps(newSelectedList);

    this.onChangeStudentRequestCdoProps('remark', approvalCube.remark);
    this.onChangeStudentRequestCdoProps(
      'proposalState',
      ProposalState.Approved
    );
    this.onChangeStudentRequestCdoProps(
      'actor',
      new IdNameApproval({ id: email, name })
    );
    this.onChangeStudentRequestCdoProps('studentIds', newSelectedList);
    await approvalCubeService!.studentRequestOpen(studentRequest);
    // const { error, message } = responseData;

    // if (error) {
    //   if (message) {
    //     reactAlert({ title: '알림', message });
    //   } else {
    //     reactAlert({
    //       title: '알림',
    //       message: '에러 입니다. 관리자에게 문의 하세요.',
    //     });
    //     // 리스트 삭제
    //     this.checkRemoveAll();
    //   }
    // } else {
    //   reactAlert({ title: '알림', message: '성공입니다.' });
    //   this.routeToCreateList();
    // }
    reactAlert({
      title: getPolyglotText('알림', '승인관리-개학승인-알림3'),
      message: getPolyglotText('성공입니다.', '승인관리-개학승인-성공안내2'),
    });
    this.routeToCreateList();
  }

  async addRejectedLectureSingle() {
    //
    const { approvalCubeService } = this.props;
    const { studentRequest, approvalCube } = approvalCubeService!;

    const name = patronInfo.getPatronName() || '';
    const email = patronInfo.getPatronEmail() || '';

    const studentId = approvalCube.studentId;

    if (!studentId) return;

    const newSelectedList: string[] = [studentId];
    this.onChangeSelectedStudentProps(newSelectedList);

    if (!approvalCube.remark) {
      reactAlert({
        title: getPolyglotText('알림', '승인관리-개학승인-알림2'),
        message: getPolyglotText(
          '반려 의견을 입력해주세요.',
          '승인관리-개학승인-입력안내'
        ),
      });
      return;
    }

    this.onChangeStudentRequestCdoProps('remark', approvalCube.remark);
    this.onChangeStudentRequestCdoProps(
      'proposalState',
      ProposalState.Rejected
    );
    this.onChangeStudentRequestCdoProps(
      'actor',
      new IdNameApproval({ id: email, name })
    );
    this.onChangeStudentRequestCdoProps('studentIds', newSelectedList);

    await approvalCubeService!.studentRequestReject(studentRequest);

    // if (error) {
    //   if (message) {
    //     reactAlert({ title: '알림', message });
    //   } else {
    //     reactAlert({
    //       title: '알림',
    //       message: '에러 입니다. 관리자에게 문의 하세요.',
    //     });
    //     // 리스트 삭제
    //     this.checkRemoveAll();
    //   }
    // } else {
    //   reactAlert({ title: '알림', message: '성공입니다.' });
    //   this.routeToCreateList();
    // }
    reactAlert({
      title: getPolyglotText('알림', '승인관리-개학승인-알림'),
      message: getPolyglotText('성공입니다.', '승인관리-개학승인-성공안내'),
    });
    this.routeToCreateList();
  }

  onChangeApprovalCubeProps(name: string, value: any) {
    //
    const { approvalCubeService } = this.props;
    approvalCubeService!.changeCubeProps(name, value);
  }

  onChangeRemark(e: any) {
    const { value } = e.target;
    this.onChangeApprovalCubeProps('remark', value);
  }

  render() {
    const { approvalCubeService } = this.props;
    const { approvalCube } = approvalCubeService!;

    return (
      <>
        <section className="content bg-white">
          <div className="add-personal-learning">
            <div className="add-personal-learning-wrap">
              <div className="apl-tit">
                <PolyglotText
                  id="승인관리-개학승인-승인요청"
                  defaultString="교육 승인 요청"
                />
              </div>
              <div
                className="apl-notice"
                dangerouslySetInnerHTML={{
                  __html: getPolyglotText(
                    `학습 수강에 대한 승인 요청을 결제하실 수 있습니다.승인 혹은 반려 처리에 대한 승인자 의견을 함께 작성하실 수 있습니다.`,
                    '승인관리-개학승인-요청안내'
                  ),
                }}
              />
            </div>
          </div>
          <Segment className="full">
            <div className="apl-form-wrap">
              <>
                <ApprovalDetailBasicInfoView approvalCube={approvalCube} />
                <>
                  <div className="result-view">
                    <dl className="bl">
                      <dt>
                        <PolyglotText
                          id="승인관리-개학승인-의견"
                          defaultString="승인자 의견"
                        />
                      </dt>

                      {approvalCube.proposalState === 'Submitted' && (
                        <div>
                          <dd>
                            <textarea
                              placeholder={getPolyglotText(
                                '승인자 의견을 입력해주세요',
                                '승인관리-개학승인-의견입력'
                              )}
                              value={
                                (approvalCube && approvalCube.remark) || ''
                              }
                              onChange={this.onChangeRemark}
                            />
                          </dd>
                        </div>
                      )}
                      {approvalCube.proposalState !== 'Submitted' && (
                        <div>
                          <dd>
                            <textarea
                              placeholder=" "
                              value={
                                (approvalCube && approvalCube.remark) || ''
                              }
                              readOnly={true}
                            />
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  <div className="buttons border-none">
                    {approvalCube.proposalState === 'Submitted' && (
                      <div>
                        <Button
                          className="fix line"
                          onClick={this.routeToCreateList}
                        >
                          <PolyglotText
                            id="승인관리-개학승인-목록버튼1"
                            defaultString="List"
                          />
                        </Button>
                        <Button
                          className="fix line"
                          onClick={this.addRejectedLectureSingle}
                        >
                          <PolyglotText
                            id="승인관리-개학승인-반려버튼"
                            defaultString="반려"
                          />
                        </Button>
                        <Button
                          className="fix bg"
                          onClick={this.addApprovedLectureSingle}
                        >
                          <PolyglotText
                            id="승인관리-개학승인-승인버튼"
                            defaultString="승인"
                          />
                        </Button>
                      </div>
                    )}
                    {approvalCube.proposalState !== 'Submitted' && (
                      <div>
                        <Button
                          className="fix line"
                          onClick={this.routeToCreateList}
                        >
                          <PolyglotText
                            id="승인관리-개학승인-목록버튼2"
                            defaultString="List"
                          />
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              </>
            </div>
          </Segment>
        </section>
      </>
    );
  }
}
export default withRouter(ApprovalSharedDetailContainer);
