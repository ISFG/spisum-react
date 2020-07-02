/**
 * @jest-environment jest-environment-jsdom-fourteen
 */

import { mount } from "enzyme";
import React from "react";
import reactStringReplace from "react-string-replace";
import { RootStateType } from "reducers";
import { translationPath } from "share/utils/getPath";
import { TestReduxProvider } from "testUtils";
import { lang, t } from "translation/i18n";
import Component from "./Component";
import Dialog from "./Dialog";

type Store = Pick<RootStateType, "automaticLogoutDialogReducer">;

describe("Automatic logout", () => {
  const seconds = 60;
  const dashboardComponentWithNotification = mount(
    <TestReduxProvider<Store>
      store={{
        automaticLogoutDialogReducer: {
          logoutInterval: seconds
        }
      }}
    >
      <Component />
    </TestReduxProvider>
  );

  test("Dialog is shown", () => {
    expect(dashboardComponentWithNotification.find(Dialog).length).toBe(1);
  });

  test("Dialog contains proper text", () => {
    expect(
      dashboardComponentWithNotification.find(Dialog).contains(
        <div>
          {reactStringReplace(
            t(translationPath(lang.logout.warningSeconds), { seconds }),
            /<b[^>]*>(.*?)<\/b>/,
            (match, i) => (
              <b key={i}>{match}</b>
            )
          )}
        </div>
      )
    ).toBeTruthy();
  });
});
