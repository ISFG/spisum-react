import {
  Button,
  CircularProgress,
  DialogContent,
  DialogTitle
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Cancel, Refresh } from "@material-ui/icons";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Autocomplete } from "@material-ui/lab";
import { Field } from "formik";
import styled from "styles";
import { BaseField } from "../form/fields/BaseField";

export const useStyles = makeStyles(({ palette, typography }: Theme) => {
  const gap = "10px";
  const bodyPadding = `calc(2 * ${gap}) calc(3 * ${gap}) ${gap} calc(3 * ${gap})`;
  const fullWidth = {
    "@media (max-width: 1000px)": {
      minWidth: "calc(100vw - 124px)",
      width: "calc(100vw - 124px)"
    },
    // need to set exact value, because of minimal modal body height, to prevent
    // modal jumping on tab change
    minWidth: "900px"
  };

  const styledCheckboxBase = {
    "& > span": {
      marginRight: `${gap} !important`,
      padding: "0 !important",
      width: "auto !important"
    },
    alignItems: "flex-end",
    display: "flex",
    margin: `${gap}  0 0 0 !important`,
    paddingBottom: "1.5em !important"
  };

  const fieldResponsiveGapRight = {
    "@media (max-width: 600px)": {
      marginRight: "10% !important"
    },
    marginRight: "5% !important"
  };

  return createStyles({
    action: {
      borderRadius: 0,
      marginRight: "10px"
    },
    actionBarPrimary: {
      "& .title": {
        color: `${palette.common.black} !important`,
        fontSize: "1.25rem"
      },
      paddingLeft: "0 !important"
    },
    actionsContainer: {
      background: palette.common.white,
      bottom: 0,
      minHeight: "65px",
      padding: "15px 30px",
      position: "absolute",
      width: "100%"
    },
    addFileButton: {
      "& svg": {
        color: palette.common.black,
        fontSize: "1.2rem",
        marginLeft: gap
      }
    },
    alignBaselineField: {
      "& :before": {
        borderBottomStyle: "hidden !important"
      },
      alignItems: "baseline",
      width: "100%"
    },
    alignItemsEnd: {
      alignItems: "flex-end"
    },
    bookmark: {
      backgroundColor: palette.common.black
    },
    buttonCancel: {
      color: palette.common.black,
      position: "absolute",
      right: "30px"
    },
    colorBlack: {
      color: `${palette.common.black} !important`
    },
    contentCentered: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center"
    },
    detail: {
      // position: "relative"
    },
    emptyMenuItem: {
      minHeight: "33px"
    },
    error: {
      border: `1px solid ${palette.error.main}`,
      color: palette.error.main,
      paddingLeft: "20px",
      paddingRight: "20px"
    },
    fieldErrorPositioned: {
      "& .MuiFormHelperText-root.Mui-error": {
        bottom: "15px !important"
      }
    },
    flex: {
      display: "flex"
    },
    flexDirectionRow: {
      flexDirection: "row !important" as "row"
    },
    form: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between"
    },
    fromSignatureContainer: {
      "@media (max-width: 1000px)": {
        minWidth: "calc(100vw - 124px)",
        width: "calc(100vw - 124px)"
      },
      minWidth: "720px"
    },
    fullWidth: {
      width: "100%"
    },
    gapRight: {
      ...fieldResponsiveGapRight
    },
    gapRightBig: {
      "@media (max-width: 600px)": {
        marginRight: "40%"
      },
      marginRight: "35%"
    },
    gapRightFifth: {
      "@media (max-width: 600px)": {
        marginRight: "10%"
      },
      marginRight: "2.5%"
    },
    longLabel: {
      "& .MuiFormLabel-root": {
        top: "-10px !important"
      }
    },
    mediumLabel: {
      color: `${palette.common.black} !important`,
      fontSize: "1.4rem !important"
    },
    mlGap: {
      marginLeft: gap
    },
    modal: {
      borderRadius: 0,
      maxHeight: "80vh",
      maxWidth: "960px",
      minHeight: "150px",
      minWidth: "300px",
      overflow: "hidden"
    },
    modalBody: {
      "& .action-bar__container": {
        "& > div": {
          maxHeight: "20px"
        },
        paddingTop: "15px !important"
      },
      "& .dialog__table-layout": {
        maxHeight: "calc(80vh - 330px)"
      },
      marginBottom: "65px",
      maxHeight: "calc(80vh - 200px)",
      overflow: "auto",
      padding: bodyPadding
    },
    modalBodyFullSize: {
      "& > .body-fullsize": { ...fullWidth, height: "calc(80vh - 237px)" },
      "& > .body-fullwidth": fullWidth,
      "& > .body-midsize": { ...fullWidth, width: "700px", minWidth: "auto" }
    },
    modalBodyFullscreen: {
      maxHeight: "calc(100vh - 100px) !important"
    },
    modalBodyInvisible: {
      display: "none"
    },
    modalContent: {
      display: "flex",
      height: "100%"
    },
    modalFullscreen: {
      "& .comments__child-container": {
        maxHeight: "calc(100vh - 340px) !important"
      },
      "& .dialog__table-layout": {
        marginBottom: "52px",
        maxHeight: "calc(100vh - 330px) !important"
      },
      display: "flex",
      flexDirection: "row",
      height: "100vh !important"
    },
    modalSmall: {
      minWidth: "400px"
    },
    mrGap: {
      marginRight: "10px"
    },
    mtGap: {
      marginTop: "10px"
    },
    multiSelectAutoGrow: {
      "& > .MuiSelect-selectMenu": {
        whiteSpace: "initial"
      }
    },
    previewContainer: {
      // Hide save button. Needs to be like this, preview component
      // does not take props to hide specific controls
      "& .preview-bar": {
        minHeight: 60
      },

      "& .preview-bar-left:nth-child(2)": {
        "& .preview-button:nth-child(2)": {
          display: "none"
        }
      },
      borderRight: "1px solid rgba(0, 0, 0, 0.4)",
      width: "50%"
    },
    radioAlignLeft: {
      alignSelf: "start",
      marginLeft: "0px !important"
    },
    rootInlineField: {
      paddingBottom: "0 !important",
      width: "80%"
    },
    selectedItem: {
      "&.Mui-selected": {
        fontWeight: typography.fontWeightMedium
      }
    },
    styledCheckbox: {
      ...styledCheckboxBase,
      "@media (max-width: 600px)": {
        width: "45% !important"
      },
      "@media (max-width: 960px)": {
        width: "30%"
      },
      width: "21%"
    },
    styledCheckboxFull: {
      ...styledCheckboxBase,
      width: "100%"
    },
    styledCheckboxGapRight: {
      ...styledCheckboxBase,
      "@media (max-width: 600px)": {
        width: "45% !important"
      },
      "@media (max-width: 960px)": {
        width: "30%"
      },
      margin: "unset !important",
      marginRight: "3.9% !important",
      width: "21%"
    },
    success: {
      border: `1px solid ${palette.success.main}`,
      color: palette.success.main
    },
    tablePagination: {
      bottom: "-52px !important",
      // height of pagination
      left: "0 !important",
      position: "absolute !important" as "absolute"
    },
    tablePaginationDisabled: {
      display: "none"
    },
    textCenter: {
      textAlign: "center"
    },
    visualCheckbox: {
      marginLeft: "4px",
      zIndex: 1
    },
    warning: {
      border: `1px solid ${palette.warning.main}`,
      color: palette.warning.main
    },
    widthFull: {
      width: "100%"
    },
    widthHalf: {
      width: "50%"
    }
  });
});

