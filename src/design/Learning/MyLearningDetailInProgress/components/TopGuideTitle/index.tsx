import React  from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Icon, Button } from 'semantic-ui-react';


interface Props {
}

@reactAutobind
class TopGuideTitle extends React.Component<Props> {
  render() {
    return (
      <div className="top-guide-title">
        <div className="list-number">총 <strong>24개</strong>의 리스트가 있습니다.</div>
        <Button icon className="left post"><Icon className="filter2" />Filter</Button>
      </div>
    );
  }
}

export default TopGuideTitle;
