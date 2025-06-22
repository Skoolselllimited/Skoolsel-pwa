'use client';

import { createContext, ReactNode, useReducer } from 'react';
import {
  ThemeContextActionType,
  ThemeContextStateType,
  ThemeContextType,
} from '../types/ThemeProviderTypes';
import { ThemeContextActions } from '../constants';

const initialState = {
  showSidebar: false,
  showSidebarScrollbar: false,
  showPublicProfileSidebar: false,
  showMobileFilterDialog: false,
  showMobileSearchDialog: false,
  mobileFilterDialogSection: 'Filters',
  selectedAttribute: '',
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

const reducer = (
  state: ThemeContextStateType,
  action: ThemeContextActionType
) => {
  switch (action.type) {
    case ThemeContextActions.TOGGLE_SIDEBAR_STATE:
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    case ThemeContextActions.SET_SIDEBAR_STATE:
      return {
        ...state,
        showSidebar: action.payload,
      };

    case ThemeContextActions.SET_SIDEBAR_SCROLLBAR_STATE:
      return {
        ...state,
        showSidebarScrollbar: action.payload,
      };
    case ThemeContextActions.SET_PUBLIC_PROFILE_SIDEBAR_STATE:
      return {
        ...state,
        showPublicProfileSidebar: action.payload,
      };

    case ThemeContextActions.SET_SHOW_MOBILE_FILTER_DIALOG_STATE:
      return {
        ...state,
        showMobileFilterDialog: action.payload,
      };

    case ThemeContextActions.SET_SHOW_MOBILE_SEARCH_DIALOG_STATE:
      return {
        ...state,
        showMobileSearchDialog: action.payload,
      };

    case ThemeContextActions.SET_MOBILE_FILTER_DIALOG_SECTION:
      return {
        ...state,
        mobileFilterDialogSection: action.payload,
      };

    case ThemeContextActions.SET_SELECTED_ATTRIBUTE:
      return {
        ...state,
        selectedAttribute: action.payload,
      };

    default:
      return state;
  }
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ThemeContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
