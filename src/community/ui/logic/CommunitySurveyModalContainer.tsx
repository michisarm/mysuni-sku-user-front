import React, { Component, useCallback, useEffect, useState } from 'react';
import { reactAlert } from '@nara.platform/accent';
import { Button, Modal, Pagination, Radio } from 'semantic-ui-react';
import { IdName } from 'shared/model';
import { CollegeService } from 'college/stores';
import { requestCommunitySurvey } from 'community/service/useCommunityMenu/requestCommunity';
import classNames from 'classnames';
import Calendar from '../view/CommunityAdmin/Calendar';
import { SearchBox } from 'community/model/SearchBox';
import moment from 'moment';

interface Props {
  collegeService?: CollegeService;
  trigger: React.ReactNode;
  defaultSelectedChannel: IdName | null;
  searchBox: SearchBox;
  onConfirmChannel: (surveyId: string) => void;
}

const CommunitySurveyModalContainer: React.FC<Props> =
  function CommunitySurveyModalContainer({
    trigger,
    searchBox,
    onConfirmChannel,
  }) {
    const [open, setOpen] = useState<boolean>(false);
    const [activePage, setActivePage] = useState<number>(1);
    const [totalPage, setTotalPage] = useState<number>(1);
    const [surveyData, setSurveyData] = useState<any>();
    const [searchText, setSearchText] = useState<string>('');
    const [selectedRow, setSelectedRow] = useState<string>();

    useEffect(() => {
      if (open === true) {
        findSurvey('');
        setActivePage(1);
      }
    }, [open]);

    const findSurvey = useCallback(
      (name: string, offset?: number) => {
        if (searchBox !== undefined) {
          const params = {
            name,
            offset: offset ? offset : 0,
            limit: 5,
            startDate: searchBox!.startDate,
            endDate: searchBox!.endDate,
          };
          requestCommunitySurvey(params).then((result) => {
            setSurveyData(result.data.results);
            totalPages(result.data.totalCount);
          });
        }
      },
      [searchText, searchBox]
    );

    const totalPages = (test: number) => {
      let totalpage = Math.ceil(test / 5);
      if (test % 5 < 0) {
        totalpage++;
      }
      setTotalPage(totalpage);
    };

    const onOpen = useCallback(() => {
      setOpen(true);
    }, []);

    const onClose = useCallback(() => {
      setOpen(false);
    }, []);

    const onPageChange = useCallback((data: any, searchText: string) => {
      setActivePage(data.activePage);
      findSurvey(searchText, (data.activePage - 1) * 5);
    }, []);

    const onCancel = useCallback(() => {
      onClose();
    }, []);

    const onConfirm = useCallback(() => {
      if (!selectedRow) {
        reactAlert({
          title: '',
          message: '설문을 선택해주세요.',
        });
      }
      surveyData.map((item: any, index: number) => {
        if (selectedRow === item.id) {
          onConfirmChannel(item);
          onClose();
        }
      });
    }, [selectedRow, surveyData]);

    const handleRadioChange = useCallback((id: string) => {
      setSelectedRow(id);
    }, []);

    const handleSubmitClick = useCallback(
      (searchText) => {
        findSurvey(searchText);
        setActivePage(1);
      },
      [searchBox]
    );

    function renderSurveyRow(item: any, index: number) {
      if (item !== undefined) {
        const createTime = moment(item.time).format('YYYY.MM.DD');

        return (
          <tr key={index}>
            <td>
              <Radio
                name="radioGroup"
                value={item.id}
                checked={selectedRow === item.id}
                onChange={() => handleRadioChange(item.id)}
              />
            </td>
            <td>{item.titles.langStringMap[item.titles.defaultLanguage]}</td>
            <td>
              {
                item.formDesigner.names.langStringMap[
                  item.formDesigner.names.defaultLanguage
                ]
              }
            </td>
            <td>{createTime}</td>
          </tr>
        );
      }
    }
    return (
      <Modal
        className="base w1000 inner-scroll"
        open={open}
        trigger={trigger}
        onOpen={onOpen}
        onClose={onClose}
      >
        <Modal.Header>
          <span>Survey 찾기</span>
          <button className="admin_popup_close" onClick={onClose}>
            <img
              src={`${process.env.PUBLIC_URL}/images/all/icon-reply-16-px.svg`}
            />
          </button>
        </Modal.Header>
        <Modal.Content className="admin_popup_add scrolling-60vh">
          <p className="menuAdd_title">
            Manager에서 등록한 Survey가 표시됩니다.
          </p>
          <table className="ui admin_table_search sub">
            <colgroup>
              <col width="100px" />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th>등록일자</th>
                <td style={{ textAlign: 'left' }}>
                  <Calendar searchBox={searchBox!} defaultSearchType="years" />
                </td>
              </tr>
              <tr>
                <th>검색어</th>
                <td style={{ textAlign: 'left' }}>
                  <div className={classNames('ui input admin_text_input add')}>
                    <input
                      type="text"
                      placeholder="설문조사 제목을 입력해주세요.​"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button
                      type="button"
                      className="ui button admin_text_button"
                      onClick={() => handleSubmitClick(searchText)}
                    >
                      검색
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          {surveyData !== undefined && (
            <div>
              <table className="ui admin_table sub survey_popup_table">
                <thead>
                  <tr>
                    <th />
                    <th>제목</th>
                    <th>등록자</th>
                    <th>등록일</th>
                  </tr>
                </thead>
                <tbody>
                  {surveyData.map((item: any, index: number) => {
                    return renderSurveyRow(item, index);
                  })}
                </tbody>
              </table>
            </div>
          )}
          <div className="lms-paging-holder">
            <Pagination
              activePage={activePage}
              totalPages={totalPage}
              firstItem={null}
              lastItem={null}
              onPageChange={(e, data) => onPageChange(data, searchText)}
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button type="button" className="w190 pop d" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="button" className="w190 pop p" onClick={onConfirm}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

export default CommunitySurveyModalContainer;
