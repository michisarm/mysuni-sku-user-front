import React from 'react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import AplService from 'myTraining/present/logic/AplService';
import { ContentLayout } from 'shared';
import AplCreateFormContainer from './aplCreateForm/AplCreateFormContainer';
import AplCreateModalContainer from './aplCreateModal/AplCreateModalContainer';
import { AplCreateHeaderView } from 'myTraining/aplCreate/AplCreateHeaderView';
import { getPolyglotText } from '../../shared/ui/logic/PolyglotText';

@observer
@reactAutobind
class AplCreatePage extends React.Component {
  componentDidMount() {
    document.body.classList.add('white');

    const aplService = AplService.instance;
    aplService.clearApl();
    aplService.changeAplProps('requestHour', 0);
    aplService.changeAplProps('requestMinute', 0);
  }

  componentWillUnmount() {
    document.body.classList.remove('white');
    AplService.instance.clearApl();
  }

  render() {
    return (
      <>
        <ContentLayout
          breadcrumb={[
            { text: getPolyglotText('개인학습', '개학등록-승인요청-개인학습') },
            { text: getPolyglotText('Create', '개학등록-승인요청-create') },
          ]}
        >
          <AplCreateHeaderView />
          <AplCreateFormContainer />
        </ContentLayout>
        <AplCreateModalContainer />
      </>
    );
  }
}

export default AplCreatePage;
