import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Segment, Table, Input, TextArea } from 'semantic-ui-react';
import { fileUtil, ValidationType } from '@nara.drama/depot';
import { SkProfileService } from 'profile/stores';
import SkProfileUdo from '../../../profile/model/SkProfileUdo';
import Image from '../../../shared/components/Image';
import { uploadFileProfile } from '../../../shared/api/imageApi';
import { reactAlert } from '@nara.platform/accent';
import myPageRoutePaths from 'myTraining/routePaths';
import CommunityProfileModalPreview from '../../../../src/community/ui/view/CommunityAdmin/CommunityProfileModalPreview';
import { isExternalInstructor } from '../../../shared/helper/findUserRole';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';

interface Props extends RouteComponentProps {
  skProfileService?: SkProfileService;
  clickTabHandler?: (id: string) => void;
  onChangeImageFile?: (type: string, base64: string) => void;
}

interface States {
  photoTypeTemp: string;
  photoImageTemp: string;
  photoImageFile?: File;
  bgImageTemp: string;
  bgImageFile?: File;
  nickNameTemp: string;
  changeNickName: boolean;
  introduceTemp: string;
  changeIntroduce: boolean;
  profilePreview: boolean;
}
/* eslint-disable */
@inject(mobxHelper.injectFrom('profile.skProfileService'))
@observer
@reactAutobind
class ProfilPhotoChangeModal extends Component<Props, States> {
  VALID_ICON_EXTENSION: string = 'jpg|jpeg|png';

  state: States = {
    photoTypeTemp: '1',
    photoImageTemp: '',
    bgImageTemp: '',
    nickNameTemp: '',
    changeNickName: false,
    introduceTemp: '',
    changeIntroduce: false,
    profilePreview: false,
  };

  componentDidMount() {
    //
    this.clear();
    const { skProfileService } = this.props;
    if (skProfileService) {
      if (!isExternalInstructor()) {
        skProfileService.findSkProfile();
      } else {
        skProfileService.findCommunityProfile();
      }
    }
  }

  clear() {
    // 초기화 한다
    const { onChangeImageFile } = this.props;
    this.setState({
      photoTypeTemp: '1',
      photoImageTemp: '',
      photoImageFile: undefined,
      bgImageTemp: '',
      bgImageFile: undefined,
      nickNameTemp: '',
      changeNickName: false,
      introduceTemp: '',
      changeIntroduce: false,
    });

    if (onChangeImageFile) {
      onChangeImageFile('photoImageFile', '');
      onChangeImageFile('bgImageFile', '');
    }
  }

  async onConfirm() {
    const { photoImageFile } = this.state;
    const { skProfileService } = this.props;
    const { skProfile } = skProfileService!;

    if (photoImageFile !== undefined) {
      const imagePath = await uploadFileProfile(photoImageFile);
      skProfileService?.setProfileProp(imagePath || '');
    }

    await skProfileService!.modifyPhotoImageByProfileId(
      skProfile.photoImagePath
    );
  }

  validatedAll(file: File) {
    const validations: any[] = [
      { type: 'Extension', validValue: this.VALID_ICON_EXTENSION },
      { type: ValidationType.MaxSize },
    ];

    const hasNonPass = validations.some((validation) => {
      if (typeof validation.validator === 'function') {
        return !validation.validator(file);
      } else {
        if (!validation.type || !validation.validValue) {
          return false;
        }
        return !fileUtil.validate(file, validation.type, validation.validValue);
      }
    });

    return !hasNonPass;
  }

  setProfileImageFile(type: string, file: File) {
    if (!file || (file instanceof File && !this.validatedAll(file))) {
      return;
    }

    const { onChangeImageFile } = this.props;

    this.setState({
      ...this.state,
      [type]: file,
    });

    const fileReader = new FileReader();

    fileReader.onload = (e: any) => {
      if ('photoImageFile' === type) {
        this.setState({ photoImageTemp: e.target.result });
        onChangeImageFile && onChangeImageFile(type, e.target.result);
      } else if ('bgImageFile' === type) {
        this.setState({ bgImageTemp: e.target.result });
        onChangeImageFile && onChangeImageFile(type, e.target.result);
      }
    };

    fileReader.readAsDataURL(file);
  }

  onChangeFile(type: string, e: React.ChangeEvent<HTMLInputElement>) {
    //
    if (e.target.files) {
      this.setProfileImageFile(type, e.target.files[0]);
    }
  }

