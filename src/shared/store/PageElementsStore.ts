import { createStore } from 'restoa';
import { PageElement } from '../../lecture/shared/model/PageElement';

export const [usePageElements, setPageElements] = createStore<PageElement[]>(
  []
);
