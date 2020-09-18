import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { reactAutobind, reactAlert } from '@nara.platform/accent';
import { Button, Checkbox, Form, Grid, Icon, Table } from 'semantic-ui-react';
import moment from 'moment';
import { AplType } from '../../model/AplType';
import { AplService, AplModel } from '../../index';
import { AplState } from '../../model/AplState';

interface Props {
  aplService: AplService;
  onChangeAplProps: (name: string, value: string | number) => void;
  aplType: string;
  selectChange?: (aplType: string) => void;
}

interface States {
  aplAll: string;
  //AplTypeSelect: string;
}

@inject(
  'sharedService',
  'aplService',
  'coursePlanService',
  'learningCardService'
)
@observer
@reactAutobind
class AplDetailView extends React.Component<Props, States> {
  //
  constructor(props: Props) {
    super(props);
    this.state = {
      aplAll: 'No',
      //AplTypeSelect: AplType.Rqd,
    };
  }

  componentDidMount(): void {
    const { aplService } = this.props;
    aplService.changeSelectedAplProps([]);
  }

  render() {
    const { aplType,  aplService } = this.props;
    const { aplAll } = this.state;
    const { apl } =
      this.props.aplService || ({} as AplService);
    const {
      aplQuery
    } = aplService;
    return (
      <Table celled>
        <colgroup>
          <col width="20%" />
          <col width="80%" />
        </colgroup>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="title-header" colSpan={2}>
              Apl
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell colSpan={2}>
              <Grid verticalAlign="middle">
                <Grid.Column width={10}>
                  <div className="right">
                    {/*
                    {
                      menuArranges.results.length > 1 ?
                        <>
                          <Button onClick={() => this.addArrangeSet()}>삭제</Button>
                        </>
                        : null
                    }
                    */}
                  </div>
                </Grid.Column>
              </Grid>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}

export default AplDetailView;
