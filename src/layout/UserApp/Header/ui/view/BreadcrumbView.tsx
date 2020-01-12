
import React, { Component, Fragment } from 'react';
import { reactAutobind, axiosApi, setCookie } from '@nara.platform/accent';
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
    // id: 'SKCC.07746@sk.com',
    id: 'SKCC.07750@sk.com',
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

          setCookie('token', accessToken);
          setCookie('workspaces', JSON.stringify(data.workspaces));
          setCookie('displayName', data.displayName);
          setCookie('email', this.state.id);
          setCookie('cineroomId', data.workspaces.cineroomWorkspaces[data.workspaces.cineroomWorkspaces.length - 1].id);
          if (data.additionalInformation && data.additionalInformation.companyCode) {
            setCookie('companyCode', data.additionalInformation.companyCode);
          }
          window.location.href = window.location.href;
        }
      });

  }

  renderItem(value: BreadcrumbValue, index: number) {
    //
    const { values } = this.props;
    const isLast = values && index === values.length - 1;

    if (isLast) {
      if (value.path) {
        return <Link to={value.path} className="section active">{value.text}</Link>;
      }
      else {
        return <div className="section active">{value.text}</div>;
      }
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
                  <input
                    style={{
                      width: 200,
                      fontSize: 'small',
                    }}
                    value={this.state.id}
                    onChange={(e) => this.setState({ id: e.target.value })}
                  />
                  &nbsp;
                  <button style={{ fontSize: 'small' }} onClick={this.onLogin}>로그인</button>
                  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                </>
              )
            }

            <Link to={supportPath}>
              <i className="support12 icon" />
              <span>Support</span>
              <i className="arrow8 black-jump icon" />
            </Link>
            <div className="help-desk"><i aria-hidden="true" className="icon help-tel" />Help Desk : 02-6323-9002</div>
          </div>
        </div>
      </div>
    );
  }
}

export default BreadcrumbView;
