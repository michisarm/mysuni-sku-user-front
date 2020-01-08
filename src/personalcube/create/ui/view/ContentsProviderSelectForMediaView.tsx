import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { Form } from 'semantic-ui-react';

interface Props extends RouteComponentProps {
  defaultValue?: string
  targetProps?: string
  onSetMediaPropsByJSON: (name: string, value: string) => void
  setContentsProvider: () => []
}

@observer
@reactAutobind
class ContentsProviderSelectForMediaView extends React.Component<Props> {
  //
  render() {

    const { defaultValue, targetProps, onSetMediaPropsByJSON, setContentsProvider } = this.props;
    const contentsProviderTsx = setContentsProvider();
    return (
      <Form.Select
        placeholder="Select..."
        options={contentsProviderTsx}
        onChange={(e: any, data: any) => onSetMediaPropsByJSON(`${targetProps}`, data.value)}
        value={defaultValue && defaultValue}
      />
    );
  }
}

export default withRouter(ContentsProviderSelectForMediaView);