  async handleSave() {
    //
    const skProfileService = this.props.skProfileService!;
    const { skProfile } = skProfileService!;

    const {
      photoImageFile,
      bgImageFile,
      changeNickName,
      nickNameTemp,
      changeIntroduce,
      introduceTemp,
    } = this.state;

    if (changeNickName) {
      if (!nickNameTemp || nickNameTemp === '') {
        reactAlert({
          title: getPolyglotText('알림', 'mypage-프로필설정-알림1'),
          message: getPolyglotText(
            '닉네임을 입력해주세요',
            'mypage-프로필설정-닉네임입력1'
          ),
        });
        return;
      } else if (nickNameTemp.length > 20) {
        reactAlert({
          title: getPolyglotText('알림', 'mypage-프로필설정-알림2'),
          message: getPolyglotText(
            '닉네임은 최대 20자까지 입력 가능합니다.',
            'mypage-프로필설정-닉네임최대1'
          ),
        });
        return;
      }
    } else {
      if (
        SkProfileService.instance.skProfile.id &&
        (!skProfile.nickname || skProfile.nickname === '')
      ) {
        reactAlert({
          title: getPolyglotText('알림', 'mypage-프로필설정-알림3'),
          message: getPolyglotText(
            '닉네임을 입력해주세요',
            'mypage-프로필설정-닉네임입력2'
          ),
        });
        return;
      }
    }

    if (changeIntroduce) {
      if (!introduceTemp || introduceTemp === '') {
        reactAlert({
          title: getPolyglotText('알림', 'mypage-프로필설정-알림4'),
          message: getPolyglotText(
            '자기소개를 입력해주세요',
            'mypage-프로필설정-자기소개1'
          ),
        });
        return;
      } else if (introduceTemp.length > 45) {
        reactAlert({
          title: getPolyglotText('알림', 'mypage-프로필설정-알림5'),
          message: getPolyglotText(
            '자기소개는 최대 45자까지 입력 가능합니다.',
            'mypage-프로필설정-자기소개최대1'
          ),
        });
        return;
      }
    } else {
      if (
        SkProfileService.instance.skProfile.id &&
        (!skProfile.selfIntroduction || skProfile.selfIntroduction === '')
      ) {
        reactAlert({
          title: getPolyglotText('알림', 'mypage-프로필설정-알림6'),
          message: getPolyglotText(
            '자기소개를 입력해주세요',
            'mypage-프로필설정-자기소개2'
          ),
        });
        return;
      }
    }

    if (photoImageFile !== undefined) {
      await this.onConfirm();
    }

    if (nickNameTemp) {
      // skProfile.nickname = nickNameTemp;
      skProfileService.modifyProfileNickName(nickNameTemp);
    }

    if (introduceTemp) {
      skProfile.selfIntroduction = introduceTemp;
    }

    if (bgImageFile !== undefined) {
      const imagePath = await uploadFileProfile(bgImageFile);
      if (imagePath) {
        this.setState({ bgImageTemp: imagePath });
      }
    }

    if (
      skProfile.backgroundImagePath !== '' ||
      skProfile.nickname !== '' ||
      skProfile.selfIntroduction !== ''
    ) {
      const params = {
        nameValues: [
          { name: 'nickname', value: skProfile.nickname },
          { name: 'selfIntroduction', value: skProfile.selfIntroduction },
          { name: 'photoImagePath', value: skProfile.photoImagePath },
          { name: 'backgroundImagePath', value: this.state.bgImageTemp },
        ],
      };

      skProfileService.modifySkProfile(params).then(() => {
        reactAlert({
          title: getPolyglotText('알림', 'mypage-프로필설정-알림7'),
          message: getPolyglotText(
            '프로필 정보가 수정됐습니다.',
            'mypage-프로필설정-수정완료1'
          ),
        });
        this.clear();
        skProfileService!.findSkProfile();
      });
    } else {
      reactAlert({
        title: getPolyglotText('알림', 'mypage-프로필설정-알림8'),
        message: getPolyglotText(
          '프로필 정보가 수정됐습니다.',
          'mypage-프로필설정-수정완료2'
        ),
      });

      this.clear();

      skProfileService!.findSkProfile();
    }

    // if (profileItem.introduce.length > 100) {
    //   reactAlert({
    //     title: '알림',
    //     message: '인사말을 최대 100자까지만 입력해주세요.',
    //   });
    //   return;
    // }

    // // 닉네임 필수
    // if (profileItem.nickname === '') {
    //   reactAlert({
    //     title: '알림',
    //     message: '닉네임을 입력해주세요.',
    //   });
    //   return;
    // }

    // if (profileItem.nickname.length > 10) {
    //   reactAlert({
    //     title: '알림',
    //     message: '닉네임을 최대 10자까지만 입력해주세요.',
    //   });
    //   return;
    // }

    // if (profileItem.hobby.length > 100) {
    //   reactAlert({
    //     title: '알림',
    //     message: '취미를 최대 100자까지만 입력해주세요.',
    //   });
    //   return;
    // }

    // // 현재 닉네임은 제외
    // if (profileItem.oriNickname !== profileItem.nickname) {
    //   getExistsByNickname(profileItem.nickname).then(response => {
    //     if (response) {
    //       reactAlert({
    //         title: '알림',
    //         message: '중복된 닉네임입니다.',
    //       });
    //     } else {
    //       reactConfirm({
    //         title: '알림',
    //         message: '저장하시겠습니까?',
    //         onOk: () => saveCommunityProfile(),
    //       });
    //     }
    //   });
    // } else {
    //   reactConfirm({
    //     title: '알림',
    //     message: '저장하시겠습니까?',
    //     onOk: () => saveCommunityProfile(),
    //   });
    // }
  }

