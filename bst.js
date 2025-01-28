class Node {
  constructor(data = null, leftNode = null, rightNode = null) {
    this.data = data;
    this.leftNode = leftNode;
    this.rightNode = rightNode;
  }
}

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }

  buildTree = (array) => {
    let arr = removeDuplicates(array.sort((a, b) => a - b));
    return buildTreeRecur(arr, 0, arr.length - 1);
  }

  removeDuplicates = (array) => {
    let arr = [];
    array.forEach(element => {
      if (!arr.includes(element)) {
        arr.push(element);
      }
    });
    return arr;
  }

  buildTreeRecur = (array, start, end) => {
    if (start > end) {
      return null;
    }

    let mid = start + Math.floor((end - start) / 2);

    let root = new Node(array[mid]);

    root.left = buildTreeRecur(array, start, mid -1);

    root.right = buildTreeRecur(array, mid + 1, end);

    return root;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
