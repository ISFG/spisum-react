import { AutocompleteProps } from "@material-ui/lab";
import { GroupMember } from "core/api/models";
import React from "react";

// Add possible options with | operator
export type PossibleAutocompleteOptions = GroupMember;

export type AutocompleteOptionsType = PossibleAutocompleteOptions[];

export interface AutocompleteOnChange {
  onChange: (e: Event, value: PossibleAutocompleteOptions) => void;
}

export type AutocompleteComponentType = React.ComponentType<
  AutocompleteOnChange & AutocompleteProps<PossibleAutocompleteOptions>
>;
