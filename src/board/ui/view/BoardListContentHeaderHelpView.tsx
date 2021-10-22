import React from 'react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';

import { Icon, Label } from 'semantic-ui-react';
import { PostModel } from '../../model';
import {
  getPolyglotText,
  PolyglotText,
} from '../../../shared/ui/logic/PolyglotText';
import { parsePolyglotString } from '../../../shared/viewmodel/PolyglotString';

interface Props {
  faqTotalCount: number;
  faqPosts: PostModel[];
  routeToFaqDetail: (postId: string) => void;
}

@observer
@reactAutobind
class BoardListContentHeaderHelpView extends React.Component<Props> {
  render() {
    //
    return (
      <div className="inner">
        {/*<Label className="onlytext">*/}
        {/*  <Icon className="tip16" />*/}
        {/*  <span>*/}
        {/*    <PolyglotText*/}
        {/*      id="support-spif-도움말"*/}
        {/*      defaultString="유용한 도움말"*/}
        {/*    />*/}
        {/*  </span>*/}
        {/*</Label>*/}
        {/*<div className="q-list">*/}
        {/*  {(faqTotalCount > 0 &&*/}
        {/*    faqPosts.map((faqPost, index) => (*/}
        {/*      <a target="_blank" key={index}>*/}
        {/*        <span*/}
        {/*          className="ellipsis"*/}
        {/*          onClick={() => routeToFaqDetail(faqPost.postId)}*/}
        {/*        >*/}
        {/*          {parsePolyglotString(faqPost.title)}*/}
        {/*        </span>*/}
        {/*      </a>*/}
        {/*    ))) ||*/}
        {/*    getPolyglotText(*/}
        {/*      '등록된 도움말이 없습니다.',*/}
        {/*      'support-spif-목록없음'*/}
        {/*    )}*/}
        {/*</div>*/}
        {/*<div className="text">*/}
        {/*  <PolyglotText id="support-spif-상세설명" defaultString="Help Desk" />*/}
        {/*  <br />*/}
        {/*  <span className="dash" />*/}
        {/*  <PolyglotText*/}
        {/*    id="support-spif-time"*/}
        {/*    defaultString="평일 09:00 ~ 18:00 (주말 & 공휴일 제외)"*/}
        {/*  />*/}
        {/*  <br />*/}
        {/*  <PolyglotText*/}
        {/*    id="support-spif-telNemail"*/}
        {/*    defaultString="mysuni@mysuni.sk.com (확인 필요) | 02-6323-9002"*/}
        {/*  />*/}
        {/*</div>*/}
        <span>Help Desk</span>
        <div>
          <p>
            <PolyglotText
              id="support-helpdesk-설명"
              defaultString="평일 09:00 ~ 18:00 (주말 & 공휴일 제외)"
            />
          </p>

          <span>
            <i aria-hidden="true" className="icon support-tel" />
            02) 6323-9002
          </span>
        </div>
      </div>
    );
  }
}

export default BoardListContentHeaderHelpView;
