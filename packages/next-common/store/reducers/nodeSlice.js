import { createSlice } from "@reduxjs/toolkit";

import {
  DEFAULT_KUSAMA_NODE_URL,
  DEFAULT_KUSAMA_NODES,
  DEFAULT_KARURA_NODE_URL,
  DEFAULT_ACALA_NODES,
  DEFAULT_ACALA_NODE_URL,
  DEFAULT_KARURA_NODES,
  DEFAULT_KHALA_NODE_URL,
  DEFAULT_KHALA_NODES,
  DEFAULT_BASILISK_NODE_URL,
  DEFAULT_BASILISK_NODES,
  DEFAULT_BIFROST_NODES,
  DEFAULT_BIFROST_NODE_URL,
  DEFAULT_KINTSUGI_NODES,
  DEFAULT_KINTSUGI_NODE_URL,
  DEFAULT_POLKADEX_NODES,
  DEFAULT_POLKADEX_NODE_URL,
  defaultNodes,
} from "../../utils/constants";

const chain = process.env.NEXT_PUBLIC_CHAIN;

let nodeUrl = (() => {
  let localNodeUrl = null;
  try {
    localNodeUrl = localStorage.getItem("nodeUrl");
  } catch (e) {
    // ignore parse error
  }

  return {
    kusama:
      DEFAULT_KUSAMA_NODES.find((item) => item.url === localNodeUrl)?.url ||
      DEFAULT_KUSAMA_NODE_URL,
    karura:
      DEFAULT_KARURA_NODES.find((item) => item.url === localNodeUrl)?.url ||
      DEFAULT_KARURA_NODE_URL,
    acala:
      DEFAULT_ACALA_NODES.find((item) => item.url === localNodeUrl)?.url ||
      DEFAULT_ACALA_NODE_URL,
    khala:
      DEFAULT_KHALA_NODES.find((item) => item.url === localNodeUrl)?.url ||
      DEFAULT_KHALA_NODE_URL,
    basilisk:
      DEFAULT_BASILISK_NODES.find((item) => item.url === localNodeUrl)?.url ||
      DEFAULT_BASILISK_NODE_URL,
    bifrost:
      DEFAULT_BIFROST_NODES.find((item) => item.url === localNodeUrl)?.url ||
      DEFAULT_BIFROST_NODE_URL,
    kintsugi:
      DEFAULT_KINTSUGI_NODES.find((item) => item.url === localNodeUrl)?.url ||
      DEFAULT_KINTSUGI_NODE_URL,
    polkadex:
      DEFAULT_POLKADEX_NODES.find((item) => item.url === localNodeUrl)?.url ||
      DEFAULT_POLKADEX_NODE_URL,
  };
})();

const nodeSlice = createSlice({
  name: "node",
  initialState: {
    currentNode: nodeUrl[chain],
    nodes: defaultNodes[chain],
    nodesHeight: 0,
  },
  reducers: {
    setCurrentNode(state, { payload }) {
      const { url, refresh } = payload;
      const beforeUrl = state.currentNode;

      state.currentNode = url;
      state.nodes = (state.nodes || []).map((item) => {
        if (item.url === beforeUrl) {
          return { ...item, update: true };
        } else {
          return item;
        }
      });
      localStorage.setItem("nodeUrl", url);

      if (refresh) {
        window.location.href = `https://${chain}.subsquare.io`;
      }
    },
    setNodesDelay(state, { payload }) {
      (payload || []).forEach((item) => {
        const node = (state.nodes || []).find((node) => item.url === node.url);
        if (node) node.delay = item.delay;
      });
    },
    setNodeBlockHeight(state, { payload }) {
      state.nodesHeight = payload;
    },
  },
});

export const currentNodeSelector = (state) => state.node?.currentNode;
export const nodesSelector = (state) => state.node?.nodes;
export const nodesHeightSelector = (state) => state.node?.nodesHeight;

export const { setCurrentNode, setNodesDelay, setNodeBlockHeight } =
  nodeSlice.actions;

export default nodeSlice.reducer;
