import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { Form, Radio } from 'semantic-ui-react';
import { OrderByType } from '../../../model';
import { getPolyglotText } from '../../../../shared/ui/logic/PolyglotText';

interface Props {
  value: string;
  onChange: (e: any, data: any) => void;
  collegeOrder?: boolean;
}

@reactAutobind
class CardSortingView extends Component<Props> {
  render() {
    const { value, onChange, collegeOrder } = this.props;

    return (
      <div className="comments-sort">
        <Form className="comments-sort">
          <Form.Group inline>
            {collegeOrder && (
              <Form.Field>
                <Radio
                  className="base"
                  label={getPolyglotText('편성순', 'cicl-목록-편성순')}
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
                label={getPolyglotText('최신순', 'cicl-목록-최신순')}
                name="sortRadioGroup"
                value={OrderByType.Time}
                checked={value === OrderByType.Time}
                onChange={onChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                className="base"
                label={getPolyglotText('이수순', 'cicl-목록-이수순')}
                name="sortRadioGroup"
                value={OrderByType.PassedStudentCount}
                checked={value === OrderByType.PassedStudentCount}
                onChange={onChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                className="base"
                label={getPolyglotText('별점순', 'cicl-목록-별점순')}
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