export const StyledCancelIcon = styled(Cancel)(() => ({
  cursor: "pointer",
  float: "right",
  fontSize: 24,
  margin: "4px"
}));

export const StyledRefreshIcon = styled(Refresh)(() => ({
  cursor: "pointer",
  float: "right",
  fontSize: 24,
  margin: "4px"
}));

export const Content = styled(DialogContent)(() => ({
  padding: "20px"
}));

const StyledDialogButton = styled(Button)<{}>(({ theme }) => ({}));

export const StyledDialogCancelButton = styled(StyledDialogButton)<{}>(
  ({ theme }) => ({
    background: "none",
    border: `1px solid ${theme.colors.black}`
  })
);

export const StyledDialogSecondaryButton = styled(StyledDialogButton)<{}>(
  ({ theme }) => ({})
);

export const StyledDialogSubmitButton = styled(StyledDialogButton)<{}>(
  ({ theme }) => ({
    "&:hover": { color: theme.colors.whiteOpacity },
    background: theme.colors.orange,
    color: theme.colors.white
  })
);

export const StyledDialogTitle = styled(DialogTitle)<{}>(({ theme }) => ({
  background: theme.colors.black,
  color: theme.colors.white,
  position: "relative",
  textAlign: "center"
}));

export const StyledVisibilityIcon = styled(Visibility)(() => ({
  cursor: "pointer",
  float: "right",
  fontSize: "24px",
  margin: "4px"
}));

