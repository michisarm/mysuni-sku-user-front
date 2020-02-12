
import React from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { Button, Checkbox, Form, Icon, Image, Radio, Select } from 'semantic-ui-react';
import { fileUtil, ImageBox, PatronType, ValidationType } from '@nara.drama/depot';
import { IdName, IconType } from 'shared/model';
import { SubsidiaryService } from 'college/stores';
import { PersonalCubeModel } from 'personalcube/personalcube/model';
import SelectOptions from '../../model/SelectOptions';
import CreateInput from '../shared/CreateInput';


interface Props {
  subsidiaryService?: SubsidiaryService
  personalCube: PersonalCubeModel
  targetSubsidiaryId: string
  onChangePersonalCubeProps: (name: string, value: string | {}) => void
}

interface State {
  subsidiariesAllChecked: boolean
}

@inject(mobxHelper.injectFrom(
  'college.subsidiaryService',
))
@observer
@reactAutobind
class ExposureInfoFormContainer extends React.Component<Props, State> {
  //
  VALID_ICON_EXTENSION = 'jpg|jpeg|png';

  fileInputRef = React.createRef<HTMLInputElement>();

  state = {
    subsidiariesAllChecked: false,
  };


  componentDidMount() {
    //
    this.findSubsidiaries();
  }

  componentDidUpdate(prevProps: Props) {
    //
    const prevTargetSubsidiaryId = prevProps.targetSubsidiaryId;
    const targetSubsidiaryId = this.props.targetSubsidiaryId;

    if (prevTargetSubsidiaryId !== targetSubsidiaryId) {
      this.findSubsidiaries();
    }
  }

  async findSubsidiaries() {
    //
    const subsidiaryService = this.props.subsidiaryService!;
    const { targetSubsidiaryId, onChangePersonalCubeProps } = this.props;

    if (targetSubsidiaryId) {
      this.setState({ subsidiariesAllChecked: false });
      const subsidiaries = await subsidiaryService.findSubsidiariesByCompany();

      const nextSubsidiaries = subsidiaries.map(subsidiary => subsidiary.subsidiary);
      onChangePersonalCubeProps('subsidiaries', nextSubsidiaries);
    }
    else {
      subsidiaryService.findAllSubsidiaries();
      onChangePersonalCubeProps('subsidiaries', []);
    }
  }

