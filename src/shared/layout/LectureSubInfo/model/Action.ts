import ActionType from './ActionType';

interface Action {
  type: ActionType
  onAction:() => void
}

export default Action;
