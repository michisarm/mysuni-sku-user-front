import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { getPolyglotText, PolyglotText } from '../../ui/logic/PolyglotText';

interface Props {
  count: number;
  className?: string;
  countMessage?: string;
}

@reactAutobind
@observer
class ListPanelTopLineContainer extends Component<Props> {
  //
  render() {
    //
    const { className, count, children, countMessage } = this.props;

    function headLineRender() {
      if (countMessage === 'AllBadgeList') {
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                `총 <strong>${
                  count || 0
                }개</strong>의 획득할 수 있는 Badge가 있습니다.`,
                'Certification-bdls-lcnt'
              ),
            }}
          />
        );
      } else if (countMessage === 'ChallengingBadgeList') {
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                `총 <strong>${
                  count || 0
                }개</strong>의 도전중인 Badge가 있습니다.`,
                'Certification-clls-lcnt'
              ),
            }}
          />
        );
      } else if (countMessage === 'EarnedBadgeList') {
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                `총 <strong>${count || 0}개</strong>의 Badge를 획득하였습니다.`,
                'Certification-clls-lcnt'
              ),
            }}
          />
        );
      } else {
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: getPolyglotText(
                `총 <strong>${count || 0}개</strong>의 리스트가 있습니다.`,
                'Create-MainList-리스트'
              ),
            }}
          />
        );
      }
    }

    return (
      <div className={classNames('top-guide-title', className)}>
        <div className="list-number">
          {/* <PolyglotText defaultString="총" id="Create-MainList-총" /> */}
          {/* <PolyglotText defaultString="의" id="Create-MainList-의" /> */}
          {headLineRender()}
        </div>
        {children}
      </div>
    );
  }
}

export default ListPanelTopLineContainer;
