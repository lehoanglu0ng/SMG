import * as DATA from "../TestData/searchData";

Feature('API');

Scenario('Verify that only GET or POST is allowed', ({ I }) => {
  const url = I.buildURL(DATA.testData);
  I.sendGetRequest(url)
  I.seeResponseCodeIsSuccessful();
  I.sendPostRequest(url)
  I.seeResponseCodeIsSuccessful();
  I.sendPutRequest(url)
  I.seeResponseCodeIsClientError();
  I.sendPatchRequest(url)
  I.seeResponseCodeIsClientError();
  I.sendDeleteRequest(url);
  I.seeResponseCodeIsClientError();
});

Data(DATA.keywords).Scenario('Verify that the API returns a valid JSON response', ({ I, current }) => {
  I.sendGetRequest(I.buildURL(current));
  I.seeResponseCodeIsSuccessful();
  I.seeResponseMatchesJsonSchema(I.getSearchSchema(current));
  I.seeResponseValidByCallback(({ data, status, expect }) => {
    expect(data.query.search.length).to.be.equal(current.offset);
    expect(data.continue.sroffset).to.be.equal(current.amount);
    expect(data.query.search.every(item =>
      current.keyword.split(' ').every(word =>
        item.snippet.toLowerCase().includes(word.toLowerCase())
      )
    ));
  });
});

Scenario('Verify that bad query param `action` is not allowed', ({ I }) => {
  const temp = Object.assign({}, DATA.testData, { action: 123 });
  const url = I.buildURL(temp);
  I.sendGetRequest(url)
  I.seeResponseCodeIsSuccessful();
  I.seeResponseMatchesJsonSchema(I.getErrorSchema());
  I.seeResponseValidByCallback(({ data, status, expect }) => {
    expect(data.error.code).to.be.equal("badvalue");
    expect(data.error.info).to.be.equal(`Unrecognized value for parameter \"action\": ${temp.action}.`);
    expect(data.error.docref).to.be.equal("See https://en.wikipedia.org/w/api.php for API usage. Subscribe to the mediawiki-api-announce mailing list at &lt;https://lists.wikimedia.org/postorius/lists/mediawiki-api-announce.lists.wikimedia.org/&gt; for notice of API deprecations and breaking changes.");
  });
});

Scenario('Verify that missing query param `srsearch` is not allowed', ({ I }) => {
  const url = I.buildURL({ keyword: null });
  I.sendGetRequest(url)
  I.seeResponseCodeIsSuccessful();
  I.seeResponseMatchesJsonSchema(I.getErrorSchema());
  I.seeResponseValidByCallback(({ data, status, expect }) => {
    expect(data.error.code).to.be.equal("missingparam");
    expect(data.error.info).to.be.equal("The \"srsearch\" parameter must be set.");
    expect(data.error.docref).to.be.equal("See https://en.wikipedia.org/w/api.php for API usage. Subscribe to the mediawiki-api-announce mailing list at &lt;https://lists.wikimedia.org/postorius/lists/mediawiki-api-announce.lists.wikimedia.org/&gt; for notice of API deprecations and breaking changes.");
  });
});