import React from 'react';
import { mobxHelper, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import { Button, Checkbox, Form, Icon, Image, Radio, Select } from 'semantic-ui-react';
import { IconType, IdName } from 'shared';
import {fileUtil, ImageBox, PatronType, ValidationType} from '@nara.drama/depot';
import { boundMethod } from 'autobind-decorator';
import { PersonalCubeModel, PersonalCubeService } from 'personalcube/personalcube';
import { CollegeService, SubsidiaryService } from 'college';
import classNames from 'classnames';
import SelectType from '../../../../shared/model/SelectType';

interface Props {
  onChangePersonalCubeProps: (name: string, value: string | {}) => void
  personalCube: PersonalCubeModel
  tags: string
  personalCubeService?: PersonalCubeService
  subsidiaryService?: SubsidiaryService
  collegeService?: CollegeService
}

interface States {
  subsidiariesAll: string
  focus: boolean
  write: string
  fieldName: string
}

const EXTENSION = {
  IMAGE: 'jpg|png|jpeg',
};

@inject(mobxHelper.injectFrom(
  'personalCube.personalCubeService',
  'college.subsidiaryService',
  'college.collegeService'
))
@observer
@reactAutobind
class CreateExposureInfoContainer extends React.Component<Props, States> {

  private fileInputRef = React.createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);
    this.state = {
      subsidiariesAll: 'No',
      focus: false,
      write: '',
      fieldName: '',
    };
  }

  componentDidMount() {
    //
    const { subsidiaryService, collegeService } = this.props;
    if (subsidiaryService) subsidiaryService.findAllsubsidiarys();
    if (collegeService) collegeService.findAllColleges();

  }

  checkOne(checkedTargetJSON: string, name: string) {
    //
    const { onChangePersonalCubeProps } = this.props;
    const { personalCube } = this.props.personalCubeService || {} as PersonalCubeService;
    const checkedTargetIdName = JSON.parse(checkedTargetJSON);
    const checkedTargetId = checkedTargetIdName.id;

    const tempIdList: string[] = [];
    let tempIdNameList: IdName[] = [];
    if (name === 'subsidiaries' && personalCube.subsidiaries) {
      tempIdNameList = [ ...personalCube.subsidiaries ];
      tempIdNameList.map((subsidiary: any) => tempIdList.push(subsidiary.id));

    }
    if (tempIdList.indexOf(checkedTargetId) !== -1) {
      const newTempSubsidiaryList = this.removeSomethingInList(tempIdList.indexOf(checkedTargetId), tempIdNameList);
      onChangePersonalCubeProps(name, newTempSubsidiaryList);

    } else {
      tempIdNameList.push(checkedTargetIdName);
      onChangePersonalCubeProps(name, tempIdNameList);
    }
  }

  checkAll(isChecked: string, name: string) {
    //
    const { subsidiaries } = this.props.subsidiaryService || {} as SubsidiaryService;
    const { onChangePersonalCubeProps } = this.props;
    const allList: IdName[] = [];
    if (isChecked === 'Yes') {
      onChangePersonalCubeProps(name, allList);
      if (name === 'subsidiaries') {
        onChangePersonalCubeProps('requiredSubsidiaries', allList);
        this.setState({ subsidiariesAll: 'No' });
      }

    } else {
      subsidiaries.map(subsidiary => {
        allList.push(subsidiary.subsidiary);
      });
      onChangePersonalCubeProps(name, allList);
      if (name === 'subsidiaries') {
        onChangePersonalCubeProps('requiredSubsidiaries', allList);
        this.setState({ subsidiariesAll: 'Yes' });
      }
    }
  }

  removeSomethingInList(index: number, oldList: IdName[]) {
    //
    return oldList.slice(0, index).concat(oldList.slice(index + 1));
  }

  public uploadFile(file: File) {
    //
    if (!file || (file instanceof File && !this.validatedAll(file))) {
      return;
    }
    const { personalCubeService } = this.props;

    if (personalCubeService && file) {
      personalCubeService.changeFileName(file.name);
      const fileReader = new FileReader();

      fileReader.onload = (e: any) => {     //event = on_file_select
        const data = e.target.result;
        personalCubeService.changeCubeProps('iconBox.baseUrl', data);
      };
      fileReader.readAsDataURL(file);
    }
  }

  public deleteFile() {
    const { personalCubeService } = this.props;

    if (personalCubeService) {
      personalCubeService.changeCubeProps('iconBox.baseUrl', '');
    }
  }

  validatedAll(file: File) {
    const validations = [{ type: 'Extension', validValue: EXTENSION.IMAGE }, { type: ValidationType.MaxSize }] as any[];
    const hasNonPass = validations.some(validation => {
      if (validation.validator && typeof validation.validator === 'function') {
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


  @boundMethod
  handleSKIconSelect(tinyAlbumId: string, selectedImageId: string, tinyImage?: string) {
    //
    const { personalCubeService } = this.props;
    if (personalCubeService) {
      personalCubeService.changeCubeProps('iconBox.baseUrl', 'data:image/png;base64,' + tinyImage);
      personalCubeService.changeCubeProps('iconBox.iconUrl', selectedImageId);
    }
  }

  render() {
    const { onChangePersonalCubeProps, personalCube } = this.props;
    const { subsidiaries } = this.props.subsidiaryService || {} as SubsidiaryService;
    //const { tinyAlbumId, changeTinyAlbumId } = this.props.personalCubeService || {} as PersonalCubeService;
    const { colleges } = this.props.collegeService || {} as CollegeService;
    const { subsidiariesAll } = this.state;
    const subsidiaryIdList: string[] = [];
    const requiredSubsidiaryIdList: string[] = [];
    const collegeList: any = [];

    colleges.map((data, index) => {
        collegeList.push({ key: index, value: data.collegeId, text: data.name });
      }
    );
    if (personalCube && personalCube.subsidiaries) personalCube.subsidiaries.map(subsidiary => subsidiaryIdList.push(subsidiary.id));
    if (personalCube && personalCube.requiredSubsidiaries) {
      personalCube.requiredSubsidiaries.map(requiredSubsidiary =>
        requiredSubsidiaryIdList.push(requiredSubsidiary.id));
    }

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
            checked={personalCube && personalCube.iconBox && personalCube.iconBox.iconType === IconType.SKUniversity}
            onChange={(e: any, data: any) => onChangePersonalCubeProps('iconBox.iconType', data.value)}
          />
          <Radio
            className="base"
            label="아이콘 직접 등록"
            name="radioGroup"
            value={IconType.Personal}
            checked={personalCube && personalCube.iconBox && personalCube.iconBox.iconType === IconType.Personal}
            onChange={(e: any, data: any) => onChangePersonalCubeProps('iconBox.iconType', data.value)}
          />
          {
            personalCube && personalCube.iconBox && personalCube.iconBox.iconType === IconType.SKUniversity
            && (
              <div className="round-wrap filebox-icon">
                <div className="filter">
                  <Select
                    placeholder="선택하세요"
                    className="ui small-border dropdown"
                    options={SelectType.colleges}
                    value={personalCube.iconBox.iconUrl.substring(0, 2) || ''}
                    onChange={(e: any, data: any) => {
                      onChangePersonalCubeProps('iconBox.iconUrl', data.value);
                    }}
                  />
                </div>
                <div className="h220">
                  {
                    personalCube && personalCube.iconBox && personalCube.iconBox.iconUrl  ?
                      <ImageBox
                        id={personalCube.iconBox.iconUrl.substring(0, 2) || ''}
                        options={{ title: 'sk Icon', needTinyImage: true, width: '60px', height: '60px', selectable: true }}
                        defaultSelectId={personalCube && personalCube.iconBox && personalCube.iconBox.iconUrl || ''}
                        customSelector={(selectedId: string, imageId: string) => (<Radio checked={selectedId === imageId} />)}
                        onSelect={this.handleSKIconSelect}
                        vaultKey={{ keyString: 'sku-depot', patronType: PatronType.Pavilion }}
                        patronKey={{ keyString: 'sku-denizen', patronType: PatronType.Denizen }}
                      /> : null
                  }
                </div>
              </div>
            ) || null
          }
          {
            personalCube && personalCube.iconBox && personalCube.iconBox.iconType === IconType.Personal
            && (
              <div className="round-wrap2">
                <div className="top img">
                  {/* 직접등록후, 등록전에는 비어있으면됨 */}
                  <Image src={personalCube && personalCube.iconBox && personalCube.iconBox.baseUrl} />
                  {
                    personalCube && personalCube.iconBox && personalCube.iconBox.baseUrl
                    && (
                      <Button onClick={this.deleteFile}>
                        <Icon className="clear" />
                        <span className="blind">delete</span>
                      </Button>
                    )
                  }
                  {/* // 직접등록후, 등록전에는 비어있으면됨 */}
                </div>
                <div className="bottom">
                  <span className="text1">
                    <Icon className="info16" />
                    <span className="blind">infomation</span>
                    JPG, PNG 파일을 등록하실 수 있습니다. / 최대 500Kbyte 용량의 파일을 등록하실 수 있습니다. / Icon의 경우 60x60px의 사이즈를 추천합니다.
                  </span>
                  <div className="right-btn">
                    <div className="ui input file2">
                      <label
                        // htmlFor="hidden-new-file2"
                        className="ui button"
                        onClick={() => {
                          if (this.fileInputRef && this.fileInputRef.current) {
                            this.fileInputRef.current.click();
                          }
                        }}
                      >파일찾기
                      </label>
                      <input
                        type="file"
                        //name={fileName}
                        id="hidden-new-file2"
                        ref={this.fileInputRef}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.files && this.uploadFile(e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) || ''
          }
        </Form.Field>

        <Form.Field>
          <label className="necessary">관계사 공개 범위 설정</label>
          <div className="round-wrap">
            <div className="filter">
              <Checkbox
                className="black"
                label="전체"
                value={subsidiariesAll}
                onChange={(e: any, data: any) => this.checkAll(data.value, 'subsidiaries')}
              />
            </div>
            <div className="h112">
              <ul>
                {
                  subsidiaries && subsidiaries.length
                  && subsidiaries.map((subsidiary, index) => (
                    <li key ={index}>
                      <Checkbox
                        className="base"
                        key={index}
                        label={subsidiary && subsidiary.subsidiary && subsidiary.subsidiary.name || ''}
                        value={subsidiary && subsidiary.subsidiary && JSON.stringify(subsidiary.subsidiary)}
                        checked={
                          subsidiaryIdList.indexOf(subsidiary.subsidiary.id) !== -1
                        }
                        onChange={(e: any, data: any) => this.checkOne(data.value, 'subsidiaries')}
                      />
                    </li>
                  )) || null
                }

              </ul>
            </div>
          </div>
        </Form.Field>
        <Form.Field>
          <label>Tag 정보 </label>
          <div className={classNames('ui right-top-count input', { focus: this.state.focus, write: this.state.write, error: this.state.fieldName === 'tags' })}>{/* .error class 추가시 error ui 활성 */}
            <input
              type="text"
              value={personalCube && personalCube.tags || ''}
              onClick={() => this.setState({ focus: true })}
              onBlur={() => this.setState({ focus: false })}
              onChange={(e: any) => {
                if (personalCube.tags.length > 10 ) {
                  this.setState({ fieldName: 'tags' });
                } else {
                  this.setState({ write: e.target.value, fieldName: '' });
                  onChangePersonalCubeProps('tags', e.target.value);
                }
              }}
              onKeyDownCapture={(e: any) => {
                if (personalCube.tags.length > 10 && e.key === 'Backspace') {
                  onChangePersonalCubeProps('tags', e.target.value.toString().slice(0, e.target.value.lastIndexOf(',')));
                }
              }}
              placeholder="Tag와 Tag는 쉼표(“,”)로 구분하며, 최대 10개까지 입력하실 수 있습니다."
            />
            <Icon className="clear link"
                  onClick={(e: any) => {
                    this.setState({ write: '' });
                    onChangePersonalCubeProps('tags', '');
                  }}
            />
            <span className="validation">You can enter up to 10 tags.</span>
          </div>
        </Form.Field>

      </>
    );
  }
}
export default CreateExposureInfoContainer;
