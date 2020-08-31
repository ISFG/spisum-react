export enum AlfrescoNames {
  OWNER = "OWNER"
}

export enum Associations {
  Documents = "ssl:documents",
  Components = "ssl:components",
  Databox = "ssl:digitalDeliveryAttachments",
  Email = "ssl:digitalDeliveryAttachments",
  ShipmentsCreated = "ssl:shipmentsCreated",
  ShipmentsReturned = "ssl:shipmentsReturned"
}

export enum DocumentType {
  Analog = "analog",
  Databox = "databox",
  Digital = "digital",
  Email = "email",
  Hybrid = "hybrid",
  TechnicalDataCarries = "technicalDataCarries"
}

export enum ErrorCodeList {
  SettleOutputReadableType = "V_SETTLE_OUTPUTFORMAT_READABLE_TYPE"
}

export enum SitePaths {
  Administration = "Administration",
  Archive = "Archive",
  Archived = "Archived",
  Cancelled = "Cancelled",
  Closed = "Closed",
  Components = "Components",
  Concepts = "Concepts",
  DataBox = "DataBox",
  Unprocessed = "Unprocessed",
  Dispatch = "Dispatch",
  Dispatched = "Dispatched",
  Documents = "Documents",
  Evidence = "Evidence",
  Files = "Files",
  ForProcessing = "ForProcessing",
  ForSignature = "ForSignature",
  Lent = "Lent",
  LostDestroyed = "LostDestroyed",
  MailBox = "MailBox",
  Mailroom = "Mailroom",
  NotPassed = "NotPassed",
  NotRegistered = "NotRegistered",
  Open = "Open",
  Processed = "Processed",
  ReadyForShredding = "ReadyForShredding",
  Rented = "Rented",
  Repository = "Repository",
  Returned = "Returned",
  SignatureBook = "SignatureBook",
  Shredded = "Shredded",
  ShreddingPlan = "ShreddingPlan",
  ShreddingProposal = "ShreddingProposal",
  Stored = "Stored",
  ToDispatch = "ToDispatch",
  ToAprove = "ToAprove",
  ToHandover = "ToHandover",
  ToTakeOver = "ToTakeOver",
  Unfinished = "Unfinished",
  WaitingForSignature = "WaitingForSignature",
  WaitingForTakeOver = "WaitingForTakeOver"
}

export enum SubmitToRepositoryDialog {
  Documents = "Documents",
  Files = "Files"
}

export enum SpisumGroups {
  Admin = "GROUP_ESSL_Admin",
  Dispatch = "GROUP_Dispatch_1",
  Dispatch0 = "GROUP_Dispatch",
  Mailroom = "GROUP_Mailroom",
  Main = "GROUP_Spisum",
  Repository = "GROUP_Repository",
  Roles = "GROUP_Roles"
}

export enum SpisumNames {
  Borrower = "ssl:borrower",
  BorrowGroup = "ssl:borrowGroup",
  CancelDate = "ssl:cancelDate",
  DispatchedDate = "ssl:dispatchedDate",
  ForSignatureGroup = "ssl:forSignatureGroup",
  Group = "ssl:group",
  IsClosed = "ssl:isClosed",
  IsInFile = "ssl:isInFile",
  IsLostDestroyed = "ssl:isLostDestroyed",
  IsFavorite = "ssl:isFavorite",
  NextGroup = "ssl:nextGroup",
  NextOwner = "ssl:nextOwner",
  NextOwnerDecline = "ssl:nextOwnerDecline",
  RetentionProposal = "ssl:retentionProposal",
  ReturnedForReworkDate = "ssl:returnedForReworkDate",
  SendMode = "ssl:sendMode",
  ShreddingYear = "ssl:shreddingYear"
}

export enum SpisumNamesWithoutPrefix {
  IsFavorite = "isFavorite"
}

export enum SpisumNodeTypes {
  Concept = "ssl:concept",
  Databox = "ssl:databox",
  Document = "ssl:document",
  Email = "ssl:email",
  File = "ssl:file",
  Shipment = "ssl:shipment",
  ShipmentDatabox = "ssl:shipmentDatabox",
  ShipmentEmail = "ssl:shipmentEmail",
  ShipmentPersonally = "ssl:shipmentPersonally",
  ShipmentPost = "ssl:shipmentPost",
  ShipmentPublish = "ssl:shipmentPublish",
  TakeConcept = "ssl:takeConcept",
  TakeDocumentForProcessing = "ssl:takeDocumentForProcessing",
  TakeDocumentProcessed = "ssl:takeDocumentProcessed",
  TakeFileClosed = "ssl:takeFileClosed",
  TakeFileOpen = "ssl:takeFileOpen"
}

export enum SpisumValues {
  Group = "-group-"
}

export enum SenderType {
  Individual = "individual",
  Legal = "legal",
  Own = "own"
}

export enum SendModeValues {
  Email = "email",
  Databox = "databox",
  Post = "post",
  Publish = "publish",
  Personally = "personally"
}

export enum DeliveryMode {
  Currier = "currier",
  Databox = "databox",
  Email = "email",
  Personally = "personally",
  Post = "post"
}

