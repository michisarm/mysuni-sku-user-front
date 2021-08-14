import React, { useCallback, useState } from 'react';
import {
  LectureTestAnswerItem,
  LectureTestItem,
  LectureTestStudentItem,
} from '../../../viewModel/LectureTest';
import { Modal } from 'semantic-ui-react';
import LectureTestPaperView from './LectureTestPaperView';
import LectureParams from '../../../viewModel/LectureParams';
import { getActiveStructureItem } from '../../../utility/lectureStructureHelper';
import { PolyglotText } from 'shared/ui/logic/PolyglotText';

interface LectureTestPaperModalViewProps {
  trigger: React.ReactNode;
  params: LectureParams;
  testItem: LectureTestItem;
  testStudentItem: LectureTestStudentItem;
  answerItem?: LectureTestAnswerItem;
  openView: (view: string) => void;
}

const LectureTestPaperModalView: React.FC<LectureTestPaperModalViewProps> = function LectureTestPaperModalView({
  trigger,
  params,
  testItem,
  testStudentItem,
  answerItem,
  openView,
}) {
  const [open, setOpen] = useState<boolean>(false);
  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onCancel = useCallback(() => {
    onClose();
  }, []);

  const lectureStructureItem = getActiveStructureItem(params.pathname);

  return (
    <>
      {/*<section className="content mylearning">*/}
      <Modal
        open={open}
        trigger={trigger}
        onOpen={onOpen}
        onClose={onClose}
        className="base w1010 inner-scroll"
      >
        <Modal.Header className="res pop">
          {lectureStructureItem?.name}
          <button className="admin_popup_close test_pop" onClick={onClose}>
            <img
              src={`${process.env.PUBLIC_URL}/images/all/icon-close-player-28-px.png`}
            />
            <span>
              <PolyglotText defaultString="Close" id="Test-TestModal-Close" />
            </span>
          </button>
        </Modal.Header>
        <Modal.Content className="test-content-modal">
          <LectureTestPaperView
            params={params}
            testItem={testItem}
            answerItem={answerItem}
            testStudentItem={testStudentItem}
            openView={openView}
            modalGbn={true}
          />
        </Modal.Content>
      </Modal>
      {/*</section>*/}
    </>
  );
};

export default LectureTestPaperModalView;
