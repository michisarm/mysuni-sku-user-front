import React, { Component } from 'react';
import { reactAutobind, mobxHelper } from '@nara.platform/accent';
import { observer, inject } from 'mobx-react';

import { Accordion, Button, Icon, Modal, Radio } from 'semantic-ui-react';
import { IdName } from 'shared/model';
import { CollegeModel, CollegeColors } from 'college/model';
import { CollegeService } from 'college/stores';
import { ChannelModalContentWrapper } from '../view/DetailElementsView';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import {
  parsePolyglotString,
  PolyglotString,
} from 'shared/viewmodel/PolyglotString';
import { getDefaultLang } from '../../../../lecture/model/LangSupport';

interface Props {
  collegeService?: CollegeService;
  trigger: React.ReactNode;
  defaultSelectedChannel: IdName | null;
  onConfirmChannel: (college: CollegeModel, channel: IdName) => void;
}

interface State {
  open: boolean;
  selectedCollege: IdName;
  selectedChannel: IdName;
}

@inject(mobxHelper.injectFrom('college.collegeService'))
@observer
@reactAutobind
class MainChannelModalContainer extends Component<Props, State> {
  //
  state = {
    open: false,
    selectedCollege: new IdName(),
    selectedChannel: new IdName(),
  };

  componentDidMount(): void {
    //
    this.findAllColleges();
    this.setDefaultSelectedChannel();
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>
  ): void {
    //
    const { defaultSelectedChannel: prevDefaultSelectedChannel } = prevProps;
    const { defaultSelectedChannel } = this.props;

    if (prevDefaultSelectedChannel !== defaultSelectedChannel) {
      this.setDefaultSelectedChannel();
    }
  }

  findAllColleges() {
    //
    this.props.collegeService!.findAllColleges();
  }

  setDefaultSelectedChannel() {
    //
    const { defaultSelectedChannel } = this.props;

    this.setState({ selectedChannel: defaultSelectedChannel || new IdName() });
  }

  onOpen() {
    //
    this.setState({ open: true });
  }

  onClose() {
    //
    this.setState({ open: false });
  }

  onCancel() {
    //
    this.setDefaultSelectedChannel();
    this.onClose();
  }

  onConfirm() {
    //
    const { colleges } = this.props.collegeService!;
    const { onConfirmChannel } = this.props;
    const { selectedCollege, selectedChannel } = this.state;

    const college = colleges.find(
      (college) => college.collegeId === selectedCollege.id
    );

    onConfirmChannel(college!, selectedChannel);
    this.onClose();
  }

  onClickCollege(currentSelectedCollege: CollegeModel) {
    //
    const { selectedCollege } = this.state;

    if (selectedCollege.id === currentSelectedCollege.collegeId) {
      this.setState({ selectedCollege: new IdName() });
    } else {
      this.setState({ selectedCollege: currentSelectedCollege.toIdName() });
    }
  }

  onClickChannel(currentSelectedChannel: {
    id: string;
    name: PolyglotString;
    active?: boolean;
  }) {
    const { id, name, active } = currentSelectedChannel;
    const parseName = parsePolyglotString(name);

    this.setState({
      selectedChannel: {
        id,
        name: parseName,
        active,
      },
    });
  }

  render() {
    //
    const { collegeService, trigger } = this.props;
    const { open, selectedCollege, selectedChannel } = this.state;
    const colleges: CollegeModel[] = collegeService!.colleges;

    return (
      <Modal
        className="base w560"
        open={open}
        trigger={trigger}
        onOpen={this.onOpen}
        onClose={this.onClose}
      >
        <Modal.Header className="res">
          <PolyglotText
            defaultString="???????????? ??????"
            id="Create-NMMainChannelModal-MainChannel"
          />
          <span className="sub f12">
            <PolyglotText
              defaultString="??????????????? ??????????????????."
              id="Create-NMMainChannelModal-MainChannelSub"
            />
          </span>
        </Modal.Header>
        <Modal.Content>
          <ChannelModalContentWrapper
            header={
              <div className="cell v-middle">
                <span className="text01">
                  <PolyglotText
                    defaultString="Channel list"
                    id="Create-NMMainChannelModal-Channel list"
                  />
                </span>
              </div>
            }
          >
            <div className="cell vtop">
              <div className="select-area">
                <div className="scrolling-60vh">
                  {colleges.length > 0 &&
                    colleges.map((college, index) => (
                      <Accordion key={`college-${index}`} className="channel">
                        <Accordion.Title
                          active={college.collegeId === selectedCollege.id}
                          onClick={() => this.onClickCollege(college)}
                        >
                          <span className={`name ${CollegeColors[index]}`}>
                            {parsePolyglotString(
                              college.name,
                              getDefaultLang(college.langSupports)
                            )}
                          </span>
                          <Icon />
                        </Accordion.Title>
                        <Accordion.Content
                          active={college.collegeId === selectedCollege.id}
                        >
                          <ul>
                            {college.channels.map((channel, idx) => (
                              <li key={`channel-${idx}`}>
                                <Radio
                                  className="base"
                                  label={parsePolyglotString(
                                    channel.name,
                                    getDefaultLang(channel.langSupports)
                                  )}
                                  checked={selectedChannel.id === channel.id}
                                  onChange={() => this.onClickChannel(channel)}
                                />
                                kl
                              </li>
                            ))}
                          </ul>
                        </Accordion.Content>
                      </Accordion>
                    ))}
                </div>
              </div>
            </div>
          </ChannelModalContentWrapper>
        </Modal.Content>
        <Modal.Actions>
          <Button type="button" className="w190 pop d" onClick={this.onCancel}>
            <PolyglotText
              defaultString="Cancel"
              id="Create-NMMainChannelModal-Cancel"
            />
          </Button>
          <Button type="button" className="w190 pop p" onClick={this.onConfirm}>
            <PolyglotText
              defaultString="OK"
              id="Create-NMMainChannelModal-OK"
            />
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default MainChannelModalContainer;
