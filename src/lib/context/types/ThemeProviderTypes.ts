import { ActionDispatch } from 'react';
import { ThemeContextActions } from '../constants';

export type ThemeContextStateType = {
  showSidebar: boolean;
  showSidebarScrollbar: boolean;
  showMobileFilterDialog: boolean;
  showMobileSearchDialog: boolean;
  mobileFilterDialogSection: string;
  selectedAttribute: string;
};

type ToggleSidebarStateAction = {
  type: ThemeContextActions.TOGGLE_SIDEBAR_STATE;
};

type SetSidebarStateAction = {
  type: ThemeContextActions.SET_SIDEBAR_STATE;
  payload: boolean;
};

type SetSidebarScrollbarStateAction = {
  type: ThemeContextActions.SET_SIDEBAR_SCROLLBAR_STATE;
  payload: boolean;
};

type SetPublicProfileSidebarStateAction = {
  type: ThemeContextActions.SET_PUBLIC_PROFILE_SIDEBAR_STATE;
  payload: boolean;
};

type SetShowMobileFilterDialogStateAction = {
  type: ThemeContextActions.SET_SHOW_MOBILE_FILTER_DIALOG_STATE;
  payload: boolean;
};

type SetShowMobileSearchDialogStateAction = {
  type: ThemeContextActions.SET_SHOW_MOBILE_SEARCH_DIALOG_STATE;
  payload: boolean;
};

type SetMobileFilterDialogSectionAction = {
  type: ThemeContextActions.SET_MOBILE_FILTER_DIALOG_SECTION;
  payload: string;
};

type SetSelectedAttributeAction = {
  type: ThemeContextActions.SET_SELECTED_ATTRIBUTE;
  payload: string;
};

export type ThemeContextActionType =
  | ToggleSidebarStateAction
  | SetSidebarStateAction
  | SetSidebarScrollbarStateAction
  | SetPublicProfileSidebarStateAction
  | SetShowMobileFilterDialogStateAction
  | SetShowMobileSearchDialogStateAction
  | SetMobileFilterDialogSectionAction
  | SetSelectedAttributeAction;

export type ThemeContextType = {
  state: ThemeContextStateType;
  dispatch: ActionDispatch<[action: ThemeContextActionType]>;
};
