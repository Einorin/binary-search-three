class Node{
    constructor(value,left = null,right = null){
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class Tree{
    constructor(array){
        this.root = buildTree(array);
    }
}

function buildTree(array){
    if(array.length === 0){
        return null;
    }

    let mid = Math.floor(array.length / 2);
    let root = new Node(array[mid]);

    let left = array.slice(0, mid);
    let right = array.slice(mid + 1);

    root.left = buildTree(left);
    root.right = buildTree(right);

    return root;
}

const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const tryNode = new Tree(sortedArray)
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

console.log(tryNode)
prettyPrint(tryNode.root)

