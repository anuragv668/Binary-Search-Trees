import Tree, {prettyPrint} from "./bst.js";

let arr = [1,2,3,5,6,7,8];
let bst = new Tree(arr);

console.log(bst.isBalanced());

let levelOrderResult = [];
bst.levelOrder((data) => levelOrderResult.push(data));
console.log("Level-Order:", levelOrderResult.join(" "));

let inOrderResult = [];
bst.inOrder((data) => inOrderResult.push(data));
console.log("In-Order:", inOrderResult.join(" "));

let preOrderResult = [];
bst.preOrder((data) => preOrderResult.push(data));
console.log("Pre-Order:", preOrderResult.join(" "));

let postOrderResult = [];
bst.postOrder((data) => postOrderResult.push(data));
console.log("Post-Order:", postOrderResult.join(" "));

bst.insert(9);
bst.insert(10);
bst.insert(11);
bst.insert(14);

console.log(bst.isBalanced());
bst.reBalance();
console.log(bst.isBalanced());


let levelOrderResult2 = [];
bst.levelOrder((data) => levelOrderResult2.push(data));
console.log("Level-Order:", levelOrderResult2.join(" "));

let inOrderResult2 = [];
bst.inOrder((data) => inOrderResult2.push(data));
console.log("In-Order:", inOrderResult2.join(" "));

let preOrderResult2 = [];
bst.preOrder((data) => preOrderResult2.push(data));
console.log("Pre-Order:", preOrderResult2.join(" "));

let postOrderResult2 = [];
bst.postOrder((data) => postOrderResult2.push(data));
console.log("Post-Order:", postOrderResult2.join(" "));
