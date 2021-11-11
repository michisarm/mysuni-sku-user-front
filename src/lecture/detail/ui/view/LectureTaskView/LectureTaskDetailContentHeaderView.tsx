import React, { Component, useCallback, useState } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';

import moment from 'moment';
import { Button, Icon } from 'semantic-ui-react';
import { LectureTaskDetail } from 'lecture/detail/viewModel/LectureTaskDetail';
import { useHistory } from 'react-router-dom';
import { Area } from 'tracker/model';
import { findCommunityProfile } from '../../../../../community/api/profileApi';
import CommunityProfileModal from '../../../../../community/ui/view/CommunityProfileModal';
import { PolyglotText } from '../../../../../shared/ui/logic/PolyglotText';
import { PolyglotString } from 'shared/viewmodel/PolyglotString';
import { SkProfileService } from 'profile/stores';

interface Props {
  canNotice: boolean;
  taskDetail: LectureTaskDetail;
  title: string;
  time: number;
  name: string;
  pinned: number;
  subField?: React.ReactNode;
  deletable?: boolean;
  reply?: boolean;
  readCount?: number;
  onClickList?: (e: any) => void;
  onClickDelete: (id: string) => void;
  onClickModify: (id: string) => void;
  onClickReplies: (id: string) => void;
  onClickPostsPinned: (id: string, pinned: number) => void;
}

interface profileParams {
  id: string;
  profileImg: string;
  introduce: string;
  nickName: string;
  creatorName: string;
}

