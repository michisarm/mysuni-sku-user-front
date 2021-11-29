import { createStore } from '../../shared/store/Store';
import { PisAgreementViewModel } from '../viewmodel/PisAgreementViewModel';

export const [
  setPisAgreementViewModel,
  onPisAgreementViewModel,
  getPisAgreementViewModel,
  usePisAgreementViewModel,
] = createStore<PisAgreementViewModel>();
