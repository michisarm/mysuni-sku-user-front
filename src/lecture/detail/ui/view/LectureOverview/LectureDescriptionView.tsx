import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import classNames from 'classnames';
import './LectureDescriptionView.css';
import { Area } from 'tracker/model';
import { getPolyglotText } from '../../../../../shared/ui/logic/PolyglotText';

interface LectureDescriptionViewProps {
  htmlContent: string;
  overviewClass?: string;
}

function LectureDescriptionView({
  htmlContent,
  overviewClass,
}: LectureDescriptionViewProps) {
  const [descriptionOpen, setDescriptionOpen] = useState<boolean>(true);
  const [showMoreButton, setShowMoreButton] = useState<boolean>(false);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const toggleMore = useCallback(() => {
    setDescriptionOpen(!descriptionOpen);
  }, [descriptionOpen]);

  useEffect(() => {
    // Overview 숨김 기능 없어짐
    // const textContainer = textContainerRef.current;
    // if (textContainer !== null) {
    //   if (textContainer.clientHeight < textContainer.scrollHeight) {
    //     setShowMoreButton(true);
    //   } else {
    //     const { ResizeObserver } = window as any;
    //     if (ResizeObserver !== undefined) {
    //       const resizeObserver = new ResizeObserver(() => {
    //         if (showMoreButton) {
    //           return;
    //         }
    //         if (textContainer.clientHeight < textContainer.scrollHeight) {
    //           setShowMoreButton(true);
    //           resizeObserver.unobserve(textContainer);
    //         }
    //       });
    //       resizeObserver.observe(textContainer);
    //     } else {
    //       setShowMoreButton(true);
    //     }
    //   }
    // }
  }, [descriptionOpen, showMoreButton]);
  return (
    <div
      className={`${
        overviewClass ? overviewClass : 'class-guide-txt fn-parents ql-snow'
      }`}
      data-area={Area.CUBE_OVERVIEW}
    >
      <div
        className={`${descriptionOpen ? '' : 'text'} description ql-editor`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        ref={textContainerRef}
      />
      {showMoreButton === true && (
        <Button
          icon
          className={classNames('right btn-blue fn-more-toggle')}
          onClick={toggleMore}
        >
          {descriptionOpen === true
            ? getPolyglotText('hide', 'cube-Description-hide')
            : getPolyglotText('more', 'cube-Description-more')}{' '}
          <Icon
            className={classNames({
              more2: descriptionOpen !== true,
              hide2: descriptionOpen === true,
            })}
          />
        </Button>
      )}
    </div>
  );
}

export default LectureDescriptionView;
