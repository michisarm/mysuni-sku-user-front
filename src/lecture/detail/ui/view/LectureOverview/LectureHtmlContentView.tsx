import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import classNames from 'classnames';

interface LectureHtmlContentViewProps {
  htmlContent: string;
  rootId?: string;
}

function LectureHtmlContentView({
  htmlContent,
  rootId,
}: LectureHtmlContentViewProps) {
  const [descriptionOpen, setDescriptionOpen] = useState<boolean>();
  const [showMoreButton, setShowMoreButton] = useState<boolean>();
  const textContainerRef = useRef<HTMLDivElement>(null);
  const toggleMore = useCallback(() => {
    setDescriptionOpen(!descriptionOpen);
  }, [descriptionOpen]);
  useEffect(() => {
    const textContainer = textContainerRef.current;
    if (textContainer !== null) {
      if (textContainer.clientHeight < textContainer.scrollHeight) {
        setShowMoreButton(true);
      } else {
        const { ResizeObserver } = window as any;
        if (ResizeObserver !== undefined) {
          const resizeObserver = new ResizeObserver(() => {
            if (showMoreButton) {
              return;
            }
            if (textContainer.clientHeight < textContainer.scrollHeight) {
              setShowMoreButton(true);
              resizeObserver.unobserve(textContainer);
            }
          });
          resizeObserver.observe(textContainer);
        } else {
          setShowMoreButton(true);
        }
      }
    }
  }, []);
  return (
    <div className="class-guide-txt fn-parents ql-snow" id={rootId}>
      <div
        className={`${descriptionOpen ? '' : 'text'} description`}
        // className={`${descriptionOpen ? '' : 'text'} description ql-editor`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        ref={textContainerRef}
      />
      {showMoreButton === true && (
        <Button
          icon
          className={classNames('right btn-blue fn-more-toggle')}
          onClick={toggleMore}
        >
          {descriptionOpen === true ? 'hide' : 'more'}{' '}
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

export default LectureHtmlContentView;
