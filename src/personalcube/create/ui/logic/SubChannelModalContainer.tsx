import React, { Component } from 'react';
import { mobxHelper, reactAlert, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import { Accordion, Button, Checkbox, Icon, Modal } from 'semantic-ui-react';
import { CategoryModel, IdName } from 'shared';
import { CollegeColors, CollegeModel, CollegeType } from 'college/model';
import { CollegeService } from 'college/stores';
import { ChannelModalContentWrapper } from '../view/DetailElementsView';


interface Props {
  collegeService?: CollegeService
  trigger: React.ReactNode
  defaultSelectedCategoryChannels: CategoryModel[]
  collegeType?: CollegeType
  targetCollegeId?: string
  onConfirmCategoryChannels: (categoryChannels: CategoryModel[]) => void
}

interface State {
  open: boolean
  selectedCollege: IdName
  selectedCategoryChannels: CategoryModel[]
}

@inject(mobxHelper.injectFrom('college.collegeService'))
@observer
@reactAutobind
class SubChannelModalContainer extends Component<Props, State> {
  //
  state = {
    open: false,
    selectedCollege: new IdName(),
    selectedCategoryChannels: [],
  };


  componentDidMount(): void {
    //
    this.findAllColleges();
    this.setSelectedCategoryChannels();
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>): void {
    //
    const { defaultSelectedCategoryChannels: prevSelectedCategoryChannels } = prevProps;
    const { defaultSelectedCategoryChannels } = this.props;

    if (prevSelectedCategoryChannels !== defaultSelectedCategoryChannels) {
      this.setSelectedCategoryChannels();
    }

    const { targetCollegeId: prevTargetCollegeId } = prevProps;
    const { targetCollegeId, collegeType } = this.props;

    if (prevTargetCollegeId !== targetCollegeId && collegeType) {
      this.setSelectedCollege();
    }
  }

  findAllColleges() {
    //
    this.props.collegeService!.findAllColleges();
  }

  setSelectedCategoryChannels() {
    //
    const { defaultSelectedCategoryChannels } = this.props;

    this.setState({ selectedCategoryChannels: [ ...defaultSelectedCategoryChannels]});
  }

  setSelectedCollege() {
    //
    const { collegeService, targetCollegeId } = this.props;
    const { colleges } = collegeService!;

    const college = colleges.find(college => college.collegeId === targetCollegeId);

    if (college) {
      this.setState({ selectedCollege: college.toIdName() });
    }
  }

  getTargetColleges() {
    //
    const { colleges } = this.props.collegeService!;
    const { targetCollegeId, collegeType } = this.props;

    if (collegeType && collegeType === CollegeType.Company) {
      const college = colleges.find(college => college.collegeId === targetCollegeId);

      if (college) {
        return [college];
      }
    }
    return colleges.filter(college => college.collegeType === CollegeType.University);
  }

  isActiveCollege(college: CollegeModel) {
    //
    const { collegeType } = this.props;
    const { selectedCollege } = this.state;

    return collegeType === CollegeType.Company ? true :  college.collegeId === selectedCollege.id;
  }

  onOpen() {
    //
    const { collegeType, targetCollegeId } = this.props;

    if (!collegeType || !targetCollegeId) {
      reactAlert({
        title: '메인채널 선택',
        message: '서브채널을 선택하기 전에 메인채널을 먼저 선택해 주세요.',
      });
    }
    else {
      this.setState({ open: true });
    }
  }

  onClose() {
    //
    this.setState({ open: false });
  }

  onConfirm() {
    //
    const { onConfirmCategoryChannels } = this.props;
    const { selectedCategoryChannels } = this.state;

    onConfirmCategoryChannels(selectedCategoryChannels);
    this.onClose();
  }

  onCancel() {
    //
    this.setSelectedCategoryChannels();
    this.onClose();
  }

  onReset() {
    this.setState({ selectedCategoryChannels: []});
  }

  onClickCollege(currentSelectedCollege: CollegeModel) {
    //
    const { selectedCollege } = this.state;
    let nextSelectedCollege;

    if (currentSelectedCollege.collegeId === selectedCollege.id) {
      nextSelectedCollege = new IdName();
    }
    else {
      nextSelectedCollege = currentSelectedCollege.toIdName();
    }

    this.setState({
      selectedCollege: nextSelectedCollege,
    });
  }

  onClickChannel(e: any, { checked }: any, channel: IdName) {
    //
    this.setState((state) => {
      //
      let selectedCategoryChannels = [...state.selectedCategoryChannels];

      if (checked) {
        selectedCategoryChannels.push(new CategoryModel({
          college: state.selectedCollege,
          channel,
        }),);
      }
      else {
        selectedCategoryChannels = selectedCategoryChannels.filter(categoryModel => categoryModel.channel.id !== channel.id);
      }

      return { selectedCategoryChannels };
    });
  }

  onRemove(categoryChannel: CategoryModel) {
    //
    this.setState((state) => ({
      selectedCategoryChannels: state.selectedCategoryChannels.filter((categoryModel) =>
        categoryModel.channel.id !== categoryChannel.channel.id
      ),
    }));
  }

  render() {
    //
    const { trigger, collegeType }: Props = this.props;
    const { open, selectedCategoryChannels }: State = this.state;
    const targetColleges = this.getTargetColleges();

    return (
      <Modal className="base w1000" open={open} trigger={trigger} onOpen={this.onOpen} onClose={this.onClose}>
        <Modal.Header className="res">
          서브채널 선택
          <span className="sub f12">서브채널을 선택해주세요.</span>
        </Modal.Header>
        <Modal.Content>
          <ChannelModalContentWrapper
            header={
              <>
                <div className="cell v-middle">
                  <span className="text01">Channel list</span>
                </div>
                <div className="cell v-middle">
                  <span className="text01">Selected</span>
                  <span className="count">
                    <span className="text01 add">{selectedCategoryChannels.length}</span>
                    <span className="text02"> / 80</span>
                  </span>
                  <div className="right">
                    <button className="clear" onClick={this.onReset}>
                      <Icon className="reset" /><span className="blind">reset</span>
                    </button>
                  </div>
                </div>
              </>
            }
          >
            <div className="cell vtop">
              <div className="select-area">
                <div className="scrolling-60vh">
                  { targetColleges.map((college, index) => (
                    <Accordion key={`college-${index}`} className="channel">
                      <Accordion.Title
                        active={this.isActiveCollege(college)}
                        onClick={() => this.onClickCollege(college)}
                      >
                        <span className={`name ${CollegeColors[index]}`}>{college.name}</span>
                        { collegeType === CollegeType.University && <Icon />}
                      </Accordion.Title>
                      <Accordion.Content active={this.isActiveCollege(college)}>
                        <ul>
                          { college.channels.map((channel, idx) => (
                            <li key={`channel-${idx}`}>
                              <Checkbox
                                className="base"
                                label={channel.name}
                                checked={
                                  selectedCategoryChannels
                                    .map((categoryChannel => categoryChannel.channel.id))
                                    .includes(channel.id)
                                }
                                onChange={(e, data) => this.onClickChannel(e, data, channel)}
                              />
                            </li>
                          ))}
                        </ul>
                      </Accordion.Content>
                    </Accordion>
                  ))}
                </div>
              </div>
            </div>
            <div className="cell vtop">
              <div className="select-area">
                <div className="scrolling-60vh">
                  <div className="select-item">
                    {selectedCategoryChannels.map((categoryChannel, index) => (
                      <Button key={`category-channel-${index}`} className="del" onClick={() => this.onRemove(categoryChannel)}>
                        {categoryChannel.college.name} &gt; {categoryChannel.channel.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ChannelModalContentWrapper>
        </Modal.Content>
        <Modal.Actions>
          <Button type="button" className="w190 pop d" onClick={this.onCancel}>Cancel</Button>
          <Button type="button" className="w190 pop p" onClick={this.onConfirm}>OK</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default SubChannelModalContainer;
