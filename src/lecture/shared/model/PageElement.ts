import { PositionType } from './PositionType';
import { PageElementType } from './PageElementType';

export interface PageElement {
  position: PositionType;
  type: PageElementType;
}
