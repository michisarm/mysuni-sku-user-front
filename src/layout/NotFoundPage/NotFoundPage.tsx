
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Image } from 'semantic-ui-react';


interface Props extends RouteComponentProps {
}

@reactAutobind
class NotFoundPage extends Component<Props> {
  //
  onClickPrev() {
    this.props.history.goBack();
  }

  render() {
    //
    return (
      <section className="center-content bg-white full">
        <div className="align error404">
          <div>
            <Image src={`${process.env.PUBLIC_URL}/images/all/404.png`} alt="Not found" />
          </div>
          <div className="not-found-text">페이지를 찾을 수 없습니다.</div>
          <button className="ui button bg fix back" onClick={this.onClickPrev}>이전 페이지로 가기</button>
        </div>
      </section>
    );
  }
}

export default withRouter(NotFoundPage);
