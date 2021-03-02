import type { Reducer } from 'umi';

export type GlobalModelState = {
  collapsed: boolean;
};

export type GlobalModelType = {
  namespace: 'global';
  state: GlobalModelState;
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
  };
};

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
    collapsed: false,
  },
  reducers: {
    changeLayoutCollapsed(state = { collapsed: true }, { payload }): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      };
    },
  },
};

export default GlobalModel;
