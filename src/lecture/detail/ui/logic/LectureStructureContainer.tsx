import React from 'react';
import {
  useIsLoadingState,
  useLectureStructure,
} from '../../store/LectureStructureStore';
import LectureStructureView from '../view/LectureStructureView/LectureStructureView';
import { Segment } from 'semantic-ui-react';
import { Loadingpanel } from 'shared';

function LectureStructureContainer() {
  const lectureStructure = useLectureStructure();
  const loadingState = useIsLoadingState();

  return (
    <>
      {loadingState?.isLoading ? (
        <Segment
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            height: 550,
            boxShadow: '0 0 0 0',
            border: 0,
          }}
        >
          <Loadingpanel loading={loadingState?.isLoading} color="#ffffff" />
        </Segment>
      ) : (
        <>
          {lectureStructure && (
            <LectureStructureView lectureStructure={lectureStructure} />
          )}
        </>
      )}
    </>
  );
}

export default LectureStructureContainer;
