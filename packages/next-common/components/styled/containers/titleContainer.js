import styled from "styled-components";
import { GreyPanel } from "./greyPanel";
import { pageHomeLayoutMainContentWidth } from "next-common/utils/constants";

// used for card titles, list page titles
export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: var(--textPrimary);
  padding: 0 24px;
`;

export const StatisticTitleContainer = styled(TitleContainer)`
  > :first-child {
    align-items: baseline;
    gap: 8px;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 16px;
  }
  > :last-child {
    display: flex;
    align-items: center;
  }
`;

// used for pages like signup, login, verification, reset password, etc
export const PageTitleContainer = styled.title`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  color: var(--textPrimary);
`;

export const NoticeWrapper = styled(GreyPanel)`
  justify-content: center;
  flex-wrap: wrap;
  padding: 12px;
  margin-bottom: 16px;
  font-weight: 500;
  color: var(--textSecondary);
`;

export const SettingSection = styled.div`
  max-width: ${pageHomeLayoutMainContentWidth}px;
  @media screen and (max-width: 1024px) {
    max-width: 960px;
  }
  @media screen and (min-width: 1080px) {
    padding-bottom: 16px;
  }
  > :not(:first-child) {
    margin-top: 16px;
  }
`;
