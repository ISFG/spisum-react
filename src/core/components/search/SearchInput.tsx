import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { documentViewAction__Refresh } from "core/components/documentView/_actions";
import { CoreRoutes } from "core/routes";
import React from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useStyles } from "./Search.styles";

const ENTER_KEY_CODE = 13;

export const Search = ({ history }: RouteComponentProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = React.useState<string>();

  const handleOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === ENTER_KEY_CODE && searchTerm) {
        history.push({ pathname: CoreRoutes.SEARCH, state: { searchTerm } });
        dispatch(documentViewAction__Refresh(true));
        setSearchTerm("");
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        classes={{
          input: classes.inputInput,
          root: classes.inputRoot
        }}
        onChange={handleOnChange}
        inputProps={{
          "aria-label": "search",
          onKeyUp: handleOnKeyUp
        }}
        value={searchTerm}
      />
    </div>
  );
};

export default withRouter(Search);