const LectureTaskDetailContentHeaderView: React.FC<Props> =
  function LectureTaskDetailContentHeaderView({
    canNotice,
    title,
    time,
    subField,
    deletable,
    reply,
    readCount,
    name,
    pinned,
    taskDetail,
    onClickList,
    onClickDelete,
    onClickModify,
    onClickReplies,
    onClickPostsPinned,
  }) {
    //
    const history = useHistory();

    const handelClickModify = () => {
      onClickModify(taskDetail.id);
    };

    const handelClickReplies = () => {
      onClickReplies(taskDetail.id);
    };

    const handelClickDelete = () => {
      onClickDelete(taskDetail.id);
    };

    const [profileInfo, setProfileInfo] = useState<profileParams>();
    const [profileOpen, setProfileOpen] = useState<boolean>(false);

    const openProfile = useCallback(async () => {
      const id = taskDetail.writerPatronKeyString;
      findCommunityProfile(id!).then((result) => {
        setProfileInfo({
          id: result!.id,
          profileImg: result!.profileImg,
          introduce: result!.introduce,
          nickName: result!.nickname,
          creatorName: result!.name,
        });
        setProfileOpen(true);
      });
    }, [taskDetail]);

    const isPostWriter =
      SkProfileService.instance.skProfile.id ===
      taskDetail.writerPatronKeyString;

    return (
      <>
        <div className="course-info-header" data-area={Area.CUBE_HEADER}>
          <div className="survey-header">
            <div className="survey-header-left debate-header-sub">
              <div className="title" style={{ wordBreak: 'break-word' }}>
                {pinned === 2 && (
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAYCAYAAACSuF9OAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAJKADAAQAAAABAAAAGAAAAABO37Z7AAADh0lEQVRIDc2XaUhUURTH//fNe7M8LTVtj4qghcK0MsssiyLaiD6k0gqRSUQLtnyroEijIFqQoCw/tVBJVFBRtFIWWQrhEpHtWilZ1pi+Wd6b271XejDWm/FLowdm5t5zzz33xz3nnXeG/NIMGqhvRNv2g/A9eAra0IRICumXAHtGKtSCLZAG9QVx136mP9OXwLlxBZzLF4H0T4gkD+iXJnjOXIGn8DRiHp0DacjeRm2JI+DalhNRkI6HaQeKYVS9AvnYL4PGPS6J+M10BOI31TwlCxLPmUiHqSMMn3MGziL9a7Erdd0OSA53G77Lt6GXVlia2SYnw5E5J2hdL6uE8aIWgVYNtqEDocxMA1GdQTZWk7BA9PsPGO/qxX5/aTmo+xdIjygo0yYKnTR8iOk78LUZLZkboD+thBQXA9IrBsabj5DYb/SJAijzp5u2VoOwIXOszkTUyQLIE8YIGDklEbSlFbZxoxF1Ih/OtUtM3615+dCfVaHnjWLEfSpFbPU1xL2/DzJ4ANzLtoD+aDFtrQZhgdxz16B54FS07T0GddcmxDw8C3VPHrT9RULvnr0KCFDhXy+vgpI+Hsr0VPbYtB8p9Y2HKzcb8Pqg19RacZj6sCFz5GbBtWkl5KkpIlRgZ7u25rCbWcpyq1zkCaT205XUJHgv3oTv7hPYZ0wC1/P6oh0/D+J0QE4aZR5sNQgJpO0rQtvuQqu9pt54+RbqjnVQj+yAXl2LlgW5ILE9RR4Z7+qEXY+rRSDRqrnHahASyLF0IeS0ZHMvz4+2nYdF6OTJSabeNnSQGPPklScliURW8/NEmHyX78Bf9hz2WWmmfahBSCBpSH/wj/9eGbwlN+C/VSp8eYpLYK9rgD17HpSMlL/8E5sEZ06W0Os1bwAG1FkJCcSd6OyF52YhUHiLkL8ZUp94BBqb4D15Ae55OYituATbqGHQCk8hwEq/UVEN6tfRuv2QYNCfVTInhjl3rV8BaUBvS76wQIQ5A6UsoVVRTySWG/D7gego9nQFQPk6E6PmNQJv60BY/VGmjIfBwsuF20vpE8w51TSht/oiHzCaxmvtm62MvOevw3P0tGgPqMcL4nLCNnYk66FWwrE4uEpb+eiM/psrEZ0CCnLGwgEl7MUGbenshAOFLYx/OftPMH/OkXhPy4tXVwtn4CwSb7B5T9vVwhk4i8y7fd7kc+kWTX53+xv0G1v0WUXxKDhjAAAAAElFTkSuQmCC"
                    className="header-badge"
                  />
                )}
                {pinned === 1 && (
                  <span className="pin-on">
                    <img
                      src="data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxwYXRoIGZpbGw9InRyYW5zcGFyZW50IiBkPSJNMCAwSDE0MDBWMjkzMEgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQwMCAtMTcwKSIvPgogICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wIDBIMjRWMjRIMHoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00MDAgLTE3MCkgdHJhbnNsYXRlKDQwMCAxNTkpIHRyYW5zbGF0ZSgwIDExKSIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNFMTAwMkEiIGQ9Ik0xNi4wNjMgM3YyLjhsLTIuMTk3LS4wMDEuMDAxIDMuMzY1YzIuODc5LjUzIDUuMDE0IDIuMjU1IDUuMTI4IDQuMzI0bC4wMDUuMTc1LTYuMjA0LS4wMDF2Ny4wMWgtLjkzM3YtNy4wMUw1IDEzLjY2M2MwLTIuMTQ2IDIuMTczLTMuOTU0IDUuMTMzLTQuNDk5VjUuOEw4LjU5NyA1LjhWM2g3LjQ2NnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00MDAgLTE3MCkgdHJhbnNsYXRlKDQwMCAxNTkpIHRyYW5zbGF0ZSgwIDExKSByb3RhdGUoNDUgMTIgMTEuODM2KSIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K"
                      className="ui image"
                    />
                  </span>
                )}
                {title}
              </div>
              <div className="survey-read-side mb0">
                <div className="title-area">
                  <div
                    className="ui label onlytext"
                    onClick={openProfile}
                    style={{ cursor: 'pointer' }}
                  >
                    {name}
                  </div>
                  <div className="ui label onlytext">
                    <span>
                      {time && moment(time).format('YYYY.MM.DD HH:MM')}
                    </span>
                  </div>
                  <div className="ui label onlytext">
                    <span className="header-span-first">
                      <PolyglotText
                        defaultString="조회수"
                        id="Collage-TaskPostViewDetailHeader-조회수"
                      />
                    </span>
                    <span>{readCount}</span>
                  </div>
                </div>
                <div className="right-area">
                  <div className="ui onlytext">
                    {canNotice && reply && pinned !== 2 && (
                      <Button
                        className="ui button icon postset pin"
                        onClick={() =>
                          onClickPostsPinned(
                            taskDetail.id,
                            pinned === 1 ? 0 : 1
                          )
                        }
                      >
                        <i area-hidden="true" className="icon pin pin16" />
                        {pinned === 0 ? (
                          <span>
                            <PolyglotText
                              defaultString="Pin 고정"
                              id="Collage-TaskPostViewDetailHeader-Pin 고정"
                            />
                          </span>
                        ) : (
                          <span>
                            <PolyglotText
                              defaultString="Pin 해제"
                              id="Collage-TaskPostViewDetailHeader-Pin 해제"
                            />
                          </span>
                        )}
                      </Button>
                    )}
                    {onClickModify && isPostWriter && (
                      <Button
                        icon
                        className="ui button icon postset edit2"
                        onClick={handelClickModify}
                      >
                        <i area-hidden="true" className="icon edit2" />
                        <PolyglotText
                          defaultString="Edit"
                          id="Collage-TaskPostViewDetailHeader-Edit"
                        />
                      </Button>
                    )}
                    {deletable && isPostWriter && (
                      <Button
                        icon
                        className="ui button icon postset delete"
                        onClick={handelClickDelete}
                      >
                        <i area-hidden="true" className="icon delete" />
                        <PolyglotText
                          defaultString="Delete"
                          id="Collage-TaskPostViewDetailHeader-Delete"
                        />
                      </Button>
                    )}
                    {/* {reply && (
                    <Button
                      icon
                      className="ui button icon postset delete"
                      onClick={handelClickReplies}
                    >
                      <i area-hidden = "true" className="icon reply2" />
                      Reply
                    </Button>
                  )} */}
                    <Button
                      icon
                      className="ui button icon postset list2"
                      onClick={onClickList}
                    >
                      <i area-hidden="true" className="icon list2" />
                      <PolyglotText
                        defaultString="List"
                        id="Collage-TaskPostViewDetailHeader-List"
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CommunityProfileModal
          open={profileOpen}
          setOpen={setProfileOpen}
          userProfile={profileInfo && profileInfo.profileImg}
          memberId={profileInfo && profileInfo.id}
          introduce={profileInfo && profileInfo.introduce}
          nickName={profileInfo && profileInfo.nickName}
          name={profileInfo && profileInfo.creatorName}
        />
        {/* <div className="class-guide-txt fn-parents ql-snow">
          <div className="text ql-editor">
            <p>1234</p>
          </div>
        </div> */}
      </>
    );
  };

export default LectureTaskDetailContentHeaderView;
