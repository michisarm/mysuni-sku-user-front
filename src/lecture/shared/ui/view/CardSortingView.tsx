
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Form, Radio } from 'semantic-ui-react';
import { OrderByType } from '../../../model';


interface Props {
  value: string,
  onChange: (e: any, data: any) => void,
  collegeOrder?: boolean,
}

@reactAutobind
class CardSortingView extends Component<Props> {
  //
  render() {
    //
    const { value, onChange, collegeOrder } = this.props;
    const prevChannelSort: any = sessionStorage.getItem('channelSort');

    return (
      <div className="comments-sort">
        <Form className="comments-sort">
          <Form.Group inline>
            {collegeOrder && (
              <Form.Field>
                <Radio
                  className="base"
                  label="편성순"
                  name="sortRadioGroup"
                  value={OrderByType.collegeOrder}
                  checked={prevChannelSort === OrderByType.collegeOrder || value === OrderByType.collegeOrder}
                  onClick={onChange}
                />
              </Form.Field>
            )}
            <Form.Field>
              <Radio
                className="base"
                label="최신순"
                name="sortRadioGroup"
                value={OrderByType.Time}
                checked={prevChannelSort === OrderByType.Time || value === OrderByType.Time}
                onClick={onChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                className="base"
                label="이수순"
                name="sortRadioGroup"
                value={OrderByType.StudentCount}
                checked={prevChannelSort === OrderByType.StudentCount || value === OrderByType.StudentCount}
                onClick={onChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                className="base"
                label="별점순"
                name="sortRadioGroup"
                value={OrderByType.Star}
                checked={prevChannelSort === OrderByType.Star || value === OrderByType.Star}
                onClick={onChange}
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default CardSortingView;
