
import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { Accordion, Button, Checkbox, Icon, Modal } from 'semantic-ui-react';
import { IdName, CategoryModel } from 'shared';
import { CollegeService, CollegeModel, CollegeType, CollegeColors } from 'college';
import { ChannelModalContentWrapper } from '../view/DetailElementsView';


interface Props {
  collegeService?: CollegeService
  trigger: React.ReactNode
  defaultSelectedCategoryChannels: CategoryModel[]
  collegeType: CollegeType
  onConfirmCategoryChannels: (categoryChannels: CategoryModel[]) => void
}

interface State {
  open: boolean
  selectedCollege: IdName
  nextSelectedCategoryChannels: CategoryModel[]
}

@inject(mobxHelper.injectFrom('college.collegeService'))
@observer
@reactAutobind
class SubChannelModalContainer extends Component<Props, State> {
  //
  state = {
    open: false,
    selectedCollege: new IdName(),
    nextSelectedCategoryChannels: [],
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
  }

  findAllColleges() {
    //
    this.props.collegeService!.findAllColleges();
  }

  setSelectedCategoryChannels() {
    //
    const { defaultSelectedCategoryChannels } = this.props;

    this.setState({ nextSelectedCategoryChannels: [ ...defaultSelectedCategoryChannels]});
  }

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
    const { onConfirmCategoryChannels } = this.props;
    const { nextSelectedCategoryChannels } = this.state;

    onConfirmCategoryChannels(nextSelectedCategoryChannels);
    this.onClose();
  }

  onCancel() {
    //
    this.setSelectedCategoryChannels();
    this.onClose();
  }

  onReset() {
    this.setState({ nextSelectedCategoryChannels: []});
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
      let nextSelectedCategoryChannels = [...state.nextSelectedCategoryChannels];

      if (checked) {
        nextSelectedCategoryChannels.push(new CategoryModel({
          college: state.selectedCollege,
          channel,
        }),);
      }
      else {
        nextSelectedCategoryChannels = nextSelectedCategoryChannels.filter(categoryModel => categoryModel.channel.id !== channel.id);
      }

      return { nextSelectedCategoryChannels };
    });
  }

  onRemove(categoryChannel: CategoryModel) {
    //
    this.setState((state) => ({
      nextSelectedCategoryChannels: state.nextSelectedCategoryChannels.filter((categoryModel) =>
        categoryModel.channel.id !== categoryChannel.channel.id
      ),
    }));
  }

  render() {
    //
    const { collegeService, trigger, collegeType }: Props = this.props;
    const { open, selectedCollege, nextSelectedCategoryChannels }: State = this.state;
    const colleges = collegeService!.colleges;

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
                    <span className="text01 add">{nextSelectedCategoryChannels.length}</span>
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
                  { colleges.length > 0 && colleges.map((college, index) => (
                    <Accordion key={`college-${index}`} className="channel">
                      <Accordion.Title
                        active={college.collegeId === selectedCollege.id}
                        onClick={() => this.onClickCollege(college)}
                      >
                        <span className={`name ${CollegeColors[index]}`}>{college.name}</span>
                        <Icon />
                      </Accordion.Title>
                      <Accordion.Content active={college.collegeId === selectedCollege.id}>
                        <ul>
                          { college.channels.map((channel, idx) => (
                            <li key={`channel-${idx}`}>
                              <Checkbox
                                className="base"
                                label={channel.name}
                                disabled={college.collegeType !== collegeType}
                                checked={
                                  nextSelectedCategoryChannels
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
                    {nextSelectedCategoryChannels.map((categoryChannel, index) => (
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
