import PopupWithAddress from "next-common/components/popupWithAddress";
import PopupContent from "./popupContent";
import isUseMetamask from "next-common/utils/isUseMetamask";
import { submitPolkadotExtrinsic } from ".";
import { sendEvmTx } from "next-common/utils/sendEvmTx";
import { encodeProxyData } from "next-common/utils/moonPrecompiles/proxy";
import { encodeBatchAllData } from "next-common/utils/moonPrecompiles/batch";
import { encodeSecondData } from "next-common/utils/moonPrecompiles/democracy";

async function submitMoonMetamaskExtrinsic({
  proposalIndex,
  depositorUpperBound,
  times,
  dispatch,
  setLoading,
  onInBlock,
  onClose,
  signerAccount,
  isMounted,
}) {
  let { callTo, callData } = encodeSecondData({
    propIndex: parseInt(proposalIndex),
    secondsUpperBound: parseInt(depositorUpperBound) || 1,
  });

  if (times > 1) {
    let toParam = [],
      valueParam = [],
      callDataParam = [],
      gasLimitParam = [];

    for (let n = 0; n < times; n++) {
      toParam.push(callTo);
      callDataParam.push(callData);
    }

    ({ callTo, callData } = encodeBatchAllData({
      to: toParam,
      value: valueParam,
      callData: callDataParam,
      gasLimit: gasLimitParam,
    }));
  }

  if (signerAccount?.proxyAddress) {
    ({ callTo, callData } = encodeProxyData({
      real: signerAccount?.proxyAddress,
      callTo,
      callData,
    }));
  }

  await sendEvmTx({
    to: callTo,
    data: callData,
    dispatch,
    setLoading,
    onInBlock,
    onClose,
    signerAddress: signerAccount?.address,
    isMounted,
  });
}

async function submitExtrinsic({
  api,
  proposalIndex,
  depositorUpperBound,
  times,
  dispatch,
  setLoading,
  onSubmitted,
  onInBlock,
  onFinalized,
  onClose,
  signerAccount,
  isMounted,
}) {
  if (isUseMetamask()) {
    await submitMoonMetamaskExtrinsic({
      proposalIndex,
      depositorUpperBound,
      times,
      dispatch,
      setLoading,
      onInBlock,
      onClose,
      signerAccount,
      isMounted,
    });
  } else {
    await submitPolkadotExtrinsic({
      api,
      proposalIndex,
      depositorUpperBound,
      times,
      dispatch,
      setLoading,
      onSubmitted,
      onInBlock,
      onFinalized,
      onClose,
      signerAccount,
      isMounted,
    });
  }
}

export default function MoonSecondPopup(props) {
  return (
    <PopupWithAddress
      title="Delegate"
      Component={PopupContent}
      autoCloseAfterLogin={true}
      submitExtrinsic={submitExtrinsic}
      {...props}
    />
  );
}