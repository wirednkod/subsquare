import { CHAIN } from "next-common/utils/constants";
import { getTreasuryMenu } from "next-common/utils/consts/menu/treasury";
import normalizeTreasuryProposalListItem from "next-common/utils/viewfuncs/treasury/normalizeProposalListItem";
import {
  getProposalPostTitleColumn,
  getRequestColumn,
  getStatusTagColumn,
  getVoteSummaryColumnPlaceholder,
} from "./columns";
import businessCategory from "next-common/utils/consts/business/category";
import normalizeBountyListItem from "next-common/utils/viewfuncs/treasury/normalizeBountyListItem";
import normalizeTipListItem from "next-common/utils/viewfuncs/treasury/normalizeTipListItem";
import { overviewApi } from "next-common/services/url";
import { usePageProps } from "next-common/context/page";

const itemOptions = {
  proposals: {
    api: {
      path: overviewApi.treasuryProposals,
    },
    formatter(data) {
      return normalizeTreasuryProposalListItem(CHAIN, data);
    },
    category: businessCategory.treasuryProposals,
  },
  bounties: {
    api: {
      path: overviewApi.treasuryBounties,
    },
    formatter(data) {
      return normalizeBountyListItem(CHAIN, data);
    },
    category: businessCategory.treasuryBounties,
  },
  "child-bounties": {
    api: {
      path: overviewApi.treasuryChildBounties,
    },
    formatter(data) {
      return normalizeBountyListItem(CHAIN, data);
    },
    category: businessCategory.treasuryChildBounties,
  },
  tips: {
    api: {
      path: overviewApi.treasuryTips,
    },
    formatter(data) {
      return normalizeTipListItem(CHAIN, data);
    },
    category: businessCategory.treasuryTips,
  },
};

export function useRecentProposalTreasury() {
  const { overviewSummary, summary, recentProposals } = usePageProps();

  const menu = getTreasuryMenu(summary);

  const items = menu.items
    ?.map((item) => {
      if (
        item.value === "proposals" &&
        !overviewSummary?.treasuryProposals?.active
      ) {
        return;
      }
      if (item.value === "bounties" && !overviewSummary?.bounties?.active) {
        return;
      }
      if (
        item.value === "child-bounties" &&
        !overviewSummary?.childBounties?.active
      ) {
        return;
      }
      if (item.value === "tips" && !overviewSummary?.treasury?.tips?.active) {
        return;
      }

      const options = itemOptions[item.value];

      const requestColumn = getRequestColumn();
      if (item.value === "tips") {
        requestColumn.name = "Value";
      }

      if (options) {
        return {
          ...item,
          ...options,
          api: {
            ...options.api,
            initData: recentProposals.treasury?.[item.value],
          },
          columns: [
            getProposalPostTitleColumn(),
            requestColumn,
            getVoteSummaryColumnPlaceholder(),
            getStatusTagColumn({ category: options.category }),
          ],
        };
      }
    })
    .filter(Boolean);

  return {
    ...menu,
    items,
  };
}
