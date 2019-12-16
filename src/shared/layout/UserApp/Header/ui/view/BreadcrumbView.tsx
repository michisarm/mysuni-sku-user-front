
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbValue } from '../../..';


interface Props {
  values?: BreadcrumbValue[];
  supportPath: string;
}


class BreadcrumbView extends Component<Props> {
  //
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
                { index === values.length - 1 ?
                  <div className="active section">{value.text}</div>
                  :
                  <Link to={value.path || ''} className="section">
                    {value.text}
                  </Link>
                }
              </Fragment>
            ))}
          </div>

          <div className="right">
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
