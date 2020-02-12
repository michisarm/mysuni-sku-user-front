import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';
import { Button, Modal, Form, Radio } from 'semantic-ui-react';
import { fileUtil, ValidationType } from '@nara.drama/depot';
import SkProfileService from '../../../profile/present/logic/SkProfileService';


interface Props {
  skProfileService? : SkProfileService,
  size?: 'mini' | 'tiny' | 'small' | 'large' | 'fullscreen',
  name: string,
  company: string,
  department: string,
  trigger: React.ReactNode,
}

interface States {
  open : boolean
}

@inject(mobxHelper.injectFrom('profile.skProfileService'))
@observer
@reactAutobind
class ProfilPhotoChangeModal extends Component<Props, States> {

  VALID_ICON_EXTENSION: string = 'jpg|jpeg|png';

  state = {
    open: false,
  };

  onOpen() {
    //
    this.setState({ open: true });
  }

  onClose() {
    //
    this.setState({ open: false });
  }

  onConfirm() {
    //
    const { skProfileService } = this.props;
    const { skProfile } = skProfileService!;

    skProfileService!.modifyPhotoImageByProfileId(skProfile.id, skProfile.photoType, skProfile.photoImage);

    this.onClose();
  }

  validatedAll(file: File) {
    //
    const validations: any[] = [
      { type: 'Extension', validValue: this.VALID_ICON_EXTENSION },
      { type: ValidationType.MaxSize },
    ];

    const hasNonPass = validations.some(validation => {
      if ( typeof validation.validator === 'function' ) {
        return !validation.validator(file);
      } else {
        if (!validation.type || !validation.validValue ) {
          return false;
        }
        return !fileUtil.validate(file, validation.type, validation.validValue);
      }
    });

    return !hasNonPass;
  }

  setProfileImageFile(file: File)
  {
    //
    if (!file || (file instanceof File && !this.validatedAll(file))) {
      return;
    }

    const { skProfileService } = this.props;
    const fileReader = new FileReader();

    fileReader.onload = (e: any) =>
    {
      skProfileService!.setProfileProp('photoImage', e.target.result);
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
    const { name, company, department, size, trigger, skProfileService } = this.props;
    const { skProfile } = skProfileService!;
    const { member } = skProfile;
    const { open } = this.state;

    const protoType = skProfile!.photoType;
    let photoFilePath: string = '';

    //IM 시스템으로부터 인터페이스받은 사용자 증명사진 보여줌.
    if (protoType === '0')
    {
      photoFilePath = member && member.photoFilename && `${process.env.REACT_APP_SK_IM_PHOTO_ROOT_URL}/${member.companyCode.toLowerCase()}/${member.photoFilename}`;
    } else if (protoType === '1')
    {
      //depot 서비스의 파일 업로드 API이용해서 업로드 호출후 반환된 이미지 base64 문자열을 그대로 보여줌.(profile 재조회 안함.)
      photoFilePath = skProfile.photoImage; //base64Photo
    }

    // console.log('photoFilePath=', photoFilePath);

    return (
      <>
        <Modal size={size} open={open} trigger={trigger} onOpen={this.onOpen} onClose={this.onClose} className="base w380">

          <Modal.Header className="res">
            프로필 사진 변경
          </Modal.Header>
          <Modal.Content>
            <div className="profile-change">
              <div className="left">
                <div className="ui profile">
                  <div className="pic s110">
                    <img src={photoFilePath} alt="userImg" id="blah" />
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="text01">{name}</div>
                <div className="text02">{company}</div>
                <div className="text02">{department}</div>
                <div className="upload">
                  <Form.Field>
                    <Radio
                      className="base mr15px"
                      label="IM"
                      name="radioGroup"
                      value="0"
                      onChange={(e: any, data: any) => skProfileService!.setProfileProp('photoType', data.value )}
                      checked={skProfile!.photoType === '0'}
                    />
                    <Radio
                      className="base"
                      label="mySUNI"
                      name="radioGroup"
                      value="1"
                      onChange={(e: any, data: any) => skProfileService!.setProfileProp('photoType', data.value )}
                      checked={skProfile!.photoType === '1'}
                    />
                  </Form.Field>
                  {
                    skProfile!.photoType === '1' && (
                      <>
                        <input
                          type="file"
                          id="profileImage"
                          onChange={this.onChangeFile}
                        />
                        <label htmlFor="profileImage" className="ui orange-arrow3 button">Image
                        upload
                        </label>
                      </>
                    )
                  }
                </div>
              </div>
            </div>
          </Modal.Content>
          <Modal.Actions className="actions2">
            <Button className="pop2 d" onClick={this.onClose}>Cancel</Button>
            <Button className="pop2 p" onClick={this.onConfirm}>Confirm</Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default ProfilPhotoChangeModal;
