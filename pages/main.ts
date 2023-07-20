const { I } = inject();

export = {

  fields: {
    search: '#searchform input'
  },
  buttons: {
    search: '#searchform button',
    searchContain: '[class*="cdx-typeahead-search__search-footer__icon"]'
  },

  search(keyword: string) {
    I.fillField(this.fields.search, keyword);
    I.click(this.buttons.search);
  },

  searchContain(keyword: string) {
    I.fillField(this.fields.search, keyword);
    I.seeInField(this.fields.search, keyword);
    I.wait(1);
    I.click(this.buttons.searchContain);
  },

  
}
