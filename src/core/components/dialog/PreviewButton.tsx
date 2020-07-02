import Tooltip from "@material-ui/core/Tooltip";
import React, { useCallback, useState } from "react";
import { withTranslation } from "react-i18next";
import { translationPath } from "share/utils/getPath";
import { lang, t, WithTranslation } from "translation/i18n";
import { StyledVisibilityIcon, StyledVisibilityOffIcon } from "./Dialog.styles";

interface OwnProps {
  showPreview: boolean;
  handlePreviewChange: (showPreview: boolean) => void;
}

const Component = ({
  showPreview,
  handlePreviewChange
}: OwnProps & WithTranslation) => {
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);

  // we need to handle tooltip opening manually, because if you click
  // on preview button, modal gets bigger and tooltip stays opened
  // and we want to prevent this behaviour
  const onOpen = useCallback(() => {
    setOpenTooltip(true);
  }, []);

  const onClose = useCallback(() => {
    setOpenTooltip(false);
  }, []);

  const onClick = useCallback(() => {
    setOpenTooltip(false);
    setTimeout(() => {
      handlePreviewChange(!showPreview);
    }, 0); // we want to handle preview change after tooltip is dismissed
  }, [handlePreviewChange, showPreview]);

  return (
    <>
      {showPreview ? (
        <Tooltip
          onClose={onClose}
          onOpen={onOpen}
          open={openTooltip}
          title={t(translationPath(lang.modal.hidePreview))}
        >
          <StyledVisibilityOffIcon
            data-test-id="modal-hide-preview"
            onClick={onClick}
          />
        </Tooltip>
      ) : (
        <Tooltip
          onClose={onClose}
          onOpen={onOpen}
          open={openTooltip}
          title={t(translationPath(lang.modal.showPreview))}
        >
          <StyledVisibilityIcon
            data-test-id="modal-show-preview"
            onClick={onClick}
          />
        </Tooltip>
      )}
    </>
  );
};

export default withTranslation()(Component);
