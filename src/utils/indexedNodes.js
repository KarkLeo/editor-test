/**
 * Search and get the node and index in the node in any HTML tree by global index
 * */
export const getNodeAndIndexByCommonIndex = (el, index) => {
  let tempIndex = index
  let res, resIndex
  const checker = (node) => {
    if (node.nodeName !== '#text') {
      node.childNodes.forEach(node => checker(node))
    } else {
      if (tempIndex <= node.length && !res) {
        res = node;
        resIndex = tempIndex;
      } else {
        tempIndex = tempIndex - node.length
      }
    }
  }
  el.childNodes.forEach(node => checker(node))
  return [res, resIndex]
}

/**
 * Get the last node and the index of last symbol in this node in the HTML tree
 * */
export const getLastNodeAndIndex = (el) => {
  let res, resIndex
  const checker = (node) => {
    if (node?.nodeName !== '#text') {
      if (node.childNodes.length)
        checker(node?.childNodes[node.childNodes.length - 1])
      else {
        res = node
        resIndex = 0
      }
    } else {
      res = node;
      resIndex = node.length || 0;

    }
  }

  checker(el.childNodes[el.childNodes.length - 1])


  return [res, resIndex]
}

/**
 * Get global index in the HTML tree by the node and index in the node.
 * */
export const getCommonIndexByNodeAndIndex = (el, node, nodeIndex) => {
  let tempIndex = 0
  let resIndex

  const checker = (currentNode) => {
    if (currentNode.nodeName !== '#text' && currentNode !== node) {
      //for each every node
      currentNode.childNodes.forEach(node => checker(node))
    } else {
      if (currentNode === node) {
        resIndex = tempIndex + nodeIndex
      } else {
        tempIndex = tempIndex + currentNode.length
        // next node
      }
    }
  }
  el.childNodes.forEach(i => checker(i))

  return resIndex
}