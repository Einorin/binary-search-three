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
    insert(value){
        if(!this.root){
            this.root = new Node(value);
            return this.root;
        }
        
        let current = this.root;
        console.log(current)
        while(current){
            if(value < current.value){

                if(!current.left){
                    current.left = new Node(value);
                    return current.left
                }
                current = current.left;
            }
            else if(value > current.value){
                if(!current.right){
                    current.right = new Node(value)
                    return current.right
                }
                current = current.right
            }else{
                return null;
            }
        }
    }
// fix delete for case 1,2, and case 3
    delete(value){
        if(!this.root){
            return null;
        }
        let current = this.root;

        while(current.value){
            if(value === current.value){
                current.value = null
                return current.value;
            }
            current.value = current.left
        }
    }
}

function buildTree(array){
    if(array.length === 0){
        return null;
    }

    const uniqueArr = Array.from(new Set(array))

    let mid = Math.floor(uniqueArr.length / 2);
    let root = new Node(uniqueArr[mid]);

    let left = uniqueArr.slice(0, mid);
    let right = uniqueArr.slice(mid + 1);

    root.left = buildTree(left);
    root.right = buildTree(right);

    return root;
}

const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const tryNode = new Tree(sortedArray)
tryNode.insert(10)

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
prettyPrint(tryNode.root)
tryNode.delete(1)
prettyPrint(tryNode.root)

