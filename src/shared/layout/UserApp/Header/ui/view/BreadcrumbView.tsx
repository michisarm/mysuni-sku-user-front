
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { BreadcrumbValue } from '../../..';


interface Props {
  values: BreadcrumbValue[];
}


class BreadcrumbView extends Component<Props> {
  //
  render() {
    //
    const { values } = this.props;

    return (
      <div className="breadcrumbs">
        <div className="cont-inner">
          <div className="ui standard breadcrumb">
            <Link to="/" className="section">
              Home
            </Link>
            <i className="right chevron icon divider" />

            { values.map((value, index) => (
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
        </div>
      </div>
    );
  }
}

export default BreadcrumbView;
