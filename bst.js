export class Node {
  constructor(data = null, leftNode = null, rightNode = null) {
    this.data = data;
    this.leftNode = leftNode;
    this.rightNode = rightNode;
  }
}

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree = (array) => {
    let arr = this.removeDuplicates(array.sort((a, b) => a - b));
    return this.buildTreeRecur(arr, 0, arr.length - 1);
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

    root.leftNode = this.buildTreeRecur(array, start, mid -1);

    root.rightNode = this.buildTreeRecur(array, mid + 1, end);

    return root;
  }

  insert(value, root = this.root) {
    if (root == null) {
      return new Node(value);
    }
    if (root.data === value) {
      return root;
    } 
    if (root.data > value) {
        root.leftNode = this.insert(value, root.leftNode);
    } else if (root.data < value) {
        root.rightNode = this.insert(value, root.rightNode);
    }
    return root;
  }
  getSuccessor() {
    let curr = this.root.rightNode;
    while (curr !== null && curr.leftNode !== null) {
        curr = curr.leftNode;
    }
    return curr;
  }  
  delete(value, root = this.root) {
    if (root == null) {
      return root;
    }

    if (root.data > value) {
      root.leftNode = this.delete(value, root.leftNode);
    } else if (root.data < value) {
      root.rightNode = this.delete(value, root.rightNode);
    } else {
      if (root.leftNode === null) {
        return root.rightNode;
      } 

      if (root.rightNode === null) {
        return root.leftNode;
      }

      let succ = this.getSuccessor();
      root.data = succ.data;
      root.rightNode = this.delete(succ.data, root.rightNode);
    }

    return root;
  }
}

export const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightNode !== null) {
    prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.leftNode !== null) {
    prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
