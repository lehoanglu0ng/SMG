const { I } = inject();

export = {

  fields: {
    search: '#searchText input'
  },
  resultList: '.mw-search-results li .searchResultImage-text',

  async eachResultShouldContain(keyword: string) {
    let resultList = await I.grabTextFromAll(this.resultList);
    let result = resultList.every(item =>
      keyword.split(' ').some(word => item.toLowerCase().includes(word.toLowerCase()))
    );
    await I.assertTrue(result);
  },
}
