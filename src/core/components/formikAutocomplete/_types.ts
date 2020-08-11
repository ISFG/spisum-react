import { AutocompleteProps } from "@material-ui/lab";
import { GroupMember } from "core/api/models";
import React from "react";

// Add possible options with | operator
export type PossibleAutocompleteOptions = GroupMember;

export type AutocompleteOptionsType = PossibleAutocompleteOptions[];

export type AutocompleteComponentType = React.ComponentType<
  AutocompleteProps<
    PossibleAutocompleteOptions,
    undefined,
    undefined,
    undefined
  >
>;
