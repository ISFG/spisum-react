/**
 * @jest-environment jest-environment-jsdom-fourteen
 */

import MuiAlert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { mount } from "enzyme";
import React from "react";
import { TestReduxProvider } from "testUtils";
import { SnackbarLayout } from "./Notification.styles";
import { Notification } from "./Notification";

const testMessage = "test message";
const testTitle = "test title";

const onClose = () => {
  //
};

describe("Notification", () => {
  const notificationComponent = mount(
    <TestReduxProvider>
      <Notification
        id="testMessage"
        alertTitle={testTitle}
        message={testMessage}
        onClose={onClose}
      />
    </TestReduxProvider>
  );

  test("Notification is shown", () => {
    expect(
      notificationComponent.find(SnackbarLayout).find(MuiAlert).length
    ).toBe(1);
  });

  test("Notification contains text", () => {
    expect(
      notificationComponent.find(MuiAlert).contains(testMessage)
    ).toBeTruthy();
  });

  test("Notification contains title", () => {
    expect(
      notificationComponent.find(MuiAlert).find(AlertTitle).contains(testTitle)
    ).toBeTruthy();
  });
});
