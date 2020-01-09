import * as React from 'react';
import classNames from 'classnames';
import { Form, Icon, Select, Step } from 'semantic-ui-react';
import { observer } from 'mobx-react';
import { reactAutobind } from '@nara.platform/accent';
import ReactQuill from 'react-quill';
import { CubeIntroModel } from '../../../cubeintro';
import SelectType from '../../../../shared/model/SelectType';
import ContentsProviderSelectContainer from '../logic/ContentsProviderSelectContainer';
import CreateBoardContainer from '../logic/CreateBoardContainer';

interface Props {
  cubeIntro: CubeIntroModel
  onChangeCubeIntroProps: (name: string, value: string | number | {}) => void
  setHourAndMinute: (name: string, value: string) => void
  hour: string
  minute: string
  cubeType?: string
}

interface States {
  write: string
  type: string
}

@observer
@reactAutobind
class CreateIntroView extends React.Component<Props, States> {
  //
  constructor(props: Props) {
    super(props);
    this.state = {
      write: '', type: '',
    };
  }

  render() {

    const {
      cubeIntro, onChangeCubeIntroProps, setHourAndMinute, hour, minute, cubeType,
    } = this.props;
    return (
      <>
        <div className="section-tit">
          <span className="text1">교육정보</span>
          <div className="right-step">
            <Step.Group className="number-step">
              <Step completed>
                <Step.Content>
                  <span className="number"><span className="blind">1</span></span>
                  <Step.Title>기본정보 및 노출정보</Step.Title>
                </Step.Content>
              </Step>
              <Step active>
                <Step.Content>
                  <span className="number"><span className="blind">2</span></span>
                  <Step.Title>교육정보 및 부가정보</Step.Title>
                </Step.Content>
              </Step>
            </Step.Group>
          </div>
        </div>

        <Form.Field>
          <label className="necessary">교육목표</label>
          <div className="ui form">
            <div className="ui right-top-count input">
              <span className="count">
                <span className="now">{cubeIntro && cubeIntro.description && cubeIntro.description.goal && cubeIntro.description.goal.length || 0}</span>/
                <span className="max">500</span>
              </span>
              <textarea placeholder="교육 목표를 입력해주세요. (최대 500자 입력 가능)"
                value={cubeIntro && cubeIntro.description && cubeIntro.description.goal || ''}
                onChange={(e: any) => onChangeCubeIntroProps('description.goal', e.target.value)}
              />
              <span className="validation">You can enter up to 500 characters.</span>
            </div>
          </div>
        </Form.Field>
        <Form.Field>
          <label className="necessary">교육대상</label>
          <div className="ui right-top-count input">
            <span className="count">
              <span className="now">{cubeIntro && cubeIntro.description && cubeIntro.description.applicants && cubeIntro.description.applicants.length || 0}</span>/
              <span className="max">500</span>
            </span>
            <textarea placeholder="교육 대상을 입력해주세요. (최대 500자 입력가능)"
              value={cubeIntro && cubeIntro.description && cubeIntro.description.applicants || ''}
              onChange={(e: any) => onChangeCubeIntroProps('description.applicants', e.target.value) }
            />
            <span className="validation">You can enter up to 500 characters.</span>
          </div>
        </Form.Field>
        <Form.Field>
          <label className="necessary">교육내용</label>
          <div className="ui editor-wrap">
            <ReactQuill theme="snow"
              modules={SelectType.modules}
              formats={SelectType.formats}
              onChange={html => onChangeCubeIntroProps('description.description', html)}
              value={cubeIntro && cubeIntro.description && cubeIntro.description.description || ''}
            />
            {/*<Editor />*/}
          </div>
        </Form.Field>

        <Form.Field>
          <label>이수조건</label>
          <div className="ui right-top-count input">
            <span className="count">
              <span className="now">{cubeIntro && cubeIntro.description && cubeIntro.description.completionTerms.length}</span>/
              <span className="max">1000</span>
            </span>
            <textarea
              placeholder="이수조건을 입력해주세요."
              value={cubeIntro && cubeIntro.description && cubeIntro.description.completionTerms || ''}
              onChange={(e:any) => onChangeCubeIntroProps('description.completionTerms', e.target.value)}
            />
            <span className="validation">You can enter up to 1000 characters.</span>
          </div>
        </Form.Field>
        <Form.Field>
          <label>기타안내</label>
          <div className="ui editor-wrap">
            <ReactQuill theme="snow"
              modules={SelectType.modules}
              formats={SelectType.formats}
              onChange={html => onChangeCubeIntroProps('description.guide', html)}
              value={cubeIntro && cubeIntro.description && cubeIntro.description.guide || ''}
            />
          </div>
        </Form.Field>

        <Form.Field>
          <div className="ui grid create">
            <div className="column">
              <label className="necessary">교육시간</label>
              <div className={classNames('ui h48 input time', { focus: this.state.type === 'hour', write: this.state.write })}>
                <input
                  type="text"
                  onClick={() => this.setState({ type: hour })}
                  onBlur={() => this.setState({ type: '' })}
                  value={parseInt(String(cubeIntro.learningTime / 60), 10) || hour}
                  onChange={(e: any) => {
                    this.setState({ write: e.target.value });
                    setHourAndMinute('hour', e.target.value);
                  }}
                /><label>h</label>
                <Icon className="clear link"
                  onClick={() => {
                    this.setState({ write: '' });
                    setHourAndMinute('hour', '');
                  }}
                />
              </div>
              <div className={classNames('ui h48 input time',  { focus: this.state.type === 'minute', write: this.state.write })}>
                <input
                  type="text"
                  onClick={() => this.setState({ type: minute })}
                  onBlur={() => this.setState({ type: '' })}
                  value={parseInt(String(cubeIntro.learningTime % 60), 10) || minute}
                  onChange={(e: any) => {
                    this.setState({ write: e.target.value });
                    setHourAndMinute('minute', e.target.value);
                  }}
                /><label>m</label>
                <Icon className="clear link"
                  onClick={() => {
                    this.setState({ write: '' });
                    setHourAndMinute('minute', '');
                  }}
                />
              </div>
            </div>
            <div className="column">
              <label>난이도</label>
              <Select
                placeholder="선택해주세요"
                className="dropdown"
                options={SelectType.difficulty}
                onChange={(e: any, data: any) => onChangeCubeIntroProps('difficultyLevel', data.value)}
                value={cubeIntro && cubeIntro.difficultyLevel || ''}
              />
            </div>
          </div>
        </Form.Field>
        {
          cubeType === 'Community' ?
            <Form.Field>
              <CreateBoardContainer />
            </Form.Field>
            : null
        }
        {/* */}
        <Form.Field>
          <ContentsProviderSelectContainer
            targetProps="operation.organizer"
            type="cubeInfo"
            defaultValue={
              cubeIntro && cubeIntro.operation && cubeIntro.operation.organizer && cubeIntro.operation.organizer.id
              && JSON.stringify({ id: cubeIntro.operation.organizer.id, name: cubeIntro.operation.organizer.name })
            }
          />
        </Form.Field>
      </>
    );
  }
}
export default CreateIntroView;
