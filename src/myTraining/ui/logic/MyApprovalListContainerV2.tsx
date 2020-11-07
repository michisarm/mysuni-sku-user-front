import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { mobxHelper, Offset } from '@nara.platform/accent';
import { AplService } from 'myTraining/stores';
import MyApprovalContentType from '../model/MyApprovalContentType';
import { AplModel } from 'myTraining/model';
import { SeeMoreButton } from 'lecture';
import { ListLeftTopPanel, ListRightTopPanel, ListTopPanelTemplate } from '../view/panel';
import { MyLearningTableBody, MyLearningTableHeader, MyLearningTableTemplate } from '../view/table';
import { NoSuchContentPanelMessages } from '../model';
import { NoSuchContentPanel } from 'shared';


interface Props {
  contentType: MyApprovalContentType;
  aplService?: AplService;
}

interface RouteParams {
  tab: string;
  pageNo?: string;
}

function MyApprovalListContainerV2(props: Props) {
  /* props */
  const { contentType, aplService } = props;
  const { aplCount } = aplService!;

  const history = useHistory();
  const { pageNo } = useParams<RouteParams>();

  /* states */
  const [showSeeMore, setShowSeeMore] = useState<boolean>(false);
  const [viewType, setViewType] = useState<ApprovalViewType>('');

  const pageInfo = useRef<Offset>({ offset: 0, limit: 20 });

  /* effects */

  useEffect(() => {
    initPage();
    fetchModelsByViewType(viewType);

    return () => clearStore();
  }, [viewType]);

  /* functions */
  const initPage = () => {
    initPageInfo();
    initPageNo();
  };

  const initPageInfo = (): void => {
    pageInfo.current = { offset: 0, limit: 20 };
  };

  const initPageNo = (): void => {
    history.replace('./1');
  };

  const getPageNo = (): number => {
    const currentPageNo = pageNo;
    if (currentPageNo) {
      const nextPageNo = parseInt(currentPageNo) + 1;
      return nextPageNo;
    }

    return 1;
  }

  const clearStore = (): void => {
    aplService!.clearApls();
  };

  const initStore = (): void => {
    aplService!.initQueryModel();
  };

  const fetchModelsByViewType = async (viewType: ApprovalViewType) => {
    initStore();
    await aplService!.findAllAplsForApproval(viewType);
    checkShowSeeMore();
  }

  const getModels = (): AplModel[] => {
    const { apls: offsetApl } = aplService!;
    return offsetApl.results;
  };

  const getTotalCount = (): number => {
    const { apls: offsetApl } = aplService!;
    return offsetApl.totalCount;
  };

  const isModelExist = (): boolean => {
    const { apls: offsetApl } = aplService!;
    return (offsetApl.results && offsetApl.results.length) ? true : false;
  };

  const checkShowSeeMore = () => {
    const models = getModels();
    const totalCount = getTotalCount();

    if (models.length >= totalCount) {
      setShowSeeMore(false);
      return;
    }
    if (totalCount <= PAGE_SIZE) {
      setShowSeeMore(false);
      return;
    }

    setShowSeeMore(true);
  };

  /* handlers */
  const onChangeViewType = useCallback((e: any, data: any) => {
    setViewType(data.value);
  }, []);

  const onClickSeeMore = useCallback(async () => {
    pageInfo.current.offset += pageInfo.current.limit;
    pageInfo.current.limit = PAGE_SIZE;
    await aplService!.findAllAplsWithPage(pageInfo.current);

    checkShowSeeMore();
    history.replace(`./${getPageNo()}`);
  }, []);

  /* render functions */
  const renderNoSuchContentPanel = (contentType: MyApprovalContentType) => {
    const message = NoSuchContentPanelMessages.getMessageByConentType(contentType);

    return <NoSuchContentPanel message={message} />;
  };

  /* render */
  return (
    <div className="confirm-list-wrap">
      <ListTopPanelTemplate
        className="list-top"
        contentType={MyApprovalContentType.PersonalLearning}
      >
        {isModelExist() &&
          (
            <ListLeftTopPanel
              contentType={contentType}
              countModel={aplCount}
            />
          )
        }
        <ListRightTopPanel
          contentType={contentType}
          checkedViewType={viewType}
          onChangeViewType={onChangeViewType}
        />
      </ListTopPanelTemplate>
      {isModelExist() &&
        (
          <MyLearningTableTemplate
            contentType={contentType}
          >
            <MyLearningTableHeader
              contentType={contentType}
            />
            <MyLearningTableBody
              contentType={contentType}
              totalCount={getTotalCount()}
              models={getModels()}
            />
          </MyLearningTableTemplate>
        ) || renderNoSuchContentPanel(contentType)
      }
      {showSeeMore &&
        (
          <SeeMoreButton
            onClick={onClickSeeMore}
          />
        )
      }
    </div>
  );
}

export default inject(mobxHelper.injectFrom(
  'myTraining.aplService'
))(observer(MyApprovalListContainerV2));

/* globals */
export type ApprovalViewType = '' | 'OpenApproval' | 'Opened' | 'Rejected';
const PAGE_SIZE = 20;