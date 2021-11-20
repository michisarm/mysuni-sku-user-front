// import React from 'react';
// import { Link } from 'react-router-dom';
// import { LectureCardView } from '@sku/skuniv-ui-lecture-card';
// import { SkProfileService } from '../../../../profile/stores';
// import { RecommendCardRom } from '../../../model/RecommendCardRom';
// import CardView from '../../../shared/Lecture/ui/view/CardVIew';
// import { NoSuchContentPanel } from 'shared';
// import { Area } from '@sku/skuniv-ui-lecture-card/lib/views/lectureCard.models';
// import {
//   hoverTrack,
//   scrollHorizontalTrack,
// } from 'tracker/present/logic/ActionTrackService';
// import {
//   getPolyglotText,
//   PolyglotText,
// } from '../../../../shared/ui/logic/PolyglotText';
// import { getChannelName } from '../../../../shared/service/useCollege/useRequestCollege';
// import { DifficultyLevel } from 'personalcube/cubeintro/model';
// import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
// import isIncludeCineroomId from 'shared/helper/isIncludeCineroomId';
//
// export function RecommendCardRomView(props: RecommendCardRom) {
//   //
//   const userLanguage = SkProfileService.instance.skProfile.language;
//
//   const { channelId, cardCount, totalCardCount, cardForUserViewRdos } = props;
//
//   const isCardWithRelatedCountRoms =
//     cardForUserViewRdos == null || cardForUserViewRdos.length < 0
//       ? false
//       : true;
//
//   const getCardCount = () => {
//     if (totalCardCount !== undefined && totalCardCount >= 0) {
//       return totalCardCount;
//     }
//
//     return cardCount;
//   };
//
//   return (
//     <div
//       onScroll={(e: React.UIEvent<HTMLElement, UIEvent>) =>
//         scrollHorizontalTrack({
//           e,
//           area: Area.RECOMMEND_LIST,
//           scrollClassName: 'scrolling',
//           actionName: '추천카드 스크롤',
//         })
//       }
//     >
//       <div className="section-head">
//         <span
//           dangerouslySetInnerHTML={{
//             __html: getPolyglotText(
//               '<b>{channel}</b>채널에서 {name}님께 추천하는 과정입니다.',
//               'rcmd-추천-Channel',
//               {
//                 channel: getChannelName(channelId) || '',
//                 name: SkProfileService.instance.profileMemberName || '',
//               }
//             ),
//           }}
//         />{' '}
//         <span className="channel">{`(${getCardCount()})`}</span>
//         {isCardWithRelatedCountRoms && (
//           <div className="right">
//             <Link to={`/lecture/recommend/channel/${channelId}`}>
//               <button className="ui icon button right btn-blue">
//                 <PolyglotText
//                   defaultString="View all"
//                   id="rcmd-추천-ViewAll2"
//                 />
//                 <i aria-hidden="true" className="icon morelink" />
//               </button>
//             </Link>
//           </div>
//         )}
//       </div>
//       <div className="scrolling" data-action-name={getChannelName(channelId)}>
//         <ul className="belt">
//           {isCardWithRelatedCountRoms ? (
//             cardForUserViewRdos.map(({ card, cardRelatedCount }, index) => {
//               return (
//                 <li key={index}>
//                   <div className="ui cards box-cards">
//                     {/* <CardView
//                       key={card.id}
//                       cardId={card.id}
//                       {...card}
//                       {...cardRelatedCount}
//                       dataArea={Area.RECOMMEND_LIST}
//                     /> */}
//                     <LectureCardView
//                       cardId={card.id}
//                       cardName={parsePolyglotString(card.name)}
//                       learningTime={card.learningTime.toString()}
//                       thumbnailImagePath={card.thumbImagePath}
//                       passedStudentCount={cardRelatedCount.passedStudentCount.toString()}
//                       starCount={cardRelatedCount.starCount.toString()}
//                       simpleDescription={parsePolyglotString(
//                         card.simpleDescription
//                       )}
//                       difficultyLevel={
//                         card.difficultyLevel || DifficultyLevel.Basic
//                       }
//                       userLanguage={userLanguage}
//                       studentCount={cardRelatedCount.studentCount}
//                       langSupports={card.langSupports}
//                       useBookMark={true}
//                       // 체크 필요
//                       isRequiredLecture={
//                         card.permittedCinerooms
//                           ? isIncludeCineroomId(card.permittedCinerooms)
//                           : false
//                       }
//                       collegeId={card.mainCategory.collegeId}
//                       dataArea={Area.EXPERT_LECTURE}
//                       hoverTrack={hoverTrack}
//                     />
//                   </div>
//                 </li>
//               );
//             })
//           ) : (
//             <NoSuchContentPanel
//               message={`${getChannelName(channelId) || ''} ${getPolyglotText(
//                 '채널에 해당하는 추천 학습과정이 없습니다.',
//                 'rcmd-추천-채널없음'
//               )}`}
//             />
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }
