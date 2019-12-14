import * as React from 'react';
import { Segment } from 'semantic-ui-react';
import { ContentLayout } from '../../../shared';

class CreateDetailContainer extends React.Component {
  render() {
    return (
      <ContentLayout className="bg-white">
        <div className="add-personal-learning support">
          <div className="add-personal-learning-wrap">
            <div className="apl-tit">Create</div>
            <div className="apl-notice">
              내가 갖고 있는 지식을 강좌로 만들 수 있습니다.<br />관리자의 확인 절차를 거쳐 다른 University 사용자에게 전파해보세요.
            </div>
          </div>
        </div>
        <Segment className="full" />
        {/*<section className='content bg-white'>*/}
        {/* <TitleArea/>
        <ContentsArea/>*/}
      </ContentLayout>
    );
  }
}

export default CreateDetailContainer;
