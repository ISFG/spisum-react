import { ShipmentHistory, SuccessResponseType } from "../models";

export type DispatchPublishShipmentRequestType = {
  nodeId: string;
};

export type ResendShipmentRequestType = {
  nodeId: string;
};

export type ShipmentHistorySuccessResponseType = SuccessResponseType<
  ShipmentHistory
>;

export type PersonallyShipmentRequestType = {
  nodeId: string;
  body: {
    components: string[];
  };
};

export type PostShipmentRequestType = {
  nodeId: string;
  body: {
    reason: string;
  };
};

export type PublishShipmentRequestType = {
  nodeId: string;
  body: {
    reason: string;
  };
};

export type DispatchPostShipmentRequestType = {
  nodeId: string;
  body: {
    postItemId: string;
    postItemNumber: string;
  };
};
