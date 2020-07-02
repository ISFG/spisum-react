import { watchDocumentDetailAction } from "./analogDetailsDialog/_sagas";
import { watchCloseFileDialogAction } from "./closeFileDialog/_sagas";
import { watchDialogOpenConceptDetailsAction } from "./conceptDetailsDialog/_sagas";
import { watchEvidenceCreateConceptDialogOpenAction } from "./createConceptDialog/_sagas";
import { watchDialogFileSearchAction } from "./createNewDocumentFileDialog/_sagas";
import { watchDialogOpenDataboxDetailsAction } from "./databoxDetailsDialog/_sagas";
import { watchDocumentHandoverAction } from "./documentHandoverDialog/_sagas";
import { watchDialogOpenEmailDetailsAction } from "./emailDetailsDialog/_sagas";
import { watchDialogOpenHandoverBackAction } from "./handoverBackDialog/_sagas";
import { watchRenameComponentAction } from "./renameComponentDialog/_sagas";
import { watchReturnToRepositoryAction } from "./returnToRepositoryDialog/_sagas";
import { watchShipmentDetailDialogAction } from "./shipmentDetailDialog/_sagas";
import { watchTechnicalDataCarriesDocumentAction } from "./technicalDataCarriesDetailsDialog/_sagas";
import {
  watchDialogOpenDocumentWithSaveButtonsDetailsAction,
  watchDialogOpenReadOnlyDetailsAction,
  watchOpenDialogDetailsAction,
  watchRegisterDocumentAction
} from "./_sagas";

export default [
  watchCloseFileDialogAction,
  watchDialogFileSearchAction,
  watchDialogOpenConceptDetailsAction,
  watchDialogOpenDataboxDetailsAction,
  watchDialogOpenDocumentWithSaveButtonsDetailsAction,
  watchDialogOpenEmailDetailsAction,
  watchDialogOpenHandoverBackAction,
  watchDialogOpenReadOnlyDetailsAction,
  watchDocumentDetailAction,
  watchDocumentHandoverAction,
  watchEvidenceCreateConceptDialogOpenAction,
  watchOpenDialogDetailsAction,
  watchRegisterDocumentAction,
  watchRenameComponentAction,
  watchShipmentDetailDialogAction,
  watchTechnicalDataCarriesDocumentAction,
  watchReturnToRepositoryAction
];
