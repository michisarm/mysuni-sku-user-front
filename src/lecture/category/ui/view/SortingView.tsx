
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Form, Radio } from 'semantic-ui-react';


interface Props {
  value: string,
  onChange: (e: any, data: any) => void,
}

@reactAutobind
class SortingView extends Component<Props> {
  //
  render() {
    //
    const { value, onChange } = this.props;

    return (
      <div className="comments-sort">
        <Form className="comments-sort">
          <Form.Group inline>
            <Form.Field>
              <Radio
                className="base"
                label="최신순"
                name="sortRadioGroup"
                value="latest"
                checked={value === 'latest'}
                onChange={onChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                className="base"
                label="이수순"
                name="sortRadioGroup"
                value="complete"
                checked={value === 'complete'}
                onChange={onChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                className="base"
                label="별점순"
                name="sortRadioGroup"
                value="score"
                checked={value === 'score'}
                onChange={onChange}
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default SortingView;
