export const initialState = {
  search: "",
  services: new Set(),
  regions: new Set(),
  status: new Set(),
};

export function dashboardReducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload };
    case "TOGGLE_SERVICE": {
      const s = new Set(state.services);
      s.has(action.payload) ? s.delete(action.payload) : s.add(action.payload);
      return { ...state, services: s };
    }
    case "TOGGLE_REGION": {
      const r = new Set(state.regions);
      r.has(action.payload) ? r.delete(action.payload) : r.add(action.payload);
      return { ...state, regions: r };
    }
    case "TOGGLE_STATUS": {
      const st = new Set(state.status);
      st.has(action.payload) ? st.delete(action.payload) : st.add(action.payload);
      return { ...state, status: st };
    }
    case "RESET_FILTERS":
      return { ...initialState, search: "" };
    default:
      return state;
  }
}
