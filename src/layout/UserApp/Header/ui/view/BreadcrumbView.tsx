
import React, { Component, Fragment } from 'react';
import { reactAutobind, axiosApi } from '@nara.platform/accent';
import { Link } from 'react-router-dom';
import { BreadcrumbValue } from '../../../index';


interface Props {
  values?: BreadcrumbValue[];
  supportPath: string;
}

interface State {
  //TODO:: 임시
  id: string
}

@reactAutobind
class BreadcrumbView extends Component<Props, State> {
  //
  state = {
    id: 'SKCC.00003331@sk.com',
  };

  //TODO::삭제해야
  onLogin() {
    const postData = new FormData();
    postData.append('grant_type', 'password');
    postData.append('scope', 'client');
    postData.append('username', this.state.id);
    postData.append('password', '1');

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa('nara:narasecret'),
      },
      noAuth: true,
    };

    return axiosApi.post('/api/checkpoint/oauth/token',
      postData,
      config,
    )
      .then(({ data }: any) => {
        if (data.access_token) {
          const accessToken = data.access_token;

          window.sessionStorage.setItem('token', accessToken);
          window.sessionStorage.setItem('workspaces', JSON.stringify(data.workspaces));
          window.sessionStorage.setItem('displayName', data.displayName);
          window.sessionStorage.setItem('email', this.state.id);
          window.sessionStorage.setItem('cineroomId', data.workspaces.cineroomWorkspaces[data.workspaces.cineroomWorkspaces.length - 1].id);
          if (data.additionalInformation && data.additionalInformation.companyCode) {
            window.sessionStorage.setItem('companyCode', data.additionalInformation.companyCode);
          }
        }
      });

  }

  renderItem(value: BreadcrumbValue, index: number) {
    //
    const { values } = this.props;
    const isLast = values && index === values.length - 1;

    if (isLast) {
      return <div className="section active">{value.text}</div>;
    }
    else if (value.path) {
      return <Link to={value.path} className="section">{value.text}</Link>;
    }
    else {
      return <a>{value.text}</a>;
    }
  }


  render() {
    //
    const { values, supportPath } = this.props;

    return (
      <div className="breadcrumbs">
        <div className="cont-inner">
          <div className="ui standard breadcrumb">
            <Link to="/" className="section">
              Home
            </Link>

            { Array.isArray(values) && values.map((value, index) => (
              <Fragment key={`breadcrumb_${index}`}>
                <i className="right chevron icon divider" />

                {this.renderItem(value, index)}
              </Fragment>
            ))}
          </div>

          <div className="right">
            {
              process.env.NODE_ENV === 'development' && (
                <>
                  <input value={this.state.id} onChange={(e) => this.setState({ id: e.target.value })} />
                  <button onClick={this.onLogin}>로그인</button>
                </>
              )
            }

            <Link to={supportPath}>
              <i className="support12 icon" />
              <span>Support</span>
              <i className="arrow8 black-jump icon" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BreadcrumbView;
