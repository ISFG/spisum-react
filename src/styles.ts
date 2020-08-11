import styled, { CreateStyled } from "@emotion/styled";
import { createMuiTheme } from "@material-ui/core";

export interface ITheme {
  colors: {
    backgroundSecondary: string;
    black: string;
    borderSecundary: string;
    buttonNegative: string;
    buttonPositive: string;
    buttonPrimary: string;
    buttonPrimaryBackground: string;
    buttonSecondary: string;
    buttonSecondaryBackground: string;
    error: string;
    gray: string;
    lightGray: string;
    orange: string;
    primary: string;
    warning: string;
    white: string;
    whiteOpacity: string;
  };
  drawerWidth: number;
  fontFamily: string;
}

export const theme: ITheme = {
  colors: {
    backgroundSecondary: "#fefbf2",
    black: "#000",
    borderSecundary: "#000",
    buttonNegative: "#F40105",
    buttonPositive: "#288E00",
    buttonPrimary: "#fff",
    buttonPrimaryBackground: "#FF9600",
    buttonSecondary: "#000",
    buttonSecondaryBackground: "#fff !important",
    error: "#f44336",
    gray: "#848788",
    lightGray: "#d7d7d7",
    orange: "#FF9600",
    primary: "#141E1E",
    warning: "#ff9824",
    white: "#fff",
    whiteOpacity: "rgba(0,0,0,0.87)"
  },
  drawerWidth: 250,
  fontFamily: "Roboto,Helvetica Neue,sans-serif"
};

export const muiTheme = createMuiTheme({
  overrides: {
    MuiButton: {
      containedSecondary: {
        color: "#ffffff"
      },
      root: {
        borderRadius: 0
      }
    },
    MuiCheckbox: {
      colorSecondary: {
        "&$checked": {
          color: theme.colors.buttonPrimaryBackground
        },
        color: theme.colors.buttonPrimaryBackground
      }
    },
    MuiFormHelperText: {
      root: {
        lineHeight: 1
      }
    },
    MuiInputLabel: {
      root: {
        "&.MuiFormLabel-root--long-text": {
          top: "-10px !important"
        }
      }
    },
    MuiTable: {
      root: {
        stickyHeader: {
          backgroundColor: "transparent"
        }
      }
    },
    MuiTableRow: {
      root: {
        "&$selected": {
          "&:hover": { background: "rgba(255,150,0,0.06)" },
          background: "rgba(255,150,0,0.12)",
          borderColor: theme.colors.orange
        }
      }
    },

    MuiTooltip: {
      tooltip: {
        backgroundColor: "#000",
        border: "1px solid #dadde9",
        color: "#fff",
        fontSize: 12,
        maxWidth: 220,
        padding: 10
      }
    }
  },
  palette: {
    background: { default: "#F0F1F3" },
    primary: {
      main: "#000000"
    },
    secondary: {
      main: "#FF9600"
    }
  }
});

export default styled as CreateStyled<ITheme>;
