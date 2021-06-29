import AbtestService from 'abtest/present/logic/AbtestService';

export default {
  abtest: {
    abtestService: AbtestService.instance,
  },
};

export { AbtestService };