  setIconFile(file: File) {
    //
    if (!file || (file instanceof File && !this.validatedAll(file))) {
      return;
    }
    const { onChangePersonalCubeProps } = this.props;
    const fileReader = new FileReader();

    fileReader.onload = (e: any) => {
      onChangePersonalCubeProps('iconBox.baseUrl', e.target.result);
    };
    fileReader.readAsDataURL(file);
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
      }
      else {
        if (!validation.type || !validation.validValue) {
          return false;
        }
        return !fileUtil.validate(file, validation.type, validation.validValue);
      }
    });

    return !hasNonPass;
  }

  onDetachIcon() {
    //
    this.props.onChangePersonalCubeProps('iconBox.baseUrl', '');
  }

  onChangeIconType(e: any, data: any) {
    //
    this.props.onChangePersonalCubeProps('iconBox.iconType', data.value);
  }

  onChangeIconUrl(e: any, data: any) {
    //
    this.props.onChangePersonalCubeProps('iconBox.iconUrl', data.value);
  }

  onSelectDefaultIcon(tinyAlbumId: string, selectedImageId: string, tinyImage?: string) {
    //
    const { onChangePersonalCubeProps } = this.props;

    onChangePersonalCubeProps('iconBox.baseUrl', 'data:image/png;base64,' + tinyImage);
    onChangePersonalCubeProps('iconBox.iconUrl', selectedImageId);
  }

  onClickSelectFile() {
    //
    if (this.fileInputRef.current) {
      this.fileInputRef.current.click();
    }
  }

  onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    //
    if (e.target.files) {
      this.setIconFile(e.target.files[0]);
    }
  }

  onCheckAllSubsidiaries(e: any, { checked }: any) {
    //
    const { subsidiaries } = this.props.subsidiaryService!;
    const { onChangePersonalCubeProps } = this.props;
    let nextSubsidiaries: IdName[] = [];

    if (checked) {
      nextSubsidiaries = subsidiaries.map(subsidiary => subsidiary.subsidiary);
    }

    onChangePersonalCubeProps('subsidiaries', nextSubsidiaries);
    this.setState({ subsidiariesAllChecked: checked });
  }

  onCheckSubsidiary(e: any, { checked, subsidiary }: any) {
    //
    const { personalCube, onChangePersonalCubeProps } = this.props;

    if (checked) {
      const nextSubsidiaries = personalCube.subsidiaries.concat(subsidiary);
      onChangePersonalCubeProps('subsidiaries', nextSubsidiaries);
    }
    else {
      const nextSubsidiaries = personalCube.subsidiaries.filter((prevSubsidiary) => prevSubsidiary.id !== subsidiary.id);
      onChangePersonalCubeProps('subsidiaries', nextSubsidiaries);
    }
  }

  onChangeTags(e: any, data: any) {
    //
    this.props.onChangePersonalCubeProps('tags', data.value);
  }

  render() {
    //
    const { personalCube, targetSubsidiaryId } = this.props;
    const { subsidiaries } = this.props.subsidiaryService!;
    const { subsidiariesAllChecked } = this.state;
    const subsidiaryTargeted = !!targetSubsidiaryId;

    return (
      <>
        <hr className="dividing" />
        <div className="section-tit">
          <span className="text1">노출 정보</span>
        </div>

        <Form.Field>
          <label className="necessary">아이콘 선택</label>
          <Radio
            className="base"
            name="radioGroup"
            label="mySUNI Icon Set"
            value={IconType.SKUniversity}
            checked={personalCube.iconBox.iconType === IconType.SKUniversity}
            onChange={this.onChangeIconType}
          />
          <Radio
            className="base"
            name="radioGroup"
            label="아이콘 직접 등록"
            value={IconType.Personal}
            checked={personalCube.iconBox.iconType === IconType.Personal}
            onChange={this.onChangeIconType}
          />
          { personalCube.iconBox.iconType === IconType.SKUniversity && (
            <div className="round-wrap filebox-icon">
              <div className="filter">
                <Select
                  className="small-border"
                  placeholder="선택하세요"
                  options={SelectOptions.colleges}
                  value={personalCube.iconBox.iconUrl && personalCube.iconBox.iconUrl.substring(0, 2) || ''}
                  onChange={this.onChangeIconUrl}
                />
              </div>
              <div className="h220">
                { personalCube.iconBox.iconUrl && (
                  <ImageBox
                    id={personalCube.iconBox.iconUrl.substring(0, 2) || ''}
                    defaultSelectId={personalCube.iconBox.iconUrl || ''}
                    options={{ title: 'sk Icon', needTinyImage: true, width: '60px', height: '60px', selectable: true }}
                    vaultKey={{ keyString: 'sku-depot', patronType: PatronType.Pavilion }}
                    patronKey={{ keyString: 'sku-denizen', patronType: PatronType.Denizen }}
                    customSelector={(selectedId: string, imageId: string) => (<Radio checked={selectedId === imageId} />)}
                    onSelect={this.onSelectDefaultIcon}
                  />
                )}
              </div>
            </div>
          )}
          { personalCube.iconBox.iconType === IconType.Personal && (
            <div className="round-wrap2">
              <div className="top img">
                <Image src={personalCube.iconBox.baseUrl} />

                { personalCube.iconBox.baseUrl && (
                  <Button onClick={this.onDetachIcon}>
                    <Icon className="clear" />
                    <span className="blind">delete</span>
                  </Button>
                )}
              </div>
              <div className="bottom">
                <span className="text1">
                  <Icon className="info16" />
                  <span className="blind">infomation</span>
                  JPG, PNG 파일을 등록하실 수 있습니다. / 최대 500Kbyte 용량의 파일을 등록하실 수 있습니다. / Icon의 경우 60x60px의 사이즈를 추천합니다.
                </span>
                <div className="right-btn">
                  <div className="ui input file2">
                    <Button
                      // htmlFor="hidden-new-file2"
                      as="label"
                      onClick={this.onClickSelectFile}
                    >
                      파일찾기
                    </Button>
                    <input
                      ref={this.fileInputRef}
                      id="hidden-new-file2"
                      type="file"
                      //name={fileName}
                      onChange={this.onChangeFile}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Form.Field>

        <Form.Field>
          <label className="necessary">관계사 공개 범위 설정</label>
          <div className="round-wrap">
            { !subsidiaryTargeted && (
              <div className="filter">
                <Checkbox
                  className="black"
                  label="전체"
                  readOnly={subsidiaryTargeted}
                  checked={subsidiariesAllChecked}
                  onChange={this.onCheckAllSubsidiaries}
                />
              </div>
            )}
            <div className="h112">
              <ul>
                { subsidiaries.map((subsidiary, index) => (
                  <li key ={index}>
                    <Checkbox
                      key={index}
                      className="base"
                      label={subsidiary.subsidiary && subsidiary.subsidiary.name || ''}
                      subsidiary={subsidiary.subsidiary}
                      value={subsidiary.subsidiary && JSON.stringify(subsidiary.subsidiary)}
                      disabled={subsidiaryTargeted}
                      checked={personalCube.subsidiaries.some((cubeSubsidiary) => cubeSubsidiary.id === subsidiary.subsidiary.id)}
                      onChange={this.onCheckSubsidiary}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Form.Field>

        <Form.Field>
          <CreateInput
            label="Tag 정보"
            placeholder="Tag와 Tag는 쉼표(“,”)로 구분합니다."
            asList
            value={personalCube.tags}
            onChange={this.onChangeTags}
          />
        </Form.Field>
      </>
    );
  }
}
export default ExposureInfoFormContainer;
