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
    delete(value){
        this.root = this._deleteCall(this.root,value)
    }
    _deleteCall(current,value){
        if(!current){
            return null;
        }

        if(value === current.value){
            if(!current.left){
                return current.right
            }
            if(!current.right){
                return current.left
            }

            const successor = this._findMin(current.right)
            current.value = successor.value;
            current.right = this._deleteCall(current.right,successor.value)

        }else if(value< current.value){
            current.left = this._deleteCall(current.left,value)
        }else{
            current.right = this._deleteCall(current.right,value)
        }
        return current
    }
    _findMin(node){
        while(node.left){
            node = node.left
        }
        return node;
    }
    find(value){
        if(!this.root){
            return null;
        }
        let current = this.root
        while(current){
            if(value === current.value){
                return current.value
            }else if(value < current.value){
                current = current.left
            }else{
                current = current.right
            }
        }
        return null;
    }
    levelOrder(callback){
        if(!this.root){
            return [];
        }
        let tempArr = [this.root];
        let levelOrdered = [this.root];
        
        while(tempArr.length > 0){
            const current = tempArr.shift();
            if(!callback){
                levelOrdered.push(current.value)
            }else{
                callback(current.value);
            }
    
            if(current.left){
                tempArr.push(current.left);
                levelOrdered.push(current.left);
            }
            if(current.right){
                levelOrdered.push(current.right);
                tempArr.push(current.right);
            }
        }
        
        if(!callback){
            return levelOrdered;
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

const sortedArray = [1, 2, 3, 4, 5, 6, 7,9,10]
const tryNode = new Tree(sortedArray)
tryNode.insert(8)

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
tryNode.delete(9)
prettyPrint(tryNode.root)
console.log("Find method: ",tryNode.find(10))

// use levelOrder with function
tryNode.levelOrder(value=>{
    console.log("levelOrder", value)
})
// use levelOrder without function // there's a problem when I don't provide a function
const levelOrderedValues = tryNode.levelOrder();
console.log(levelOrderedValues);
