import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { patronInfo } from '@nara.platform/dock';
import {
  Button,
  Form,
  Icon,
  Modal,
  Pagination,
  Radio,
  Table,
} from 'semantic-ui-react';
import { SharedService } from 'shared/stores';
import CreateCubeService from '../../../personalcube/present/logic/CreateCubeService';
import { InternalMediaConnection } from '../../../../lecture/model/InternalMediaConnection';

function PanoptoListModal() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    changeCubeSdoProps,
    cubeSdo,
    panoptoCdo,
    panopto,
    changePanoptoCdoProps,
    setPanoptoProps,
    findPanopToList,
  } = CreateCubeService.instance;

  const { setPage, setPageMap, setCount, pageMap } = SharedService.instance;

  const InternalMedia =
    cubeSdo.materialSdo?.mediaSdo.meidaContents?.internalMedias;

  useEffect(() => {
    findAllPanoptos();
  }, []);

  const findAllPanoptos = (page?: number) => {
    const patronEmail = patronInfo.getPatronEmail() || '';

    if (page) {
      setPage('panopto', page);
      changePanoptoCdoProps('currentPage', page);
      changePanoptoCdoProps('folderOwnerId', patronEmail);
    } else {
      setPageMap('panopto', 0, Number(panoptoCdo.page_size));
    }

    findPanopToList(panoptoCdo).then(() => {
      const totalCount = InternalMedia?.length;
      if (totalCount) {
        setCount('panopto', totalCount);
      }
    });
  };

  const selectPanopto = (panopto: InternalMediaConnection) => {
    panopto.viewUrl = panopto.viewUrl.replace('Viewer', 'Embed');
    setPanoptoProps(panopto);
  };

  const handleOK = () => {
    changeCubeSdoProps('materialSdo.mediaSdo.meidaContents.internalMedias', [
      panopto,
    ]);
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="ui input file">
        {InternalMedia && InternalMedia.length > 0 ? (
          InternalMedia.map((internalMedia, index: number) => (
            <input
              key={index}
              type="text"
              value={internalMedia.name}
              readOnly
            />
          ))
        ) : (
          <input type="text" placeholder="영상을 업로드해주세요." readOnly />
        )}
        <Icon className="clear link" />
        <label
          htmlFor="hidden-new-file"
          className="ui button"
          onClick={handleOpen}
        >
          파일찾기
        </label>
      </div>
      <Modal className="base w700" open={isOpen} onClose={() => handleClose}>
        <Modal.Header className="res">
          파일 찾기
          <span className="sub f12">파일을 선택해 주세요.</span>
        </Modal.Header>
        <Modal.Content>
          <div className="scrolling-60vh">
            <Table className="head-fix cr-03-p01">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell scope="col" />
                  <Table.HeaderCell scope="col">File Name</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {(InternalMedia &&
                  InternalMedia.map((panopto, index) => (
                    <Table.Row key={index}>
                      <Table.Cell textAlign="center">
                        <Form.Field
                          control={Radio}
                          onChange={() => selectPanopto(panopto)}
                          checked={
                            panopto &&
                            panopto.panoptoSessionId ===
                              panopto.panoptoSessionId
                          }
                        />
                      </Table.Cell>
                      <Table.Cell>{panopto.name}</Table.Cell>
                      {/* <Table.Cell>{panopto.duration}</Table.Cell>
                    <Table.Cell>{panopto.folderName}</Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => this.goToVieo(panopto.viewUrl)}>Play</Button>
                    </Table.Cell>*/}
                    </Table.Row>
                  ))) ||
                  null}
              </Table.Body>
            </Table>
            {InternalMedia?.length === 0 && (
              <div className="center">
                <Pagination
                  activePage={
                    pageMap.get('panopto') ? pageMap.get('panopto').page : 1
                  }
                  totalPages={
                    pageMap.get('panopto')
                      ? pageMap.get('panopto').totalPages
                      : 1
                  }
                  onPageChange={(e, data) =>
                    findAllPanoptos(data.activePage as number)
                  }
                />
              </div>
            )}
          </div>
          {/* <div className="right-filter">
          <select className="ui small-border dropdown">
            <option value="All">내 폴더</option>
            <option value="a">내 컬리지 폴더</option>
            <option value="b">내 회사 컬리지 폴더</option>
          </select>
        </div>*/}
        </Modal.Content>
        <Modal.Actions className="actions2">
          <Button className="pop2 d" onClick={handleClose} type="button">
            Cancel
          </Button>
          <Button className="pop2 p" primary onClick={handleOK} type="button">
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

const PanoptoListModalDefault = observer(PanoptoListModal);

export default PanoptoListModalDefault;
