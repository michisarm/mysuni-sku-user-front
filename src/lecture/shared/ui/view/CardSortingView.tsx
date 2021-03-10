
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
                  checked={value === OrderByType.collegeOrder}
                  onChange={onChange}
                />
              </Form.Field>   
            )}
            <Form.Field>
              <Radio
                className="base"
                label="최신순"
                name="sortRadioGroup"
                value={OrderByType.Time}
                checked={value === OrderByType.Time}
                onChange={onChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                className="base"
                label="이수순"
                name="sortRadioGroup"
                value={OrderByType.StudentCount}
                checked={value === OrderByType.StudentCount}
                onChange={onChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                className="base"
                label="별점순"
                name="sortRadioGroup"
                value={OrderByType.Star}
                checked={value === OrderByType.Star}
                onChange={onChange}
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default CardSortingView;
