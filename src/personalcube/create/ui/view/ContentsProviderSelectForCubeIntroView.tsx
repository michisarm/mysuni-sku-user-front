import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import { IdName } from 'shared';
import { Grid, Icon, Select } from 'semantic-ui-react';
import classNames from 'classnames';


interface Props extends RouteComponentProps {
  defaultValue?: string
  targetProps?: string
  onSetCubeIntroPropsByJSON: (name: string, value: string) => void
  setContentsProvider: () => []
  onChangeCubeIntroProps: (name: string, value: string) => void
  organizer: IdName
  etcCp: string
}

interface States {
  focus: boolean
  write: string
}

@observer
@reactAutobind
class ContentsProviderSelectForCubeIntroView extends React.Component<Props, States> {
  //
  constructor(props: Props) {
    super(props);
    this.state = {
      focus: false,
      write: '',
    };
  }

  render() {
    const { defaultValue, targetProps, onSetCubeIntroPropsByJSON, setContentsProvider, organizer, etcCp, onChangeCubeIntroProps } = this.props;
    const contentsProviderTsx = setContentsProvider();

    return (
      <>
        <label className="necessary">교육기관 / 출처</label>
        <Grid className="create">
          <Grid.Column>
            <Select
              placeholder="선택해주세요"
              className="w100"
              options = {contentsProviderTsx}
              onChange={(e: any, data: any) => onSetCubeIntroPropsByJSON(`${targetProps}`, data.value)}
              value={defaultValue && defaultValue}
            />
          </Grid.Column>
          { organizer && organizer.id === 'PVD0002h' ?
            <Grid.Column>
              <div className={classNames('ui right-top-count input', { focus: this.state.focus, write: this.state.write })}>{/* .error class 추가시 error ui 활성 */}
                <input type="text"
                  placeholder="선택사항이 없는 경우, 교육기관/출처 를 입력해주세요."
                  value={etcCp || ''}
                  onClick={() => this.setState({ focus: true })}
                  onBlur={() => this.setState({ focus: false })}
                  onChange={(e: any) => {
                    this.setState({ write: e.target.value });
                    onChangeCubeIntroProps('operation.etcCp', e.target.value);
                  }}
                />
                <Icon className="clear link"
                  onClick={(e: any) => {
                    this.setState({ write: '' });
                    onChangeCubeIntroProps('operation.etcCp', '');
                  }}
                />
              </div>
            </Grid.Column>
            : null
          }
        </Grid>
      </>
    );
  }
}

export default withRouter(ContentsProviderSelectForCubeIntroView);
