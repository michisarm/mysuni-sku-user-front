import React, { Component } from 'react';
import { mobxHelper, reactAlert, reactAutobind } from '@nara.platform/accent';
import { inject, observer } from 'mobx-react';

import { Accordion, Button, Checkbox, Icon, Modal } from 'semantic-ui-react';
import { CategoryModel, IdName } from 'shared/model';
import { CollegeColors, CollegeModel, CollegeType } from 'college/model';
import { CollegeService } from 'college/stores';
import { ChannelModalContentWrapper } from '../view/DetailElementsView';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import {
  parsePolyglotString,
  PolyglotString,
} from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../../lecture/model/LangSupport';
import { compareCollgeCineroom } from '../../../../shared/service/useCollege/useRequestCollege';

interface Props {
  collegeService?: CollegeService;
  trigger: React.ReactNode;
  defaultSelectedCategoryChannels: CategoryModel[];
  isMysuniCollege: boolean;
  targetCollegeId?: string;
  onConfirmCategoryChannels: (categoryChannels: CategoryModel[]) => void;
}

interface State {
  open: boolean;
  selectedCollege: IdName;
  selectedCategoryChannels: CategoryModel[];
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

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>
  ): void {
    //
    const { defaultSelectedCategoryChannels: prevSelectedCategoryChannels } =
      prevProps;
    const { defaultSelectedCategoryChannels } = this.props;

    if (prevSelectedCategoryChannels !== defaultSelectedCategoryChannels) {
      this.setSelectedCategoryChannels();
    }

    const { targetCollegeId: prevTargetCollegeId } = prevProps;
    const { targetCollegeId } = this.props;

    if (prevTargetCollegeId !== targetCollegeId) {
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

    this.setState({
      selectedCategoryChannels: [...defaultSelectedCategoryChannels],
    });
  }

  setSelectedCollege() {
    //
    const { collegeService, targetCollegeId } = this.props;
    const { colleges } = collegeService!;

    const college = colleges.find(
      (college) => college.collegeId === targetCollegeId
    );

    if (college) {
      this.setState({ selectedCollege: college.toIdName() });
    }
  }

  getTargetColleges() {
    //
    const { colleges } = this.props.collegeService!;
    const { targetCollegeId, isMysuniCollege } = this.props;

    if (!isMysuniCollege) {
      const college = colleges.find(
        (college) => college.collegeId === targetCollegeId
      );

      if (college) {
        return [college];
      }
    }
    return colleges.filter((college) => compareCollgeCineroom(college.id));
  }

  isActiveCollege(college: CollegeModel) {
    //
    const { isMysuniCollege } = this.props;
    const { selectedCollege } = this.state;

    return !isMysuniCollege ? true : college.collegeId === selectedCollege.id;
  }

  onOpen() {
    //
    const { targetCollegeId } = this.props;

    if (!targetCollegeId) {
      reactAlert({
        title: '메인채널 선택',
        message: '서브채널을 선택하기 전에 메인채널을 먼저 선택해 주세요.',
      });
    } else {
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
    this.setState({ selectedCategoryChannels: [] });
  }

  onClickCollege(currentSelectedCollege: CollegeModel) {
    //
    const { selectedCollege } = this.state;
    let nextSelectedCollege;

    if (currentSelectedCollege.collegeId === selectedCollege.id) {
      nextSelectedCollege = new IdName();
    } else {
      nextSelectedCollege = currentSelectedCollege.toIdName();
    }

    this.setState({
      selectedCollege: nextSelectedCollege,
    });
  }

  onClickChannel(
    e: any,
    { checked }: any,
    channel: { id: string; name: PolyglotString; active?: boolean }
  ) {
    //
    this.setState((state) => {
      //
      let selectedCategoryChannels = [...state.selectedCategoryChannels];
      const parseChannel: IdName = {
        id: channel.id,
        name: parsePolyglotString(channel.name),
        active: channel.active,
      };

      if (checked) {
        selectedCategoryChannels.push(
          new CategoryModel({
            college: state.selectedCollege,
            channel: parseChannel,
          })
        );
      } else {
        selectedCategoryChannels = selectedCategoryChannels.filter(
          (categoryModel) => categoryModel.channel.id !== channel.id
        );
      }

      return { selectedCategoryChannels };
    });
  }

  onRemove(categoryChannel: CategoryModel) {
    //
    this.setState((state) => ({
      selectedCategoryChannels: state.selectedCategoryChannels.filter(
        (categoryModel) =>
          categoryModel.channel.id !== categoryChannel.channel.id
      ),
    }));
  }

  render() {
    //
    const { trigger, isMysuniCollege }: Props = this.props;
    const { open, selectedCategoryChannels }: State = this.state;
    const targetColleges = this.getTargetColleges();

    return (
      <Modal
        className="base w1000"
        open={open}
        trigger={trigger}
        onOpen={this.onOpen}
        onClose={this.onClose}
      >
        <Modal.Header className="res">
          <PolyglotText
            defaultString="서브채널 선택"
            id="Create-NMSubChannelModal-SubChannel"
          />
          <span className="sub f12">
            <PolyglotText
              defaultString="서브채널을 선택해주세요."
              id="Create-NMSubChannelModal-SubChannelSub"
            />
          </span>
        </Modal.Header>
        <Modal.Content>
          <ChannelModalContentWrapper
            header={
              <>
                <div className="cell v-middle">
                  <span className="text01">
                    <PolyglotText
                      defaultString="Channel list"
                      id="Create-NMSubChannelModal-Channel list"
                    />
                  </span>
                </div>
                <div className="cell v-middle">
                  <span className="text01">
                    <PolyglotText
                      defaultString="Selected"
                      id="Create-NMSubChannelModal-Selected"
                    />
                  </span>
                  <span className="count">
                    <span className="text01 add">
                      {selectedCategoryChannels.length}
                    </span>
                    <span className="text02">
                      <PolyglotText
                        defaultString="/ 80"
                        id="Create-NMSubChannelModal-/80"
                      />{' '}
                    </span>
                  </span>
                  <div className="right">
                    <button className="clear" onClick={this.onReset}>
                      <Icon className="reset" />
                      <span className="blind">
                        <PolyglotText
                          defaultString="reset"
                          id="Create-NMSubChannelModal-reset"
                        />
                      </span>
                    </button>
                  </div>
                </div>
              </>
            }
          >
            <div className="cell vtop">
              <div className="select-area">
                <div className="scrolling-60vh">
                  {targetColleges.map((college, index) => (
                    <Accordion key={`college-${index}`} className="channel">
                      <Accordion.Title
                        active={this.isActiveCollege(college)}
                        onClick={() => this.onClickCollege(college)}
                      >
                        <span className={`name ${CollegeColors[index]}`}>
                          {parsePolyglotString(
                            college.name,
                            getDefaultLang(college.langSupports)
                          )}
                        </span>
                        {isMysuniCollege && <Icon />}
                      </Accordion.Title>
                      <Accordion.Content active={this.isActiveCollege(college)}>
                        <ul>
                          {college.channels.map((channel, idx) => (
                            <li key={`channel-${idx}`}>
                              <Checkbox
                                className="base"
                                label={parsePolyglotString(
                                  channel.name,
                                  getDefaultLang(channel.langSupports)
                                )}
                                checked={selectedCategoryChannels
                                  .map(
                                    (categoryChannel) =>
                                      categoryChannel.channel.id
                                  )
                                  .includes(channel.id)}
                                onChange={(e, data) =>
                                  this.onClickChannel(e, data, channel)
                                }
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
                      <Button
                        key={`category-channel-${index}`}
                        className="del"
                        onClick={() => this.onRemove(categoryChannel)}
                      >
                        {categoryChannel.college.name} &gt;{' '}
                        {categoryChannel.channel.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ChannelModalContentWrapper>
        </Modal.Content>
        <Modal.Actions>
          <Button type="button" className="w190 pop d" onClick={this.onCancel}>
            <PolyglotText
              defaultString="Cancel"
              id="Create-NMSubChannelModal-Cancel"
            />
          </Button>
          <Button type="button" className="w190 pop p" onClick={this.onConfirm}>
            <PolyglotText defaultString="Ok" id="Create-NMSubChannelModal-OK" />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default SubChannelModalContainer;
