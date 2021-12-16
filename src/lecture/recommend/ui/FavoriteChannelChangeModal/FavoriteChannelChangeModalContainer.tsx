// import React, { Component } from 'react';
// import { reactAutobind, mobxHelper, IdName } from '@nara.platform/accent';
// import { observer, inject } from 'mobx-react';
// import { Button, Modal } from 'semantic-ui-react';
// import { StudySummaryModel } from 'profile/model';
// import { SkProfileService } from 'profile/stores';
// import { CollegeType } from 'college/model';
// import { CollegeService } from 'college/stores';
// import { CollegeLectureCountRdo } from 'lecture/model';
// import { CollegeLectureCountService } from 'lecture/stores';
// import HeaderContainer from './HeaderContainer';
// import { ContentWrapper } from './FavoriteChannelChangeElementsView';
// import FavoriteChannelChangeView from './FavoriteChannelChangeView';
// import { CheckableChannel } from '../../../../shared/viewmodel/CheckableChannel';
// import { parsePolyglotString } from '../../../../shared/viewmodel/PolyglotString';
// import { getDefaultLang } from '../../../model/LangSupport';
// import { PolyglotText } from 'shared/ui/logic/PolyglotText';
// import {
//   compareCollgeCineroom,
//   getChannelName,
// } from 'shared/service/useCollege/useRequestCollege';
//
// interface Props {
//   skProfileService?: SkProfileService;
//   collegeService?: CollegeService;
//   collegeLectureCountService?: CollegeLectureCountService;
//
//   trigger?: React.ReactNode;
//   favorites: CheckableChannel[];
//   onConfirmCallback: () => void;
// }
//
// interface State {
//   open: boolean;
//   selectedCollegeIds: string[];
//   favoriteChannels: CheckableChannel[];
//   // favoriteCompanyChannels: CheckableChannel[];
// }
//
// @inject(
//   mobxHelper.injectFrom(
//     'profile.skProfileService',
//     'shared.collegeService',
//     'lecture.collegeLectureCountService'
//   )
// )
// @observer
// @reactAutobind
// class FavoriteChannelChangeModalContainer extends Component<Props, State> {
//   //
//   state: State = {
//     open: false,
//     selectedCollegeIds: [],
//     favoriteChannels: [],
//     // favoriteCompanyChannels: [],
//   };
//
//   setDefaultFavorites(
//     favoriteChannels: CheckableChannel[],
//     colleges: CollegeLectureCountRdo[]
//   ) {
//     //
//     const companyChannels = colleges
//       .filter((college) => !compareCollgeCineroom(college.id))
//       .map((college) =>
//         college.channelIds.map((id) => ({
//           id,
//           name: getChannelName(id),
//           checked: false,
//         }))
//       )
//       .flat();
//
//     const favoriteChannelsWithoutCompany = favoriteChannels.filter(
//       (channel) =>
//         !companyChannels.some(
//           (companyChannel) => companyChannel.id === channel.id
//         )
//     );
//
//     this.setState({
//       favoriteChannels,
//       // favoriteCompanyChannels: companyChannels,
//     });
//
//     // this.setState({
//     //   favoriteChannels: favoriteChannelsWithoutCompany,
//     //   // favoriteCompanyChannels: companyChannels,
//     // });
//   }
//
//   async onOpenModal() {
//     //
//     const { collegeService, collegeLectureCountService, favorites } =
//       this.props;
//     const favoriteChannels = [...favorites];
//
//     this.setState({
//       open: true,
//       favoriteChannels,
//     });
//
//     collegeService!.findChannelByName('');
//     const colleges =
//       await collegeLectureCountService!.findCollegeLectureCounts();
//
//     this.setDefaultFavorites(favoriteChannels, colleges);
//   }
//
//   onCloseModal() {
//     //
//     this.setState({
//       open: false,
//       selectedCollegeIds: [],
//       favoriteChannels: [],
//     });
//   }
//
//   onConfirm() {
//     //
//     const { skProfileService, onConfirmCallback } = this.props;
//     const {
//       favoriteChannels,
//       // favoriteCompanyChannels
//     } = this.state;
//     const nextFavoriteChannels = [
//       ...favoriteChannels.map((item) => item.id),
//       // ...favoriteCompanyChannels.map((item) => item.id),
//     ];
//
//     const params = {
//       nameValues: [
//         {
//           name: 'favoriteChannelIds',
//           value: JSON.stringify(nextFavoriteChannels),
//         },
//       ],
//     };
//
//     skProfileService!.modifyStudySummary(params).then(() => {
//       if (typeof onConfirmCallback === 'function') {
//         onConfirmCallback();
//       }
//       skProfileService?.findSkProfile();
//       this.onCloseModal();
//     });
//   }
//
//   async onSearch(e: any, searchKey: string) {
//     const { collegeService, collegeLectureCountService } = this.props;
//     await collegeService!.findChannelByName(searchKey);
//
//     if (searchKey) {
//       const { channelIds } = collegeService!;
//       const { collegeLectureCounts } = collegeLectureCountService!;
//       const colleges: CollegeLectureCountRdo[] = collegeLectureCounts;
//
//       this.setState({ selectedCollegeIds: [] });
//       colleges
//         .filter((college) => {
//           const searchedChannels = college.channelIds.filter((id) =>
//             channelIds.includes(id)
//           );
//           return searchedChannels.length > 0 ? college : null;
//         })
//         .map((college) => college.id)
//         .forEach((collegeId) => this.onToggleCollege(collegeId));
//     }
//   }
//
//   onReset() {
//     //
//     const { collegeLectureCounts } = this.props.collegeLectureCountService!;
//
//     this.setState({ selectedCollegeIds: [] });
//     this.setDefaultFavorites([], collegeLectureCounts);
//   }
//
//   onToggleCollege(collegeId: string) {
//     //
//     let { selectedCollegeIds }: State = this.state;
//
//     if (selectedCollegeIds.includes(collegeId)) {
//       selectedCollegeIds = selectedCollegeIds.filter(
//         (selectedCollegeId) => selectedCollegeId !== collegeId
//       );
//     } else {
//       selectedCollegeIds.push(collegeId);
//     }
//     this.setState({ selectedCollegeIds: [...selectedCollegeIds] });
//   }
//
//   onToggleChannel(channel: CheckableChannel) {
//     //
//     let { favoriteChannels }: State = this.state;
//
//     if (
//       favoriteChannels
//         .map((favoriteChannel) => favoriteChannel.id)
//         .includes(channel.id)
//     ) {
//       favoriteChannels = favoriteChannels.filter(
//         (favoriteChannel) => favoriteChannel.id !== channel.id
//       );
//     } else {
//       favoriteChannels.push(channel);
//     }
//     this.setState({ favoriteChannels: [...favoriteChannels] });
//   }
//
//   render() {
//     //
//     const { collegeService, collegeLectureCountService, trigger } = this.props;
//     const {
//       open,
//       favoriteChannels,
//       // favoriteCompanyChannels,
//       selectedCollegeIds,
//     }: State = this.state;
//     const { channelIds } = collegeService!;
//     const { collegeLectureCounts, totalChannelCount } =
//       collegeLectureCountService!;
//
//     return (
//       <Modal
//         className="base w1000"
//         trigger={trigger}
//         open={open}
//         onOpen={this.onOpenModal}
//         onClose={this.onCloseModal}
//       >
//         <Modal.Header className="res">
//           <PolyglotText
//             defaultString="관심 Channel 변경"
//             id="home-ChannelChangeModal-타이틀"
//           />
//           <span className="sub f12">
//             <PolyglotText
//               defaultString="맞춤형 학습카드 추천을 위한 관심 채널을 3개 이상 선택해주세요."
//               id="home-ChannelChangeModal-설명"
//             />
//           </span>
//         </Modal.Header>
//         <Modal.Content>
//           <ContentWrapper>
//             <HeaderContainer
//               selectedChannelCount={
//                 favoriteChannels.length
//                 // + favoriteCompanyChannels.length
//               }
//               totalChannelCount={totalChannelCount}
//               onSearch={this.onSearch}
//               onResetSelected={this.onReset}
//             />
//
//             <FavoriteChannelChangeView
//               colleges={collegeLectureCounts}
//               channelIds={channelIds}
//               favoriteChannels={favoriteChannels}
//               // favoriteCompanyChannels={favoriteCompanyChannels}
//               selectedCollegeIds={selectedCollegeIds}
//               onToggleCollege={this.onToggleCollege}
//               onToggleChannel={this.onToggleChannel}
//             />
//           </ContentWrapper>
//         </Modal.Content>
//         <Modal.Actions className="actions">
//           <Button className="w190 pop d" onClick={this.onCloseModal}>
//             <PolyglotText
//               defaultString=" Cancel"
//               id="Recommend-ChannelChangeModal-취소"
//             />
//           </Button>
//           <Button className="w190 pop p" onClick={this.onConfirm}>
//             <PolyglotText
//               defaultString="Confirm"
//               id="Recommend-ChannelChangeModal-승인"
//             />
//           </Button>
//         </Modal.Actions>
//       </Modal>
//     );
//   }
// }
//
// export default FavoriteChannelChangeModalContainer;
