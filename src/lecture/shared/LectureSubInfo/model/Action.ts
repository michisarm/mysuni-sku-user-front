import ActionType from './ActionType';

interface Action {
  type: ActionType | string
  onAction:() => void
}

export default Action;
