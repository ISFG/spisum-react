import filesSvg from "assets/icons/files.svg";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { lang, t } from "translation/i18n";
import { useStyles } from "./NoData.styles";

const NoData = () => {
  const classes = useStyles();

  return (
    <div className={classes.noDataContainer}>
      <h1>{t(translationPath(lang.table.noData))}</h1>
      <img
        className={classes.noDataContainerImg}
        src={filesSvg}
        alt="No data icon"
      />
    </div>
  );
};

export default NoData;
