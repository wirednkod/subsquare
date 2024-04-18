import { useSelector } from "react-redux";
import chainOrScanHeightSelector from "next-common/store/reducers/selectors/height";
import { usePageProps } from "next-common/context/page";
import { fellowshipCoreMembersSelector } from "next-common/store/reducers/fellowship/core";
import useRealAddress from "next-common/utils/hooks/useRealAddress";
import Tooltip from "next-common/components/tooltip";

export default function Promote({ member }) {
  const address = useRealAddress();
  const { rank, status: { lastPromotion } = {} } = member;

  const members = useSelector(fellowshipCoreMembersSelector);
  const me = members.find((m) => m.address === address);

  const latestHeight = useSelector(chainOrScanHeightSelector);
  const { fellowshipParams } = usePageProps();
  const index = rank > 0 ? rank - 1 : 0;
  const promotionPeriod = fellowshipParams.minPromotionPeriod[index];

  const higherRank = me && me.rank > rank;

  const gone = latestHeight - lastPromotion;
  const promotionPeriodComplete = gone >= promotionPeriod;

  const canPromote = promotionPeriodComplete && higherRank;

  if (!canPromote) {
    let tipContent = "";

    if (!higherRank) {
      tipContent = `Only available to the members with rank > ${rank}`;
    } else if (!promotionPeriodComplete) {
      tipContent = `Available after ${promotionPeriod - gone} blocks`;
    }

    return (
      <Tooltip content={tipContent}>
        <span className="text14Medium text-textDisabled">Promote↗</span>
      </Tooltip>
    );
  }

  return (
    <span className="text14Medium text-theme500 cursor-pointer">Promote↗</span>
  );
}