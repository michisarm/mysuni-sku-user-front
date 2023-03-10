import React from 'react';
import { reactAutobind } from '@nara.platform/accent';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';

import classNames from 'classnames';
import { Grid, Icon, Select } from 'semantic-ui-react';
import { IdName } from 'shared/model';
import { getPolyglotText, PolyglotText } from '../../../../shared/ui/logic/PolyglotText';


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
  state = {
    focus: false,
    write: '',
  };

  render() {
    const { defaultValue, targetProps, onSetCubeIntroPropsByJSON, setContentsProvider, organizer, etcCp, onChangeCubeIntroProps } = this.props;
    const contentsProviderTsx = setContentsProvider();

    return (
      <>
        <label className="necessary">
          <PolyglotText defaultString="교육기관 / 출처" id="Create-NM-교육기관출처" />
        </label>
        <Grid className="create">
          <Grid.Column>
            <Select
              placeholder={getPolyglotText('선택해주세요', 'Create-NM-선택해주세요')}
              className="w100"
              options = {contentsProviderTsx}
              onChange={(e: any, data: any) => onSetCubeIntroPropsByJSON(`${targetProps}`, data.value)}
              value={defaultValue && defaultValue}
            />
          </Grid.Column>
          { organizer && organizer.name === '기타' ?
            <Grid.Column>
              <div className={classNames('ui right-top-count input', { focus: this.state.focus, write: this.state.write })}>{/* .error class 추가시 error ui 활성 */}
                <input type="text"
                  placeholder={getPolyglotText('선택사항이 없는 경우, 교육기관/출처 를 입력해주세요.', 'Create-NM-기타Sub')}
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
