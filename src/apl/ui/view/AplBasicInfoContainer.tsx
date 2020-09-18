import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import AplMessageList from '../../present/logic/AplService';
import AplBasicInfoView from './AplBasicInfoView';
import { AplState } from '../../model/AplState';
import OpenedAplBasicInfoView from './OpenedAplBasicInfoView';

interface Props {
  onChangeAplProps: (
    name: string,
    value: string | number | {} | []
  ) => void;
  //menuMainModel: MenuMainModel
  aplId?: string;
  aplService?: AplMessageList;
  focusControlName?: string;
  onResetFocusControl?: () => void;
}

interface States {
  firstCategoryModalOpen: boolean;
  secondCategoryModalOpen: boolean;
}

@inject('aplService')
@observer
@reactAutobind
class AplBasicInfoContainer extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      firstCategoryModalOpen: false,
      secondCategoryModalOpen: false,
    };
  }

  componentDidMount() {
    //
    const { aplId, aplService } = this.props;
    const { apl } = this.props.aplService || ({} as AplMessageList);
    //if (AplMessageList && collegeService) {
    //if (!aplId) {
    //AplMessageList.clearMainCategory();
    //  AplMessageList.clearapl();
    // } else {
    //collegeService.findMainCollege(arrange.getMainCollegeId);
    //}
    //this.clearColleges();
    //this.findAllColleges();
    //}
  }

  onChangeAplPropsValid(name: string, value: string) {
    //
    const { aplService } = this.props;

    //const invalid = value.length > 30;
    //const invalid = Number(this.byteCheck(value)) > 30;
    const invalid = value.length > 30;

    if (invalid) {
      return;
    }

    if (aplService) aplService.changeAplProps(name, value);
  }

  /**
   * 바이트수 반환
   */
  byteCheck(value: string) {
    let codeByte = 0;
    for (let idx = 0; idx < value.length; idx++) {
      const oneChar = escape(value.charAt(idx));
      if (oneChar.length === 1) {
        codeByte++;
      } else if (oneChar.indexOf('%u') !== -1) {
        codeByte += 2;
      } else if (oneChar.indexOf('%') !== -1) {
        codeByte++;
      }
    }
    return codeByte;
  }

  getFileBoxIdForReference(fileBoxId: string) {
    //
    const { aplService } = this.props;
    const { apl } = aplService || ({} as AplMessageList);
    // if (AplMessageList && arrange.contents) AplMessageList.changeArrangeProps('contents.fileBoxId', fileBoxId);
  }

  render() {
    const { aplId, onChangeAplProps, aplService, focusControlName, onResetFocusControl } = this.props;
    const { apl } = this.props.aplService || ({} as AplMessageList);
    const { firstCategoryModalOpen, secondCategoryModalOpen } = this.state;
    if (
      apl.state !== AplState.Created &&
      apl.state !== null
    ) {
      return (
        <>
          <OpenedAplBasicInfoView
            //apl={apl}
            aplService={aplService}
          />
          <AplBasicInfoView
            onChangeAplProps={onChangeAplProps}
            onChangeAplPropsValid={this.onChangeAplPropsValid}
            apl={apl}
            //arrangeId={aplId}
            //state={apl.state}
            aplService={aplService}
            focusControlName={focusControlName}
            onResetFocusControl={onResetFocusControl}
          />
        </>
      );
    } else {
      return (
        <AplBasicInfoView
          onChangeAplProps={onChangeAplProps}
          onChangeAplPropsValid={this.onChangeAplPropsValid}
          apl={apl}
          //arrangeId={aplId}
          //state={apl.state}
          aplService={aplService}
          focusControlName={focusControlName}
          onResetFocusControl={onResetFocusControl}
        />
      );
    }
  }
}

export default AplBasicInfoContainer;
