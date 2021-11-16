import React, { useEffect, useState } from 'react';
import { getCookie, setCookie } from '@nara.platform/accent';
import { SkProfileService } from '../../../profile/stores';
import TutorialModalZh from './sub/zh';
import TutorialModalEn from './sub/en';
import TutorialModalKo from './sub/ko';
import '../../style.css';

export interface TutorialProps {
  open: boolean;
  onClose: () => void;
  activeMenu: string;
  onChangeActiveMenu: (activeMenu: string) => void;
  isShowTutorial: string;
  onChangeIsShowTutorial: (isShow: string) => void;
}

export const TutorialModal = () => {
  //
  const [open, setOpen] = useState<boolean>(true);
  const [activeMenu, setActiveMenu] = useState<string>('tu01');
  const [isShowTutorial, setIsShowTutorial] = useState<string>('');
  const language = SkProfileService.instance.skProfile.language;

  const onClose = () => {
    //
    if (isShowTutorial === 'HIDE') {
      setCookie('isShowTutorial', 'HIDE');
    }

    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      const isShowTutorial = getCookie('isShowTutorial');
      if (
        isShowTutorial === null ||
        isShowTutorial === '' ||
        isShowTutorial === 'SHOW'
      ) {
        setCookie('isShowTutorial', 'SHOW');
      } else {
        setOpen(false);
      }
    }
  }, [open]);

  const tutorialProps = {
    open,
    onClose,
    activeMenu,
    onChangeActiveMenu: setActiveMenu,
    isShowTutorial,
    onChangeIsShowTutorial: setIsShowTutorial,
  };

  if (language === 'Chinese') {
    return <TutorialModalZh {...tutorialProps} />;
  } else if (language === 'English') {
    return <TutorialModalEn {...tutorialProps} />;
  } else if (language === 'Korean') {
    return <TutorialModalKo {...tutorialProps} />;
  }

  return null;
};
