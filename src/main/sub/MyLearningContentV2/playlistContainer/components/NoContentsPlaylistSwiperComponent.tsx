import React from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import Image from '../../../../../shared/components/Image/Image';
import { PlaylistInputPopUpView } from 'playlist/playlistInputPopUp/PlaylistInputPopUpView';
import { onOpenPlaylistInputPopUp } from 'playlist/playlistInputPopUp/playlistInputPopUp.events';
import { requestPlaylistSwiper } from '../playlistContainer.request';
import { getPolyglotText, PolyglotText } from 'shared/ui/logic/PolyglotText';

export function NoContentsPlaylistSwiperComponent() {
  return (
    <Segment className="full learning-section type2 pl-sec">
      <div className="section-head">
        <div
          className="sec-tit-txt"
          dangerouslySetInnerHTML={{
            __html: getPolyglotText(
              '지금 나만의<br /><strong>Playlist를 만들고</strong><br /><strong>구성원에게 추천</strong>해보세요.',
              'home-playlist-nocontents'
            ),
          }}
        />
        <div className="sec-btn">
          <Button onClick={onOpenPlaylistInputPopUp}>
            <PolyglotText
              defaultString="Playlist 만들기"
              id="home-playlist-만들기"
            />
          </Button>
        </div>
      </div>
      <div className="section-body">
        <Grid className="pl-nodata-items">
          <Grid.Row columns={3}>
            <Grid.Column>
              <div className="item">
                <div className="item-inner">
                  <div className="item-tip">
                    <em className="tip">
                      <PolyglotText
                        defaultString="이 과정 좋은데?"
                        id="home-playlist-이과정"
                      />
                    </em>
                  </div>
                  <div className="item-img">
                    <Image
                      src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-character-01-v2.png"
                      alt="내가만든 캐릭터"
                      className="ui image"
                    />
                  </div>
                  <div className="item-tit">
                    <p
                      className="tit"
                      dangerouslySetInnerHTML={{
                        __html: getPolyglotText(
                          '<strong>내가 만든</strong> Playlist',
                          'home-playlist-내가만든'
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className="item">
                <div className="item-inner">
                  <div className="item-tip">
                    <em className="tip right">
                      <PolyglotText
                        defaultString="우리팀에게 추천할래!"
                        id="home-playlist-우리팀"
                      />
                    </em>
                  </div>
                  <div className="item-img">
                    <Image
                      src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-character-02-v2.png"
                      alt="추천받은 캐릭터"
                      className="ui image"
                    />
                  </div>
                  <div className="item-tit">
                    <p
                      className="tit"
                      dangerouslySetInnerHTML={{
                        __html: getPolyglotText(
                          '<strong>추천 받은</strong> Playlist',
                          'home-playlist-추천받은'
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className="item">
                <div className="item-inner">
                  <div className="item-tip">
                    <em className="tip">
                      <PolyglotText
                        defaultString="나도 들어봐야지~"
                        id="home-playlist-나도들어"
                      />
                    </em>
                  </div>
                  <div className="item-img">
                    <Image
                      src="https://image.mysuni.sk.com/suni-asset/public/images/all/icon-character-03-v2.png"
                      alt="내가 담은 캐릭터"
                      className="ui image"
                    />
                  </div>
                  <div className="item-tit">
                    <p
                      className="tit"
                      dangerouslySetInnerHTML={{
                        __html: getPolyglotText(
                          '<strong>내가 담은</strong> Playlist',
                          'home-playlist-내가담은'
                        ),
                      }}
                    />
                  </div>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <PlaylistInputPopUpView
        type="CREATE"
        afterCloseCallback={requestPlaylistSwiper}
      />
    </Segment>
  );
}
