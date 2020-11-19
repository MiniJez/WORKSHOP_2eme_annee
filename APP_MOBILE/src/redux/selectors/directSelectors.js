import _ from 'lodash';

export const createLoadingSelector = (actions) => (state) => {
    return _(actions)
        .some((action) => _.get(state, `loadingReducer.${action}`));
};