export enum SettleMethod {
  Document = "dokumentem",
  DocumentNote = "zaznamemNaDokumentu",
  Forward = "postoupenim",
  TakeIntoAccount = "vzetimNaVedomi",
  Other = "jinyZpusob"
}

export enum CodeList {
  customSettleMethod = "rmc_CustomSettleMethod"
}

export enum DocumentState {
  NotSettled = "nevyrizen",
  Settled = "vyrizen",
  Closed = "uzavren",
  ReferedToRepository = "predanDoSpisovny",
  ReferedToArchive = "predanDoArchivu",
  Cancelled = "stornovan",
  Shredded = "skartovan"
}

export enum PostType {
  cashOnDelivery = "Dobirka",
  deliveryReport = "Dodejka",
  fee = "Doplatne",
  restrictedDelivery = "DoVlastnichRukou",
  restrictedDeliveryExplicitly = "DoVlastnichRukouVyhradne",
  fragile = "Krehke",
  dontSend = "Nedosilat",
  dontPrologPeriod = "NeprodluzovatLhutu",
  dontPrologCollectionPeriod = "NeprodluzovatOdberniLhutu",
  dontStore = "Neukladat",
  unstorable = "Neskladne",
  unstorableII = "NeskladneII",
  dontPutInPostbox = "NevkladatDoSchranky",
  dontReturn = "Nevracet",
  dontReturnPutInPostbox = "NevracetVlozitDoSchranky",
  replyMails = "OdpovedniZasilky",
  subscriptionBasic = "OpakovaneDodaniBezne",
  subscriptionSpecial = "OpakovaneDodaniZvlastni",
  firstClass = "Pilne",
  prolongCollectionPeriod1month = "ProdlouzeniOdberniLhuty1Mesic",
  payout = "TerminovaVyplata",
  price = "UdanaCena",
  reduceCollectionPeriod3days = "ZkraceniOdberniLhuty3Dny",
  reduceCollectionPeriod10days = "ZkraceniOdberniLhuty10Dni",
  reduceCollectionPeriod1month = "ZkraceniOdberniLhuty1Mesic",
  other = "Jina"
}

export enum PostItemType {
  empty = "",
  insuredParcel = "CennyBalik",
  insuredLetter = "CennePsani",
  internationalInsuredParcel = "CennyBalikDoZahranici",
  internationalInsuredLetter = "CennePsaniDoZahranici",
  registeredMail = "DoporucenaZasilka",
  internationalRegisteredMail = "DoporucenaZasilkaDoZahranici",
  registeredMailStandard = "DoporucenaZasilkaStandard",
  registeredMailForTheBlind = "DoporucenaSlepeckaZasilka",
  internationalRegisteredMailForTheBlind = "DoporucenaSlepeckaZasilkaDoZahranici",
  businessParcel = "ObchodniBalik",
  internationalBusinessParcel = "ObchodniBalikDoZahranici",
  businessLetter = "ObchodniPsani",
  internationalBusinessLetter = "ObchodniPsaniDoZahranici",
  ordinaryParcel = "ObycejnyBalik",
  ordinaryLetter = "ObycejnePsani",
  ordinaryLetterStandard = "ObycejnePsaniStandard",
  ordinaryMailForTheBlind = "ObycejnaSlepeckaZasilka",
  internationalOrdinaryMailForTheBlind = "ObycejnaSlepeckaZasilkaDoZahranici",
  internationalOrdinaryMail = "ObycejnaZasilkaDoZahranici",
  internationalParcelStandard = "StandartniBalikDoZahranici",
  other = "Jina"
}

export enum DateTimeFormats {
  FullDateTime = "DD.MM.YYYY HH:mm:ss",
  Date = "DD.MM.YYYY",
  HoursMinutes = "HH:mm",
  HoursMinutesSeconds = "HH:mm:ss"
}

export enum PostTypeLangMap {
  Dobirka = "cashOnDelivery",
  Dodejka = "deliveryReport",
  Doplatne = "fee",
  DoVlastnichRukou = "restrictedDelivery",
  DoVlastnichRukouVyhradne = "restrictedDeliveryExplicitly",
  Krehke = "fragile",
  Nedosilat = "dontSend",
  NeprodluzovatLhutu = "dontPrologPeriod",
  NeprodluzovatOdberniLhutu = "dontPrologCollectionPeriod",
  Neukladat = "dontStore",
  Neskladne = "unstorable",
  NeskladneII = "unstorableII",
  NevkladatDoSchranky = "dontPutInPostbox",
  Nevracet = "dontReturn",
  NevracetVlozitDoSchranky = "dontReturnPutInPostbox",
  OdpovedniZasilky = "replyMails",
  OpakovaneDodaniBezne = "subscriptionBasic",
  OpakovaneDodaniZvlastni = "subscriptionSpecial",
  Pilne = "firstClass",
  ProdlouzeniOdberniLhuty1Mesic = "prolongCollectionPeriod1month",
  TerminovaVyplata = "payout",
  UdanaCena = "price",
  ZkraceniOdberniLhuty3Dny = "reduceCollectionPeriod3days",
  ZkraceniOdberniLhuty10Dni = "reduceCollectionPeriod10days",
  ZkraceniOdberniLhuty1Mesic = "reduceCollectionPeriod1month",
  Jina = "other"
}
