import MenuLayout from "core/components/layout/MenuLayout";
import React from "react";
import { translationPath } from "share/utils/getPath";
import { t } from "translation/i18n";
import lang from "translation/lang";
import {
  Box,
  Divider,
  IconBox,
  Manual,
  Support,
  TextBox,
  Wrapper,
  Youtube
} from "./Component.styles";

interface OwnProps {
  menuPath?: string[];
}

const Dashboard = (props: OwnProps) => {
  return (
    <MenuLayout>
      <Wrapper>
        <TextBox>
          <p>{t(translationPath(lang.dashboard.moveYourKnowledge))}</p>
          <p className="colored">
            {t(translationPath(lang.dashboard.documentDigitization))}
          </p>
          <p>{t(translationPath(lang.dashboard.toNewLevel))}</p>
        </TextBox>
        <Divider />
        <Box>
          <IconBox>
            <a
              href="https://www.youtube.com/channel/UCCG3Zk88QQwbHtxS_Q9iPpA"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Youtube />
            </a>
            {t(translationPath(lang.dashboard.isfgYoutubeChannel))}
          </IconBox>
          <IconBox>
            <Manual />
            {t(translationPath(lang.dashboard.usersManual))}
          </IconBox>
          <IconBox>
            <Support />
            {t(translationPath(lang.dashboard.technicalSupport))}
          </IconBox>
        </Box>
      </Wrapper>
    </MenuLayout>
  );
};

export default Dashboard;
