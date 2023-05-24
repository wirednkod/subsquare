import useDemocracyTally from "./tally";
import BigNumber from "bignumber.js";
import useDemocracyThreshold from "./threshold";
import compareRationals from "../../../../utils/democracy/rational";

export default function useIsDemocracyPassing() {
  const tally = useDemocracyTally();
  const threshold = useDemocracyThreshold();

  const ayes = new BigNumber(tally.ayes);
  const nays = new BigNumber(tally.nays);

  if (threshold.toLowerCase() === "simplemajority") {
    return ayes.gt(nays);
  }

  const turnout = new BigNumber(tally.turnout);
  const sqrtTurnout = turnout.sqrt();
  const sqrtElectorate = new BigNumber(tally.electorate).sqrt();

  if (sqrtTurnout.isZero()) {
    return false;
  }

  if (threshold.toLowerCase() === "supermajorityapprove") {
    return compareRationals(nays, sqrtTurnout, ayes, sqrtElectorate);
  } else if (threshold.toLowerCase() === "supermajorityagainst") {
    return compareRationals(nays, sqrtElectorate, ayes, sqrtTurnout);
  }

  return false;
}