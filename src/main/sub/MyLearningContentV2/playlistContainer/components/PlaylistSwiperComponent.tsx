import React, { useCallback, useMemo } from 'react';
import { useHistory } from 'react-router';
import { Segment } from 'semantic-ui-react';
import { PlaylistSwiper } from '../playlistContainer.store';
import Image from '../../../../../shared/components/Image/Image';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import { PlaylistInputPopUpView } from 'playlist/playlistInputPopUp/PlaylistInputPopUpView';
import { onOpenPlaylistInputPopUp } from 'playlist/playlistInputPopUp/playlistInputPopUp.events';
import { SkProfileService } from 'profile/stores';

function PlaylistCircleComponent(playlist: PlaylistSwiper) {
  const { id, name, title, photoImagePath, thumbImagePath, type } = playlist;
  const history = useHistory();

  const onClickMovePlaylistDetail = useCallback(() => {
    history.push(`/my-training/my-page/Playlist/detail/${id}`);
  }, [history, id]);

  const playlistTypeName = useMemo(() => {
    switch (type) {
      case 'MadeByMyself':
        return '내가 만든';
      case 'MadeByOthers':
        return '내가 담은';
      case 'Recommended':
        return '추천 받은';
      default:
        return '';
    }
  }, [type]);

  const playlistTypeClasses = useMemo(() => {
    switch (type) {
      case 'MadeByMyself':
        return 'case1';
      case 'MadeByOthers':
        return 'case3';
      case 'Recommended':
        return 'case2';
      default:
        return 'plus';
    }
  }, [type]);

  if (type === '') {
    return (
      <div className="item plus">
        <div className="item-img">
          <Image
            src="https://image.mysuni.sk.com/suni-asset/public/images/all/btn-playlist-plus.png"
            alt="프로필 추가"
            className="ui image"
          />
        </div>
        <div className="item-cont" onClick={onOpenPlaylistInputPopUp}>
          <div className="plus-wrap">
            <Image
              src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-create-playlist.png"
              alt="프로필 추가"
              className="ui image"
            />
            <p>
              나만의 Playlist를
              <br />
              만들어 보세요.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`item ${playlistTypeClasses}`}>
      <div className="item-img">
        <Image src={thumbImagePath} alt="" className="ui image" />
      </div>
      <div className="item-cont" onClick={onClickMovePlaylistDetail}>
        <div className="tit-wrap">
          <em>{playlistTypeName}</em>
          <strong>{title}</strong>
        </div>
        <div className="profile-wrap">
          <div className="ui profile">
            <div className="pic">
              <Image
                src={photoImagePath}
                alt="프로필 사진"
                className="ui image"
              />
            </div>
            <strong className="name">{name}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PlaylistSwiperComponentProps {
  playlistSwiper: PlaylistSwiper[];
}
export function PlaylistSwiperComponent({
  playlistSwiper,
}: PlaylistSwiperComponentProps) {
  const PlaylistSwiperOption = {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 0,
    slideToClickedSlide: true,
    loop: true,
    initialSlide: 2,
    speed: 300,
    navigation: {
      nextEl: '.plylistSwiperNav .swiper-button-next',
      prevEl: '.plylistSwiperNav .swiper-button-prev',
    },
  };

  return (
    <Segment className="full learning-section type1">
      <div className="section-head">
        <div className="sec-tit-txt">
          <strong>{SkProfileService.instance.profileMemberName}님</strong>의{' '}
          <strong>Playlist</strong>
        </div>
      </div>
      <div className="section-body">
        <div className="plylistSwiper">
          <Swiper {...PlaylistSwiperOption}>
            {playlistSwiper.map((playlist, i) => (
              <div className="swiper-slide" key={i}>
                <PlaylistCircleComponent {...playlist} />
              </div>
            ))}
          </Swiper>
          <div className="plylistSwiperNav">
            <div className="swiper-button-prev" />
            <div className="swiper-button-next" />
          </div>
        </div>
      </div>
      <PlaylistInputPopUpView type="CREATE" />
    </Segment>
  );
}
