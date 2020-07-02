import { SuccessResponseType } from "core/api/models";
import { nodeChildrenAction } from "core/api/node/_actions";
import { fetchByCustomUrlAction, searchAction } from "core/api/search/_actions";
import { Document, Folder } from "core/types";
import { put, takeLatest } from "redux-saga/effects";
import { convertResponse, getPropertySortName } from "share/utils/convert";
import { handleResponse } from "share/utils/typesafeActions";
import { isEmptyString } from "share/utils/utils";
import { ActionType, getType } from "typesafe-actions";
import { documentViewAction } from "./_actions";

export function* watchDocumentViewAction() {
  yield takeLatest(getType(documentViewAction.request), function* ({
    payload
  }: ActionType<typeof documentViewAction.request>) {
    const {
      children,
      maxItems,
      pageNumber,
      search,
      sortAsc,
      sortKeys,
      customUrl
    } = payload;

    let successResponse: SuccessResponseType<Document, Folder> | undefined;
    let errorResponse = { code: "400", message: null };
    let success = false;

    if (customUrl) {
      yield put(
        fetchByCustomUrlAction.request({
          customUrl,
          include: [...(children?.include || []), "properties"],
          maxItems,
          ...(sortKeys && {
            orderBy: sortKeys.map(
              (key) =>
                `${getPropertySortName(key)} ${
                  sortAsc === true ? "ASC" : "DESC"
                }`
            )
          }),
          skipCount: pageNumber * maxItems,
          where: children?.where
        })
      );
      [successResponse, errorResponse, success] = yield handleResponse(
        fetchByCustomUrlAction
      );
    } else if (search && search.query && !isEmptyString(search.query.query)) {
      yield put(
        searchAction.request({
          include: [...(search.include || []), "properties"],
          paging: {
            maxItems,
            skipCount: pageNumber * maxItems
          },
          query: {
            language: search.query.language || "afts",
            query: search.query.query
          },
          ...(sortKeys && {
            sort: sortKeys.map((key) => ({
              ascending: sortAsc === true,
              field: getPropertySortName(key),
              type: "FIELD"
            }))
          })
        })
      );

      [successResponse, errorResponse, success] = yield handleResponse(
        searchAction
      );
    } else if (children && (children.nodeId || children.relativePath)) {
      yield put(
        nodeChildrenAction.request({
          include: [...(children.include || []), "properties"],
          includeSource: children.includeSource,
          maxItems,
          nodeId: children.nodeId,
          ...(sortKeys && {
            orderBy: sortKeys.map(
              (key) =>
                `${getPropertySortName(key)} ${
                  sortAsc === true ? "ASC" : "DESC"
                }`
            )
          }),
          relativePath: children.relativePath,
          skipCount: pageNumber * maxItems,
          where: children.where
        })
      );

      [successResponse, errorResponse, success] = yield handleResponse(
        nodeChildrenAction
      );
    }

    if (!success) {
      yield put(documentViewAction.failure(errorResponse));
      return;
    }

    if (successResponse) {
      yield put(documentViewAction.success(convertResponse(successResponse)));
    }
  });
}