export const StyledVisibilityOffIcon = styled(VisibilityOff)(() => ({
  cursor: "pointer",
  float: "right",
  fontSize: "24px",
  margin: "4px"
}));

export const fixedPadding = "1.5em !important";
export const responsiveFieldQuarter = {
  "@media (max-width: 600px)": {
    width: "45% !important"
  },
  "@media (max-width: 960px)": {
    width: "30%"
  },
  paddingBottom: fixedPadding,
  width: "21%"
};

export const responsiveFieldThird = {
  "@media (max-width: 600px)": {
    width: "100% !important"
  },
  paddingBottom: fixedPadding,
  width: "30% !important"
};

export const responsiveFieldFifth = {
  "@media (max-width: 960px)": {
    width: "45% !important"
  },
  paddingBottom: fixedPadding,
  width: "18%"
};

export const responsiveFieldHalf = {
  "@media (max-width: 600px)": {
    width: "100% !important"
  },
  paddingBottom: fixedPadding,
  width: "45%"
};

export const StyledField = styled(BaseField)<{}>(() => responsiveFieldQuarter);

export const StyledFieldWide = styled(Field)<{}>(() => ({
  marginTop: "10px",
  paddingBottom: fixedPadding,
  width: "100%"
}));

export const StyledFieldThird = styled(Field)<{}>(() => ({
  "@media (max-width: 600px)": {
    width: "100% !important"
  },
  paddingBottom: fixedPadding,
  width: "30% !important"
}));

export const StyledFieldQuarter = styled(Field)<{}>(() => ({
  "@media (max-width: 600px)": {
    width: "100% !important"
  },
  paddingBottom: fixedPadding,
  width: "65% !important"
}));

export const StyledFieldFifth = styled(BaseField)<{}>(
  () => responsiveFieldFifth
);

export const StyledFakeFieldFifth = styled("div")<{}>(() => ({
  ...responsiveFieldFifth,
  paddingBottom: "0px !important"
}));

export const StyledFakeField = styled("div")<{}>(() => ({
  ...responsiveFieldQuarter,
  paddingBottom: "0px !important"
}));

export const StyledFormControl = styled(FormControl)<{}>(
  () => responsiveFieldQuarter
);

export const StyledFormControlThird = styled(FormControl)<{}>(
  () => responsiveFieldThird
);

export const StyledFormControlHalf = styled(FormControl)<{}>(
  () => responsiveFieldHalf
);

export const StyledFormControlFifth = styled(FormControl)<{}>(
  () => responsiveFieldFifth
);

export const StyledFormControlWide = styled(FormControl)<{}>(() => ({
  paddingBottom: fixedPadding,
  width: "100%"
}));

export const StyledDivThird = styled("div")<{}>(() => responsiveFieldThird);

export const StyledAutocomplete = styled(Autocomplete)<{}>(
  () => responsiveFieldQuarter
);

export const StyledAutocompleteHalf = styled(Autocomplete)<{}>(
  () => responsiveFieldHalf
);

export const Spinner = styled(CircularProgress)(() => ({
  marginLeft: 5,
  marginRight: 5
}));
