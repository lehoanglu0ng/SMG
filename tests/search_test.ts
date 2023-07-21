
import * as DATA from "../TestData/searchData";

Feature('search');

Data(DATA.keywords).Scenario('[SMG-1] Verify that the Wikipedia search bar accepts input for given keyword',  ({ I, current, mainPage }) => {
    I.amOnPage('/')
    I.fillField(mainPage.fields.search, current.keyword)
    I.seeInField(mainPage.fields.search, current.keyword)
});

Scenario('[SMG-2] Verify that relevant Wikipedia pages containing given text is displayed in the search results', async ({ I, mainPage, searchResultsPage }) => {
    I.amOnPage('/')
    mainPage.searchContain(DATA.testData.keyword);
    I.seeInField(searchResultsPage.fields.search, DATA.testData.keyword);
    I.seeNumberOfElements(searchResultsPage.resultList, DATA.testData.amount);
    await searchResultsPage.eachResultShouldContain(DATA.testData.keyword);
});

