import {
  createAuthorization64,
  createRequest,
  createUrl,
  getURL,
  query,
  replaceWildCards
} from "../fetch";

describe("Test fetch functions", () => {
  test("getURL", () => {
    process.env.REACT_APP_PROTOCOL = "https";
    process.env.REACT_APP_API_URL = "localhost:4444";
    expect(getURL("/login")).toMatch("https://localhost:4444/login");

    delete process.env.REACT_APP_PROTOCOL;
    process.env.REACT_APP_API_URL = "localhost:4444";
    expect(getURL("/login")).toMatch("http://localhost:4444/login");
  });

  test("replaceWildCards", () => {
    expect(
      replaceWildCards("/login/:clientId/:nodeId", {
        clientId: "123",
        nodeId: "456"
      })
    ).toMatch("/login/123/456");
  });

  test("createAuthorization64", () => {
    const token = "==oripa589";
    const value = `ROLE_TICKET:${token}`;

    expect(createAuthorization64(token)).toMatch(btoa(value));
    expect(atob(createAuthorization64(token))).toMatch(value);
  });

  test("createRequest", () => {
    const bodyFormData = new FormData();
    bodyFormData.append("name", new Blob(), "file.pdf");
    const bodyJSON = {
      cardId: 456,
      clientId: "123"
    };
    const privateToken = "==ahi58e";

    expect(
      createRequest({ activeGroup: "ABC", method: "GET", privateToken: "" })
    ).toMatchObject({
      body: null,
      headers: {
        Accept: "application/json"
      },
      method: "GET"
    });
    expect(
      createRequest({ activeGroup: "ABC", method: "GET", privateToken })
    ).toMatchObject({
      body: null,
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${createAuthorization64(privateToken)}`
      },
      method: "GET"
    });
    expect(
      createRequest({
        activeGroup: "ABC",
        method: "GET",
        bodyJSON,
        privateToken
      })
    ).toMatchObject({
      body: null,
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${createAuthorization64(privateToken)}`
      },
      method: "GET"
    });
    expect(
      createRequest({
        activeGroup: "ABC",
        method: "post",
        bodyJSON,
        privateToken
      })
    ).toMatchObject({
      body: JSON.stringify(bodyJSON),
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${createAuthorization64(privateToken)}`
      },
      method: "POST"
    });
    expect(
      createRequest({
        activeGroup: "ABC",
        method: "POST",
        bodyFormData,
        bodyJSON,
        privateToken
      })
    ).toMatchObject({
      body: JSON.stringify(bodyJSON),
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${createAuthorization64(privateToken)}`
      },
      method: "POST"
    });
    expect(
      createRequest({
        activeGroup: "ABC",
        method: "POST",
        bodyFormData,
        privateToken
      })
    ).toMatchObject({
      body: bodyFormData,
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${createAuthorization64(privateToken)}`
      },
      method: "POST"
    });
  });

  test("createUrl", () => {
    const suffixURL = "/login";
    const params = {
      clientId: "123"
    };

    expect(createUrl(suffixURL)).toMatch(suffixURL);
    expect(createUrl(suffixURL, params)).toMatch(`${suffixURL}?clientId=123`);
    expect(createUrl(suffixURL, { ...params, listId: "456" })).toMatch(
      `${suffixURL}?clientId=123&listId=456`
    );
    expect(
      createUrl(
        `${suffixURL}/:id1/:id2`,
        { ...params, listId: "456" },
        { id1: "my", id2: "card" }
      )
    ).toMatch(`${suffixURL}/my/card?clientId=123&listId=456`);
  });

  test("query", () => {
    const params = {
      clientId: "123"
    };

    expect(query({})).toMatch("");
    expect(query(params)).toMatch("?clientId=123");
    expect(query({ ...params, listId: "456" })).toMatch(
      "?clientId=123&listId=456"
    );
  });
});
