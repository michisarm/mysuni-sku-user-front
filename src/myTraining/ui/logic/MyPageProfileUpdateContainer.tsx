import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Button, Segment, Table, Input, TextArea } from 'semantic-ui-react';
import { fileUtil, ValidationType } from '@nara.drama/depot';
import SkProfileService from '../../../profile/present/logic/SkProfileService';
import SkProfileUdo from '../../../profile/model/SkProfileUdo';
import Image from '../../../shared/components/Image';
import { uploadFileProfile } from '../../../shared/api/imageApi';
import { reactAlert } from '@nara.platform/accent';
import myPageRoutePaths from 'myTraining/routePaths';
import CommunityProfileModalPreview from '../../../../src/community/ui/view/CommunityAdmin/CommunityProfileModalPreview';

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
    profilePreview: false
  };

  componentDidMount() {
    //
    this.clear();
    const { skProfileService } = this.props;
    skProfileService!.findSkProfile();
  }

  clear(){
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
      changeIntroduce: false
    });

    if(onChangeImageFile){
      onChangeImageFile("photoImageFile", '')
      onChangeImageFile("bgImageFile", '')
    } 
  }

  async onConfirm() {
    //
    const { photoTypeTemp, photoImageFile } = this.state;
    const { skProfileService } = this.props;
    const { skProfile } = skProfileService!;

    if (photoImageFile !== undefined) {
      const imagePath = await uploadFileProfile(photoImageFile);
      skProfileService!.setProfileProp('photoImage', imagePath || '');
    }

    if (photoTypeTemp) {
      skProfileService!.setProfileProp('photoType', photoTypeTemp);
    }

    skProfileService!.modifyPhotoImageByProfileId(
      skProfile.id,
      skProfile.photoType,
      skProfile.photoImage
    );
  }

  validatedAll(file: File) {
    //
    const validations: any[] = [
      { type: 'Extension', validValue: this.VALID_ICON_EXTENSION },
      { type: ValidationType.MaxSize },
    ];

    const hasNonPass = validations.some(validation => {
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
    //
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
      //
      if("photoImageFile" === type){
        this.setState({ photoImageTemp: e.target.result });
        onChangeImageFile && onChangeImageFile(type, e.target.result)
      }else if("bgImageFile" === type){
        this.setState({ bgImageTemp: e.target.result });
        onChangeImageFile && onChangeImageFile(type, e.target.result)
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
    const { 
      photoImageFile,
      bgImageFile,
      nickNameTemp,
      introduceTemp
    } = this.state;

    if(!nickNameTemp || 
      nickNameTemp === ''){
      reactAlert({ title: '알림', message: '닉네임을 입력해주세요' });
        return;
    }else if(introduceTemp.length > 20){
      reactAlert({ title: '알림', message: '닉네임은 최대 20자까지 입력 가능합니다.' });
        return;
    }

    if(!introduceTemp || 
      introduceTemp === ''){
      reactAlert({ title: '알림', message: '자기소개를 입력해주세요' });
        return;
    }else if(introduceTemp.length > 45){
      reactAlert({ title: '알림', message: '자기소개는 최대 45자까지 입력 가능합니다.' });
        return;
    }

    if (photoImageFile !== undefined) {
      await this.onConfirm();
    }

    let skProfileUdo: SkProfileUdo;
    skProfileUdo = new SkProfileUdo(
      skProfileService.skProfile.member.currentJobGroup,
      skProfileService.skProfile.member.favoriteJobGroup,
      skProfileService.skProfile.pisAgreement
    );

    if (bgImageFile !== undefined) {
      const imagePath = await uploadFileProfile(bgImageFile);
      if(imagePath) skProfileUdo.bgImage = imagePath;
    }

    if(nickNameTemp) skProfileUdo.nickName = nickNameTemp;
    if(introduceTemp) skProfileUdo.introduce = introduceTemp;

    skProfileService.modifySkProfile(skProfileUdo).then(() => {
      reactAlert({
        title: '알림',
        message: '프로필 정보가 수정됐습니다.',
      });

      this.clear();

      skProfileService!.findSkProfile();
    });


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
  };

  handleNickNameChange(e: any) {
    this.setState({
      nickNameTemp: e.target.value,
      changeNickName: true
    });
  };

  handleIntroduceChange(e: any) {
    this.setState({
      introduceTemp: e.target.value,
      changeIntroduce: true
    });
  };

  handleModalPrivew(e: boolean) {
    this.setState({
      profilePreview: e
    });
  };

  render() {
    const {
      skProfileService,
    } = this.props;
    
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
      isSetProfile: true,  // true
      nickName: nickNameTemp,
      hobby: introduceTemp,
      profileImg: photoImageTemp,
      profileBgImg: bgImageTemp,
    }

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

    return (
      <>
        <div className="mypage_contents profile-edit-contents">
          <strong className="mypage_title">프로필 설정</strong>

          <Segment className="full">
              <div className="table-wrapper">
                  <Table>
                      <colgroup>
                          <col width='160px'/>
                          <col />
                      </colgroup>
                      <Table.Body>
                          <Table.Row>
                              <Table.Cell>이름</Table.Cell>
                              <Table.Cell>{skProfile.member.name}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                              <Table.Cell>소속</Table.Cell>
                              <Table.Cell>{skProfile.member.department}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                              <Table.Cell>닉네임</Table.Cell>
                              <Table.Cell>
                                  <Input 
                                    placeholder={`닉네임을 입력해주세요 (20자까지 입력 가능)`}
                                    onChange={(e) => this.handleNickNameChange(e)}
                                    value={changeNickName ? nickNameTemp : skProfile.nickName}
                                  />
                              </Table.Cell>
                          </Table.Row>
                          <Table.Row>
                              <Table.Cell>자기소개</Table.Cell>
                              <Table.Cell>
                                  <TextArea 
                                    placeholder={`자기소개 키워드는 쉼표( , )로 구분합니다. (45자까지 입력 가능)\n사용자 화면에서는 키워드 앞에 해시태그( # )와 함께 보여집니다.`}
                                    onChange={(e) => this.handleIntroduceChange(e)}
                                    value={changeIntroduce ? introduceTemp : skProfile.introduce}
                                  />
                              </Table.Cell>
                          </Table.Row>
                          <Table.Row className="bttn-line">
                              <Table.Cell>프로필 이미지</Table.Cell>
                              <Table.Cell>
                                  <div className="ui w624 input">
                                      <label htmlFor="fileup01" className="ui button line02">파일 첨부</label>
                                      <input 
                                        type="file" 
                                        id="fileup01"
                                        className="fileup-bttn"
                                        onChange={(e) => { 
                                          this.onChangeFile("photoImageFile", e)
                                        }}
                                      />
                                      <input type="text" readOnly value={photoImageFile?.name || ''} className="fileupload-area"/>
                                  </div>
                              </Table.Cell>
                          </Table.Row>
                          <Table.Row className="bttn-line">
                              <Table.Cell>배경 이미지</Table.Cell>
                              <Table.Cell>
                                  <div className="ui w624 input">
                                      <label htmlFor="fileup02" className="ui button line02">파일 첨부</label>
                                      <input 
                                        type="file" 
                                        id="fileup02"
                                        className="fileup-bttn"
                                        onChange={(e) => { 
                                          this.onChangeFile("bgImageFile", e)
                                        }}
                                      />
                                      <input type="text" readOnly value={bgImageFile?.name || ''} className="fileupload-area" />
                                  </div>
                              </Table.Cell>
                          </Table.Row>
                      </Table.Body>
                  </Table>                        
              </div>
          </Segment>
          <div className="mypage-edit-bottom">
              <span><strong>미리보기</strong> 버튼으로 내 프로필이 다른 사람에게 어떻게 보여지는지 확인해 보세요.</span>
              <div className="bttn-area">
                  <Button 
                    className="fix line"
                    onClick={() => this.handleModalPrivew(true)}
                  >
                    미리보기
                  </Button>
                  <Button 
                    className="fix bg"
                    onClick={this.handleSave}
                  >
                    저장
                  </Button>
              </div>
          </div>
          {/* photoImageBase64 || skProfile.photoFilePath || DefaultImg */}
          <CommunityProfileModalPreview
            open={profilePreview}
            setOpen={(e) => 
              this.setState({
                profilePreview: e
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
