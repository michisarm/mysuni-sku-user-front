import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import profileImg from 'style/../../public/images/all/img-profile-56-px.png';
import Image from '../../../shared/components/Image';
import { parsePolyglotString } from 'shared/viewmodel/PolyglotString';
import { InstructorWithIdentity } from 'expert/model/InstructorWithIdentity';
import { getDefaultLang } from 'lecture/model/LangSupport';

interface Props {
  instructorWithIdentity: InstructorWithIdentity | null;
}

@observer
@reactAutobind
class InstructorContentHeaderView extends React.Component<Props> {
  //
  render() {
    //
    const { instructorWithIdentity } = this.props;

    // 김민준 - 강사관리 소속회사 확인
    return (
      <div className="main-info-area">
        <div className="progress-info-wrap">
          <div className="cell">
            <div className="cell-inner">
              <div className="profile">
                <div className="pic">
                  <Image
                    src={
                      instructorWithIdentity?.instructor?.photoFilePath ||
                      profileImg
                    }
                    alt="기본 프로필사진"
                  />
                </div>
              </div>
              <div className="text-info">
                <div className="name">
                  {parsePolyglotString(
                    instructorWithIdentity?.instructor?.name,
                    getDefaultLang(
                      instructorWithIdentity?.instructor?.langSupports
                    )
                  )}
                </div>
                <div className="part">
                  <span>
                    {instructorWithIdentity?.instructor?.internal
                      ? parsePolyglotString(
                          instructorWithIdentity?.userIdentity?.departmentName,
                          getDefaultLang(
                            instructorWithIdentity?.instructor.langSupports
                          )
                        )
                      : parsePolyglotString(
                          instructorWithIdentity?.instructor?.organization,
                          getDefaultLang(
                            instructorWithIdentity?.instructor?.langSupports
                          )
                        )}
                  </span>
                  <span>
                    {instructorWithIdentity?.instructor?.internal
                      ? '사내강사'
                      : '사외강사'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InstructorContentHeaderView;
