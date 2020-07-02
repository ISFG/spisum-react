import { CircularProgress } from "@material-ui/core";
import clsx from "clsx";
import { ErrorBoundary } from "core/components/errorBoundary";
import React, { useState } from "react";
import { DialogTabError } from "../../errorBoundary/errorTypes/DialogErrors";
import { useStyles } from "../Dialog.styles";
import { ChannelsType, DialogDataType } from "../_types";
import { Bookmarks, StyledTab, StyledTabs } from "./Component.styles";
import { TabPropsType } from "./_types";

interface OwnProps {
  tabs: TabPropsType[];
  channels: ChannelsType;
  dialogData: DialogDataType;
  showPreview: boolean;
  onClose?: VoidFunction;
}

export const DialogTabs = ({
  tabs,
  channels,
  dialogData,
  showPreview,
  onClose
}: OwnProps) => {
  const classes = useStyles();
  const [activeTab, setActiveTab] = useState(0);
  const [refreshTab, setRefreshTab] = useState(0);

  const handleChange = (e: React.ChangeEvent<{}>, nextValue: number) => {
    setActiveTab(nextValue);
  };

  const filteredTabs = tabs.filter((tab) => {
    return typeof tab.filter === "function"
      ? tab.filter({ dialogData, channel: channels[tab.label] })
      : true;
  });

  const reloadTab = () => {
    setRefreshTab(refreshTab + 1);
  };

  return (
    <>
      <Bookmarks className={classes.bookmark}>
        <StyledTabs onChange={handleChange} value={activeTab} length={105}>
          {filteredTabs &&
            filteredTabs.map((tab, index) => (
              <StyledTab aria-label={tab.label} key={index} label={tab.label} />
            ))}
        </StyledTabs>
      </Bookmarks>
      {filteredTabs.map(({ content: Tab, label, filter }, index) => {
        const isActive = index === activeTab;
        const channel = channels[label];

        return (
          <div
            key={label}
            className={clsx(classes.modalBody, {
              [classes.modalBodyFullscreen]: showPreview,
              [classes.modalBodyFullSize]: !showPreview,
              [classes.modalBodyInvisible]: !isActive
            })}
            role="tabpanel"
          >
            {channel.isLoading && (
              <div className={clsx("body-fullsize", classes.contentCentered)}>
                <CircularProgress />
              </div>
            )}
            <ErrorBoundary Component={DialogTabError} reloadTab={reloadTab}>
              <Tab
                dialogData={dialogData}
                channel={channel}
                onClose={onClose}
              />
            </ErrorBoundary>
          </div>
        );
      })}
    </>
  );
};

export default DialogTabs;
