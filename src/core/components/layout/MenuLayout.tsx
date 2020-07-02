import React, { ReactText } from "react";
import Menu from "../menu";
import SignedLayout from "./SignedLayout";
import { useMenuItemsWithPermissions } from "../../hooks/useMenuItemsWithPermissons";

interface OwnProps {
  children: React.ReactElement<{ menuPath: string[] }> | ReactText;
}

const MenuLayout = ({ children }: OwnProps) => {
  const itemsOfMenu = useMenuItemsWithPermissions();
  return (
    <SignedLayout>
      <Menu itemsOfMenu={itemsOfMenu}>{children}</Menu>
    </SignedLayout>
  );
};

export default MenuLayout;
