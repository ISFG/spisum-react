import { Save } from "@material-ui/icons";
import { nodeContentAction } from "core/api/node/_actions";
import { ControlsBarType } from "core/components/dataTable/_types";
import { DialogContentPropsType } from "core/components/dialog/_types";
import { ShreddingPlan } from "core/features/login/_types";
import { fetchShreddingPlanComponent } from "core/helpers/api/ShreddingPlanComponentFetcher";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "reducers";
import { lang, t } from "translation/i18n";
import { translationPath } from "../../../utils/getPath";
import Components from "./Components";

type ComponentsInitalState = {
  pageNumber: number;
  rowsPerPage: number;
  sortAsc?: boolean;
  sortColumnIndex?: number;
  sortKeys?: string[];
};

const initialState: ComponentsInitalState = {
  pageNumber: 0,
  rowsPerPage: 100,
  sortAsc: true
};

const filterData = (
  items: ShreddingPlan[],
  sortAsc: boolean | undefined,
  pageNumber: number,
  rowsPerPage: number
) => {
  const start = pageNumber * rowsPerPage;
  return items
    .sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    )
    .slice(start, start + rowsPerPage);
};

const ComponentsContainer = React.memo(
  ({ channel }: DialogContentPropsType) => {
    const dispatch = useDispatch();
    const [
      { pageNumber, rowsPerPage, sortColumnIndex, sortAsc },
      setState
    ] = useState<ComponentsInitalState>(initialState);

    const items = useSelector(
      (state: RootStateType) => state.loginReducer.global.shreddingPlans
    );

    const [filteredItems, setFilteredItems] = useState<ShreddingPlan[]>(
      filterData(items, sortAsc, pageNumber, rowsPerPage)
    );
    const [selectedPlans, setSelectedPlans] = useState<ShreddingPlan[]>([
      filteredItems[0]
    ]);

    useEffect(() => {
      if (!items.length) {
        return;
      }
      fetchAndPreviewComponent(selectedPlans[0]);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      setFilteredItems(filterData(items, sortAsc, pageNumber, rowsPerPage));
    }, [items, sortAsc, pageNumber, rowsPerPage]);

    const fetchAndPreviewComponent = async (shreddingPlan: ShreddingPlan) => {
      const component = await fetchShreddingPlanComponent(shreddingPlan);
      if (component) {
        dispatch(nodeContentAction.success(component));
        channel.setPreviewItem(component, true);
      }
    };

    const handleChangePage: (
      event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
      page: number
    ) => void = useCallback((_, page) => {
      setState((state) => ({
        ...state,
        pageNumber: page
      }));
    }, []);

    const handleChangeRowsPerPage: (
      event: React.ChangeEvent<HTMLInputElement>
    ) => void = useCallback((event) => {
      setState((state) => ({
        ...state,
        rowsPerPage: +event.target.value
      }));
    }, []);

    const handleShowPreview = (selected: ShreddingPlan[]) => {
      if (selected.length) {
        fetchAndPreviewComponent(selected[0]);
      }

      setSelectedPlans(selected.filter((s) => !selectedPlans.includes(s)));
    };

    const controls: ControlsBarType<ShreddingPlan> = {
      single: {
        items: [
          {
            action: (selected) => {
              fetchShreddingPlanComponent(selected[0], true);
            },
            icon: <Save />,
            title: t(translationPath(lang.general.download))
          }
        ]
      }
    };

    const handleSortingChange: (
      index: number,
      keys: string[]
    ) => (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void = (
      index,
      keys
    ) => (event) => {
      setState((state) => ({
        ...state,
        sortAsc: index === state.sortColumnIndex ? !sortAsc : false,
        sortColumnIndex: index,
        sortKeys: keys
      }));
    };

    return (
      <Components
        controls={controls}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleSortingChange={handleSortingChange}
        handleSelectionChange={handleShowPreview}
        items={filteredItems}
        pageNumber={pageNumber}
        rowsPerPage={rowsPerPage}
        sortAsc={sortAsc}
        sortColumnIndex={sortColumnIndex}
        totalItems={items.length}
        selected={selectedPlans}
      />
    );
  }
);

export default ComponentsContainer;
