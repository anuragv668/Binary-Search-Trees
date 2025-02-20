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

  find(value, root = this.root ) {
    if (!root) {
      return null;
    } 
    if (root.data == value) {
      return root;
    }
    if (root.data > value) {
      return this.find(value, root.leftNode);
    } 
    if (root.data < value) {
      return this.find(value, root.rightNode);
    }
  }

  levelOrder(callback) {
    let arr = [this.root];
    while(arr[0]) {
      callback(arr[0].data)
      if (arr[0].leftNode) {
        arr.push(arr[0].leftNode);
      }
      if (arr[0].rightNode) {
        arr.push(arr[0].rightNode);
      }
      arr.shift()
    }
  }

  inOrder(callback, root = this.root) {
    if (root === null) {
      return 
    } 
    this.inOrder(callback, root.leftNode);
    callback(root.data);
    this.inOrder(callback, root.rightNode);
  }

  preOrder(callback, root = this.root) {
    if (root === null) {
      return 
    }
    callback(root.data);
    this.preOrder(callback, root.leftNode);
    this.preOrder(callback, root.rightNode);
  }

  postOrder(callback, root = this.root) {
    if (root === null) {
      return 
    } 
    this.postOrder(callback, root.leftNode);
    this.postOrder(callback, root.rightNode);
    callback(root.data);
  }
  height(node = this.root) {
    if (!node) {
        return -1; // Convention: height of an empty node is -1
    }

    let leftHeight = this.height(node.leftNode);
    let rightHeight = this.height(node.rightNode);

    return 1 + Math.max(leftHeight, rightHeight);
  }
  
  depth(node, root = this.root, level = 0) {
    if (!root) {
      return -1; 
    }
    if (root === node) {
      return level; 
    }

    let leftDepth = this.depth(node, root.leftNode, level + 1);
    let rightDepth = this.depth(node, root.rightNode, level + 1);

    return Math.max(leftDepth, rightDepth); 
  }

  
  isBalanced(root = this.root) {
    let temp = this.height(root.leftNode) - this.height(root.rightNode);
    if (temp == 0 || temp == 1 || temp == -1) {
      return true;
    }
    return false;
  }

  reBalance() {
  let arr = [];
  this.inOrder((value) => arr.push(value));
  this.root = this.buildTree(arr);
  }

//
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
