import { createSlice } from "@reduxjs/toolkit";

const advanceFilterSlice = createSlice({
  name: "advanceFilterState",

  initialState: {
    itemElements: { assets_audit: {}, apps_audit: {}, asset_access_audit:{}, app_access_audit:{},app_executed_commands_audit:{}, asset_executed_commands_audit:{}, users_audit:{}, web_apps_audit:{}, web_app_access_audit:{}, ticket_audit:{}, app_allocation_user_audit:{}, app_allocation_group_audit:{}, app_allocation_role_audit:{}, asset_allocation_user_audit:{}, asset_allocation_group_audit:{},asset_allocation_role_audit:{},web_app_allocation_user_audit:{}, web_app_allocation_role_audit:{}, web_app_allocation_group_audit:{}  },
    selectedValuesList: { assets_audit: [], apps_audit: [], asset_access_audit:[], app_access_audit:[],app_executed_commands_audit:[], asset_executed_commands_audit:[], users_audit:[], web_apps_audit:[], web_app_access_audit:[], ticket_audit:[],  app_allocation_user_audit:[], app_allocation_group_audit:[], app_allocation_role_audit:[], asset_allocation_user_audit:[], asset_allocation_group_audit:[],asset_allocation_role_audit:[],web_app_allocation_user_audit:[], web_app_allocation_role_audit:[], web_app_allocation_group_audit:[]},
    advanceQuery: { assets_audit: "", apps_audit: "", asset_access_audit:"", app_access_audit:"",app_executed_commands_audit:"", asset_executed_commands_audit:"", users_audit:"", web_apps_audit:"", web_app_access_audit:"", ticket_audit:"", app_allocation_user_audit:"", app_allocation_group_audit:"", app_allocation_role_audit:"", asset_allocation_user_audit:"", asset_allocation_group_audit:"", asset_allocation_role_audit:"",web_app_allocation_user_audit:"", web_app_allocation_role_audit:"", web_app_allocation_group_audit:""},
    from: { assets_audit: null, apps_audit: null, asset_access_audit:null, app_access_audit:null,app_executed_commands_audit:null, asset_executed_commands_audit:null, users_audit:null, web_apps_audit:null, web_app_access_audit:null, ticket_audit:null, app_allocation_user_audit:null, app_allocation_group_audit:null, app_allocation_role_audit:null, asset_allocation_user_audit:null, asset_allocation_group_audit:null, asset_allocation_role_audit:null,web_app_allocation_user_audit:null, web_app_allocation_role_audit:null, web_app_allocation_group_audit:null },
    to: { assets_audit: null, apps_audit: null, asset_access_audit:null, app_access_audit:null,app_executed_commands_audit:null, asset_executed_commands_audit:null, users_audit:null, web_apps_audit:null, web_app_access_audit:null, ticket_audit:null,  app_allocation_user_audit:null, app_allocation_group_audit:null, app_allocation_role_audit:null, asset_allocation_user_audit:null, asset_allocation_group_audit:null, asset_allocation_role_audit:null,web_app_allocation_user_audit:null, web_app_allocation_role_audit:null, web_app_allocation_group_audit:null  },
    allFields: {assets_audit: [], apps_audit: [], asset_access_audit:[], app_access_audit:[],app_executed_commands_audit:[], asset_executed_commands_audit:[], users_audit:[], web_apps_audit:[], web_app_access_audit:[], ticket_audit:[], app_allocation_user_audit:[], app_allocation_group_audit:[], app_allocation_role_audit:[], asset_allocation_user_audit:[], asset_allocation_group_audit:[],asset_allocation_role_audit:[],web_app_allocation_user_audit:[], web_app_allocation_role_audit:[], web_app_allocation_group_audit:[]},
    quickDateButton: { assets_audit: "", apps_audit: "", asset_access_audit:"", app_access_audit:"",app_executed_commands_audit:"", asset_executed_commands_audit:"", users_audit:"", web_apps_audit:"", web_app_access_audit:"", ticket_audit:"", app_allocation_user_audit:"", app_allocation_group_audit:"", app_allocation_role_audit:"", asset_allocation_user_audit:"", asset_allocation_group_audit:"", asset_allocation_role_audit:"",web_app_allocation_user_audit:"", web_app_allocation_role_audit:"", web_app_allocation_group_audit:""}
  },

  reducers: {
    changeItemElements: (state, action) => {
      state.itemElements = action.payload;
    },
    changeSelectedValuesList: (state, action) => {
      state.selectedValuesList = action.payload;
    },
    changeAdvanceQuery: (state, action) => {
      state.advanceQuery = action.payload;
    },
    changeFrom: (state, action) => {
      state.from = action.payload;
    },
    changeTo: (state, action) => {
      state.to = action.payload;
    },
    changeAllFields: (state, action) => {
      state.allFields = action.payload;
     },
    changeQuickDateButton: (state, action) => {
      state.quickDateButton = action.payload;
    },
  },
});

export const {
  changeItemElements,
  changeSelectedValuesList,
  changeFrom,
  changeTo,
  changeAdvanceQuery,
  changeAllFields,
  changeQuickDateButton
} = advanceFilterSlice.actions;
export default advanceFilterSlice.reducer;
