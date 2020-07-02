import { reduce } from "lodash";
import { Dispatch } from "react";
import { TabAndDialogChannel } from "./lib/TabAndDialogChannel";
import { TabPropsType } from "./tabs/_types";
import { TabAndDialogChannelActionType } from "./_actions";
import { ChannelsType } from "./_types";

export const createChannelsForTabs = (
  tabs: TabPropsType[],
  dispatch: Dispatch<TabAndDialogChannelActionType>
): ChannelsType =>
  reduce<TabPropsType, ChannelsType>(
    tabs,
    (_channels, tab) => {
      _channels[tab.label] = new TabAndDialogChannel(tab.label, dispatch);

      return _channels;
    },
    {}
  );

export const triggerChannelsValidation = (
  channels: ChannelsType
): Promise<void[]> =>
  Promise.all(Object.values(channels).map((ch) => ch.triggerValidation()));
