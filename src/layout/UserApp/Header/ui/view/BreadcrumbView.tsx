
import React, { Component, Fragment } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Link } from 'react-router-dom';
import { BreadcrumbValue } from '../../../index';


interface Props {
  values?: BreadcrumbValue[];
  supportPath: string;
}


@reactAutobind
class BreadcrumbView extends Component<Props> {
  //
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
