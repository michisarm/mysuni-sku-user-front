import React, { useCallback, useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import { Segment } from 'semantic-ui-react';
import { PlaylistSwiper } from '../playlistContainer.store';
import Image from '../../../../../shared/components/Image/Image';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import { PlaylistInputPopUpView } from 'playlist/playlistInputPopUp/PlaylistInputPopUpView';
import { onOpenPlaylistInputPopUp } from 'playlist/playlistInputPopUp/playlistInputPopUp.events';
import { SkProfileService } from 'profile/stores';
import { PlaylistType } from 'playlist/data/models/PlaylistType';
import { requestPlaylistSwiper } from '../playlistContainer.request';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';
import myPageRoutePaths from 'myTraining/routePaths';
import { Area } from 'tracker/model';

/**
 * 슬라이드 loop 기능 사용시 복사된 요소들이 생성 되는데
 * 이 복사된 요소는 react dom에 포함되지 않는 요소라서 클릭이벤트가 bind되지 않는다.
 * 이 문제를 해결하기 위해 복사된 요소들을 가져와서 이벤트를 직접 넣어주는 방식을 사용하였다.
 * */

function useDuplicateElementAddEvent(
  index: number,
  type: PlaylistType,
  onClickMovePlaylistDetail: () => void,
  onClickMovePlaylist: () => void
) {
  // 복사된 요소들을 querySelector를 사용하여 가져온다.
  const slides = document.querySelectorAll(
    '.plylistSwiper .swiper-slide.swiper-slide-duplicate'
  );

  useEffect(() => {
    //복사된 요소들의 배열에 현재 index값을 이용하여 요소를 불러온 뒤 event를 넣어준다.
    if (slides[index] !== undefined) {
      if (type === '') {
        slides[index] &&
          slides[index].children[0].addEventListener(
            'click',
            onClickMovePlaylist
          );
        return;
      }
      slides[index] &&
        slides[index].children[0].addEventListener(
          'click',
          onClickMovePlaylistDetail
        );
    }

    // remove Event
    return () => {
      if (slides[index] !== undefined) {
        if (type === '') {
          slides[index].children[0].removeEventListener(
            'click',
            onClickMovePlaylist
          );
        }
        slides[index].children[0].removeEventListener(
          'click',
          onClickMovePlaylistDetail
        );
      }
    };
  }, [index, onClickMovePlaylistDetail, onClickMovePlaylist, slides, type]);
}

interface PlaylistCircleComponentProps {
  index: number;
  playlist: PlaylistSwiper;
  onClickMovePlaylist: () => void;
}

function PlaylistCircleComponent({
  index,
  playlist,
  onClickMovePlaylist,
}: PlaylistCircleComponentProps) {
  const { id, name, title, photoImagePath, thumbImagePath, type } = playlist;
  const history = useHistory();

  const onClickMovePlaylistDetail = useCallback(() => {
    history.push(`/my-training/my-page/Playlist/detail/${id}`);
  }, [history, id]);

  useDuplicateElementAddEvent(
    index,
    type,
    onClickMovePlaylistDetail,
    onClickMovePlaylist
  );

  const playlistTypeName = useMemo(() => {
    switch (type) {
      case 'MadeByMyself':
        return getPolyglotText('내가 만든', 'playlist-item-내가만든');
      case 'MadeByOthers':
        return getPolyglotText('내가 담은', 'playlist-item-내가담은');
      case 'Recommended':
        return getPolyglotText('추천 받은', 'playlist-item-추천받은');
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
      <div className="item plus" onClick={onClickMovePlaylist}>
        <div className="item-img">
          <Image
            src="https://image.mysuni.sk.com/suni-asset/public/images/all/btn-playlist-plus2.png"
            alt="프로필 추가"
            className="ui image"
          />
        </div>
        <div className="item-cont">
          <div className="plus-wrap">
            <Image
              src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-create-playlist.png"
              alt="프로필 추가"
              className="ui image"
            />
            <p
              dangerouslySetInnerHTML={{
                __html: getPolyglotText(
                  '나만의 Playlist를 <br /> 만들어 보세요.',
                  'home-playlist-만들어'
                ),
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`item ${playlistTypeClasses}`}
      onClick={onClickMovePlaylistDetail}
    >
      <div className="item-img">
        <Image src={thumbImagePath} alt="" className="ui image" />
      </div>
      <div className="item-cont">
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
    initialSlide: 0,
    speed: 300,
    navigation: {
      nextEl: '.plylistSwiperNav .swiper-button-next',
      prevEl: '.plylistSwiperNav .swiper-button-prev',
    },
  };
  const history = useHistory();
  const onClickMovePlaylist = useCallback(() => {
    history.push(myPageRoutePaths.myPagePlaylist());
  }, [history]);

  return (
    <Segment
      className="full learning-section type1"
      data-area={Area.MAIN_PLAYLIST}
    >
      <div className="section-head">
        <div
          className="sec-tit-txt"
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              `<strong>{name}님</strong>의 <strong>Playlist</strong>`,
              'home-playlist-나의리스트',
              { name: SkProfileService.instance.profileMemberName }
            ),
          }}
        />
        <div className="sec-tit-btn">
          <button className="btn-more" onClick={onClickMovePlaylist}>
            <PolyglotText
              defaultString="전체보기"
              id="home-playlist-전체보기"
            />
          </button>
        </div>
      </div>
      <div className="section-body">
        <div className="plylistSwiper">
          <Swiper {...PlaylistSwiperOption}>
            {playlistSwiper.map((playlist, i) => (
              <div className="swiper-slide" key={i}>
                <PlaylistCircleComponent
                  index={i}
                  playlist={playlist}
                  onClickMovePlaylist={onClickMovePlaylist}
                />
              </div>
            ))}
          </Swiper>
          <div className="plylistSwiperNav">
            <div className="swiper-button-prev" />
            <div className="swiper-button-next" />
          </div>
        </div>
      </div>
      <PlaylistInputPopUpView
        type="CREATE"
        afterCloseCallback={requestPlaylistSwiper}
      />
    </Segment>
  );
}
