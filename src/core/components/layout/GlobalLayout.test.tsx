/**
 * @jest-environment jest-environment-jsdom-fourteen
 */

import MuiAlert from "@material-ui/lab/Alert";
import { mount } from "enzyme";
import React from "react";
import { RootStateType } from "reducers";
import { TestReduxProvider } from "testUtils";
import { SnackbarLayout } from "../notifications/notification/Notification.styles";
import { GlobalLayout } from "./GlobalLayout";

type Store = Pick<RootStateType, "notificationReducer">;
const testMessage = "test message";

describe("Dashboard notification", () => {
  const dashboardComponent = mount(
    <TestReduxProvider>
      <GlobalLayout>content</GlobalLayout>
    </TestReduxProvider>
  );
  const dashboardComponentWithNotification = mount(
    <TestReduxProvider<Store>
      store={{
        notificationReducer: {
          queue: [
            {
              id: "testMessage",
              message: testMessage
            }
          ]
        }
      }}
    >
      <GlobalLayout>content</GlobalLayout>
    </TestReduxProvider>
  );

  test("Notification is not shown", () => {
    expect(dashboardComponent.find(MuiAlert).length).toBe(0);
  });

  test("Notification is shown", () => {
    expect(
      dashboardComponentWithNotification.find(SnackbarLayout).find(MuiAlert)
        .length
    ).toBe(1);
  });

  test("Notification contains text", () => {
    expect(
      dashboardComponentWithNotification.find(MuiAlert).contains(testMessage)
    ).toBeTruthy();
  });
});
