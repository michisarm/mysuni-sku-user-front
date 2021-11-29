import React, { useEffect, useState } from 'react';
import LectureWebpage from '../../viewModel/LectureWebpage';
import DefaultImg from '../../../../style/media/default-thumbnail.png';
import { Action, ActionType, Area } from 'tracker/model';
import { PolyglotText } from '../../../../shared/ui/logic/PolyglotText';
import { PageElement } from '../../../shared/model/PageElement';
import { findAvailablePageElementsCache } from '../../../shared/api/arrangeApi';

interface Props {
  action?: () => void;
}

const PUBLIC_URL = process.env.PUBLIC_URL;

const LectureCohortView: React.FC<LectureWebpage & Props> =
  function LectureCohortView({ title, description, image, url, action }) {
    const [menuAuth, setMenuAuth] = useState<PageElement[]>([]);

    useEffect(() => {
      const fetchMenu = async () => {
        const response = await findAvailablePageElementsCache();
        if (response !== undefined) {
          setMenuAuth(response);
        }
      };
      fetchMenu();
    }, []);

    return (
      <div className="lms-open-graph">
        <img src={image ? image : DefaultImg} className="lms-open-image" />
        <div className="lms-open-con">
          <div className="lms-open-title">{title}</div>
          <div className="lms-open-copy">{description}</div>
          {(menuAuth.some(
            (pagemElement) =>
              pagemElement.position === 'TopMenu' &&
              pagemElement.type === 'Community'
          ) && (
            <a
              href={`${PUBLIC_URL}` + url}
              className="lms-open-link"
              target="_blank"
              id="webpage-link"
              onClick={action}
              data-area={Area.CUBE_CONTENT}
              data-action={Action.CLICK}
              data-action-type={ActionType.STUDY}
              data-action-external-link={`${PUBLIC_URL}` + url}
              data-action-name="학습하기 클릭"
            >
              <PolyglotText
                defaultString="커뮤니티로 이동"
                id="Collage-Cohort-커뮤니티"
              />
            </a>
          )) ||
            null}
        </div>
      </div>
    );
  };

export default LectureCohortView;
