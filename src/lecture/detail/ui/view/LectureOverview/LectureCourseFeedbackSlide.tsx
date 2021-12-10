import React, { useState, useCallback } from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import LectureCourseFeedbackCard from './LectureCourseFeedbackCard';
import { useLectureCoureSFeedbackReview } from 'lecture/detail/store/LectureOverviewStore';
import { CommunityProfileModal } from 'community/ui/userProfileInfo/CommunityProfileModal';
import { showAlert } from 'community/packages/alert/Alert';

const params = {
  loop: false,
  slidesPerView: 2,
  spaceBetween: 22,
  navigation: {
    prevEl: '.swiperFeedback .swiper-button-prev',
    nextEl: '.swiperFeedback .swiper-button-next',
  },
};
const FeedbackSlide = () => {
  const reviewAnswers = useLectureCoureSFeedbackReview();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [profileId, setProfileId] = useState<string>('');

  const onClickMember = useCallback(
    (profileId: string, profileNickname: string) => {
      if (profileNickname === null) {
        showAlert({
          title: '알림',
          message: '현재 존재하지 않는 멤버입니다.',
        });
      } else {
        setModalOpen(true);
        setProfileId(profileId);
      }
    },
    []
  );

  return (
    <>
      <div className="cardSwiper feedback">
        {reviewAnswers && (
          <Swiper {...params}>
            {reviewAnswers.map((item, i) => {
              return (
                <div className="swiper-slide" key={i}>
                  <LectureCourseFeedbackCard
                    item={item}
                    onClickMember={onClickMember}
                  />
                </div>
              );
            })}
          </Swiper>
        )}
        <div className="swiperFeedback">
          <div className="swiper-button-prev" />
          <div className="swiper-button-next" />
        </div>
      </div>

      <CommunityProfileModal
        open={modalOpen}
        setOpen={setModalOpen}
        memberId={profileId}
      />
    </>
  );
};
export default FeedbackSlide;
