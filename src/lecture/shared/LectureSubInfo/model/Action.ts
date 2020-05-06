import ActionType from './ActionType';

interface Action {
  type: ActionType | string
  onAction:() => void
  subType?: string
}

export default Action;
