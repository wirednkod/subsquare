import React from "react";
import CountDown from "../countDown";
import { abbreviateBigNumber, toPrecision } from "../../../utils";
import useApi from "../../../utils/hooks/useApi";
import useTreasuryFree from "../../../utils/hooks/useTreasuryFree";
import { useChain, useChainSettings } from "../../../context/chain";
import Summary from "../v2/base";
import TreasuryBurn from "../treasurySummaryItems/burn";
import { isKintsugiChain } from "next-common/utils/chain";
import SpendPeriod from "next-common/components/summary/treasurySummary/spendPeriod";
import useSpendPeriodSummary from "next-common/components/summary/treasurySummary/useSpendPeriodSummary";

export default function TreasurySummary() {
  const chain = useChain();
  const api = useApi();
  const node = useChainSettings();

  const decimals = node?.decimals;
  const symbol = node?.symbol;

  const free = useTreasuryFree(api);
  const summary = useSpendPeriodSummary();

  const spendPeriodsItem = {
    title: "Spend Period",
    content: <SpendPeriod summary={summary} />,
    suffix: (
      <div className="flex max-sm:hidden">
        <CountDown percent={summary?.progress ?? 0} />
      </div>
    ),
  };

  return (
    <Summary
      items={[
        {
          title: "Available",
          content: (
            <>
              <span>{abbreviateBigNumber(toPrecision(free, decimals))}</span>
              <span className="unit upper">{symbol}</span>
            </>
          ),
        },
        {
          title: "Next Burn",
          content: <TreasuryBurn free={free} />,
        },
        isKintsugiChain(chain) ? null : spendPeriodsItem,
      ].filter(Boolean)}
    />
  );
}