  handleNickNameChange(e: any) {
    if (e.target.value.length > 20) {
      reactAlert({
        title: getPolyglotText('알림', 'mypage-프로필설정-알림9'),
        message: getPolyglotText(
          '닉네임은 최대 20자까지 입력 가능합니다.',
          'mypage-프로필설정-닉네임최대2'
        ),
      });
      return;
    }

    this.setState({
      nickNameTemp: e.target.value,
      changeNickName: true,
    });
  }

  handleIntroduceChange(e: any) {
    if (e.target.value.length > 45) {
      reactAlert({
        title: getPolyglotText('알림', 'mypage-프로필설정-알림10'),
        message: getPolyglotText(
          '자기소개는 최대 45자까지 입력 가능합니다.',
          'mypage-프로필설정-자기소개최대2'
        ),
      });
      return;
    }

    this.setState({
      introduceTemp: e.target.value,
      changeIntroduce: true,
    });
  }

  handleModalPrivew(e: boolean) {
    this.setState({
      profilePreview: e,
    });
  }

  render() {
    const { skProfileService } = this.props;

    const { skProfile } = skProfileService!;

    /**
     * photoTypeTemp, photoImageTemp 는 사용자가 confirm 버튼을 누르기 전까지 변경한 photoType, photoImage 변경상태을 저장하고 있다가
     * 사용자가 confirm 버튼을 누르면 시스템에 실제로 저장함.
     */
    const {
      photoImageTemp,
      photoImageFile,
      bgImageFile,
      bgImageTemp,
      changeNickName,
      nickNameTemp,
      introduceTemp,
      changeIntroduce,
      profilePreview,
    } = this.state;

    const preProfileInfo = {
      isSetProfile: true, // true
      nickName: nickNameTemp,
      introduce: introduceTemp,
      profileImg: photoImageTemp,
      profileBgImg: bgImageTemp,
    };

    // //첫 로딩시 사용자 profile 정보(skProfile!.photoType)에 값이 없는 경우(기본적으로 0 - IM 으로 선택함).
    // const protoType = photoTypeTemp || skProfile!.photoType || '0';
    // let photoFilePath: string = '';

    // //IM 시스템으로부터 인터페이스받은 사용자 증명사진 보여줌.
    // if (protoType === '0') {
    //   photoFilePath =
    //     member &&
    //     member.photoFilename &&
    //     `${process.env.REACT_APP_SK_IM_PHOTO_ROOT_URL}/${member.photoFilename}`;
    // } else if (protoType === '1') {
    //   //depot 서비스의 파일 업로드 API이용해서 업로드 호출후 반환된 이미지 base64 문자열을 그대로 보여줌.(profile 재조회 안함.)

    //   photoFilePath = photoImageTemp || skProfile!.photoImage; //base64Photo
    // }

    console.log(bgImageTemp);

    return (
      <>
        <div className="mypage_contents profile-edit-contents">
          <strong className="mypage_title">
            <PolyglotText
              defaultString="프로필 설정"
              id="mypage-프로필설정-프로필설정"
            />
          </strong>

          <Segment className="full">
            <div className="table-wrapper">
              <Table>
                <colgroup>
                  <col width="160px" />
                  <col />
                </colgroup>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <PolyglotText
                        defaultString="이름"
                        id="mypage-프로필설정-이름"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {parsePolyglotString(skProfile.name)}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <PolyglotText
                        defaultString="소속"
                        id="mypage-프로필설정-소속"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {parsePolyglotString(skProfile.departmentName)}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <PolyglotText
                        defaultString="닉네임"
                        id="mypage-프로필설정-닉네임"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {(!isExternalInstructor() && (
                        <Input
                          placeholder={getPolyglotText(
                            '닉네임을 입력해주세요 (20자까지 입력 가능)',
                            'mypage-프로필설정-닉네임입력'
                          )}
                          onChange={(e) => this.handleNickNameChange(e)}
                          value={
                            changeNickName ? nickNameTemp : skProfile.nickname
                          }
                        />
                      )) ||
                        (changeNickName ? nickNameTemp : skProfile.nickname)}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>
                      <PolyglotText
                        defaultString="자기소개"
                        id="mypage-프로필설정-자기소개"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {(!isExternalInstructor() && (
                        <TextArea
                          placeholder={
                            getPolyglotText(
                              `자기소개 키워드는 쉼표( , )로 구분합니다.(45자까지 입력 가능)`,
                              'mypage-프로필설정-자기소개설명1'
                            ) +
                            '\n' +
                            getPolyglotText(
                              `사용자 화면에서는 키워드 앞에 해시태그( # )와 함께 보여집니다.`,
                              'mypage-프로필설정-자기소개설명2'
                            )
                          }
                          onChange={(e) => this.handleIntroduceChange(e)}
                          value={
                            changeIntroduce
                              ? introduceTemp
                              : skProfile.selfIntroduction
                          }
                        />
                      )) ||
                        (changeIntroduce
                          ? introduceTemp
                          : skProfile.selfIntroduction)}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bttn-line">
                    <Table.Cell>
                      <PolyglotText
                        defaultString="프로필 이미지"
                        id="mypage-프로필설정-프로필이미지"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {!isExternalInstructor() && (
                        <div className="ui w624 input">
                          <label
                            htmlFor="fileup01"
                            className="ui button line02"
                          >
                            <PolyglotText
                              defaultString="파일 첨부"
                              id="mypage-프로필설정-파일첨부1"
                            />
                          </label>
                          <input
                            type="file"
                            id="fileup01"
                            className="fileup-bttn"
                            onChange={(e) => {
                              this.onChangeFile('photoImageFile', e);
                            }}
                          />
                          <input
                            type="text"
                            readOnly
                            value={photoImageFile?.name || ''}
                            className="fileupload-area"
                          />
                        </div>
                      )}
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row className="bttn-line">
                    <Table.Cell>
                      <PolyglotText
                        defaultString="배경 이미지"
                        id="mypage-프로필설정-배경이미지"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {!isExternalInstructor() && (
                        <div className="ui w624 input">
                          <label
                            htmlFor="fileup02"
                            className="ui button line02"
                          >
                            <PolyglotText
                              defaultString="파일 첨부"
                              id="mypage-프로필설정-파일첨부2"
                            />
                          </label>
                          <input
                            type="file"
                            id="fileup02"
                            className="fileup-bttn"
                            onChange={(e) => {
                              this.onChangeFile('bgImageFile', e);
                            }}
                          />
                          <input
                            type="text"
                            readOnly
                            value={bgImageFile?.name || ''}
                            className="fileupload-area"
                          />
                        </div>
                      )}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </Segment>
          {!isExternalInstructor() && (
            <div className="mypage-edit-bottom">
              <span>
                <strong>
                  <PolyglotText
                    defaultString="미리보기"
                    id="mypage-프로필설정-미리보기1"
                  />
                </strong>
                <PolyglotText
                  defaultString="버튼으로 내 프로필이 다른 사람에게 어떻게 보여지는지 확인해보세요."
                  id="mypage-프로필설정-설명"
                />
              </span>
              <div className="bttn-area">
                <Button
                  className="fix line"
                  onClick={() => this.handleModalPrivew(true)}
                >
                  <PolyglotText
                    defaultString="미리보기"
                    id="mypage-프로필설정-미리보기2"
                  />
                </Button>
                <Button className="fix bg" onClick={this.handleSave}>
                  <PolyglotText
                    defaultString="저장"
                    id="mypage-프로필설정-저장"
                  />
                </Button>
              </div>
            </div>
          )}
          <CommunityProfileModalPreview
            open={profilePreview}
            setOpen={(e) =>
              this.setState({
                profilePreview: e,
              })
            }
            memberId={skProfile.id}
            preProfileInfo={preProfileInfo}
          />
        </div>
      </>
    );
  }
}

export default withRouter(ProfilPhotoChangeModal);
