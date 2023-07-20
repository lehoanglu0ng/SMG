/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file');
type mainPage = typeof import('./pages/main');
type searchResultsPage = typeof import('./pages/searchResults');


declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, mainPage: mainPage, searchResultsPage: searchResultsPage }
  interface Methods extends REST, JSONResponse, Mochawesome, Playwright {}
  interface I extends ReturnType<steps_file>, WithTranslation<JSONResponse>, WithTranslation<Mochawesome> {}
  namespace Translation {
    interface Actions {}
  }
}
