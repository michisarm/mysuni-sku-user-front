import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { fileUtil, ValidationType } from '@nara.drama/depot';
import SkProfileService from '../../../profile/present/logic/SkProfileService';
import Image from '../../../shared/components/Image';
import { uploadFileProfile } from '../../../shared/api/imageApi';
import { PolyglotText } from '../../../shared/ui/logic/PolyglotText';

interface Props {
  skProfileService?: SkProfileService;
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen';
  name: string;
  company: string;
  department: string;
  trigger: React.ReactNode;
}

interface States {
  open: boolean;
  photoTypeTemp: string;
  photoImageTemp: string;
  imageFile?: File;
}
/* eslint-disable */
@inject(mobxHelper.injectFrom('profile.skProfileService'))
@observer
@reactAutobind
class ProfilPhotoChangeModal extends Component<Props, States> {
  VALID_ICON_EXTENSION: string = 'jpg|jpeg|png';

  state: States = {
    open: false,
    photoTypeTemp: '1',
    photoImageTemp: '',
  };

  onOpen() {
    //
    //초기 상태는 skprofile 조회 내용을 그대로 보여주기 위해 이전 설정을 초기화
    this.setState({ open: true, photoTypeTemp: '1', photoImageTemp: '' });
  }

  onClose() {
    //
    this.setState({ open: false });
  }

  async onConfirm() {
    //
    const { photoTypeTemp, imageFile } = this.state;
    const { skProfileService } = this.props;
    const { skProfile } = skProfileService!;

    if (imageFile !== undefined) {
      const imagePath = await uploadFileProfile(imageFile);
      skProfileService!.setProfileProp('photoImage', imagePath || '');
    }

    if (photoTypeTemp) {
      skProfileService!.setProfileProp('photoType', photoTypeTemp);
    }

    skProfileService!.modifyPhotoImageByProfileId(
      skProfile.id,
      '',
      // skProfile.photoType,
      skProfile.photoImage
    );

    this.onClose();
  }

  validatedAll(file: File) {
    //
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

  setProfileImageFile(file: File) {
    //
    if (!file || (file instanceof File && !this.validatedAll(file))) {
      return;
    }

    this.setState({
      ...this.state,
      imageFile: file,
    });

    const fileReader = new FileReader();

    fileReader.onload = (e: any) => {
      this.setState({ photoImageTemp: e.target.result });
    };

    fileReader.readAsDataURL(file);
  }

  onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    //
    if (e.target.files) {
      this.setProfileImageFile(e.target.files[0]);
    }
  }

  render() {
    const { name, company, department, size, trigger, skProfileService } =
      this.props;
    const { skProfile } = skProfileService!;

    /**
     * photoTypeTemp, photoImageTemp 는 사용자가 confirm 버튼을 누르기 전까지 변경한 photoType, photoImage 변경상태을 저장하고 있다가
     * 사용자가 confirm 버튼을 누르면 시스템에 실제로 저장함.
     */
    const { open, photoImageTemp } = this.state;

    const photoFilePath = photoImageTemp || skProfile.photoFilePath;

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
        <Modal
          size={size}
          open={open}
          trigger={trigger}
          onOpen={this.onOpen}
          onClose={this.onClose}
          className="base w380"
        >
          <Modal.Header className="res">
            <PolyglotText
              id="mapg-프사팝-팝업명"
              defaultString="프로필 사진 변경"
            />
          </Modal.Header>
          <Modal.Content>
            <div className="profile-change">
              <div className="left">
                <div className="ui profile">
                  <div className="pic s110">
                    <Image
                      src={photoFilePath}
                      alt={photoFilePath ? 'userImg' : ''}
                      id="blah"
                    />
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="text01">{name}</div>
                <div className="text02">{company}</div>
                <div className="text02">{department}</div>
                <div className="upload">
                  <Form.Field></Form.Field>
                  <input
                    type="file"
                    id="profileImage"
                    onChange={this.onChangeFile}
                  />
                  <label
                    htmlFor="profileImage"
                    className="ui orange-arrow3 button"
                  >
                    <PolyglotText
                      id="mapg-프사팝-이미지업"
                      defaultString="Image upload"
                    />
                  </label>
                </div>
              </div>
            </div>
          </Modal.Content>
          <Modal.Actions className="actions2">
            <Button className="pop2 d" onClick={this.onClose}>
              <PolyglotText id="mapg-프사팝-취소버튼" defaultString="Cancel" />
            </Button>
            <Button className="pop2 p" onClick={this.onConfirm}>
              <PolyglotText id="mapg-프사팝-컨펌버튼" defaultString="Confirm" />
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default ProfilPhotoChangeModal;
