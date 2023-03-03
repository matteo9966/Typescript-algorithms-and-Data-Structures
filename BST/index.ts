export class BSTNode<T> {
  value: T;
  left: BSTNode<T> | null;
  right: BSTNode<T> | null;
  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BST<T> {
  root: BSTNode<T> | null;
  constructor() {
    this.root = null;
  }

  insert(value: T) {
    if (!value) {
      throw new Error("no value provided");
    }

    const node = new BSTNode(value);

    if (!this.root) {
      this.root = node;
      return this;
    }

    this.root = this.insertHelper(node, this.root);
    return this;
  }

  private insertHelper(
    nodeToInsert: BSTNode<T>,
    currentNode: BSTNode<T> | null
  ): BSTNode<T> {
    if (!currentNode) {
      return nodeToInsert;
    }

    if (nodeToInsert.value === currentNode.value) {
      return currentNode; // non faccio modifiche
    } else if (nodeToInsert.value < currentNode.value) {
      currentNode.left = this.insertHelper(nodeToInsert, currentNode.left);
    } else {
      currentNode.right = this.insertHelper(nodeToInsert, currentNode.right);
    }
    return currentNode;
  }

  remove(value: T) {
    if (!this.root) {
      return null;
    }
    this.root = this.removeHelper(value, this.root);
  }

  private removeHelper(
    value: T,
    current: BSTNode<T> | null
  ): BSTNode<T> | null {
    if (!current) {
      return current;
    }
    if (value === current.value) {
      //non ha figli
      if (!current.left && !current.right) {
        return null;
      }
      if (!current.left || !current.right) {
        if (!current.right) {
          return current.left;
        } else {
          return current.right;
        }
      }
      //ci sono tutti e due
      const minRight = this.findMin(current.right);
      current.value = minRight;
      current.right = this.removeHelper(minRight, current.right);
    } else if (value < current.value) {
      current.left = this.removeHelper(value, current.left);
    } else {
      current.right = this.removeHelper(value, current.right);
    }
    return current;
  }

  findMin(node: BSTNode<T>) {
    let min = node.value;
    let current = node.left;
    while (current) {
      min = current.value;
      current = current.left;
    }
    return min;
  }

  search(value: T) {}

  private inorder(node: BSTNode<T> | null, result: T[]) {
    if (!node) {
      return;
    }
    this.inorder(node.left, result);
    result.push(node.value);
    this.inorder(node.right, result);
  }

  inorderArray(startNode = this.root) {
    let result: T[] = [];
    this.inorder(startNode, result);
    return result;
  }

  private preorder(node: BSTNode<T> | null, result: T[]) {
    if (!node) return;
    result.push(node.value);
    this.preorder(node.left, result);
    this.preorder(node.right, result);
  }

  preorderArray(node = this.root) {
    let result: T[] = [];
    this.preorder(node, result);
    return result;
  }

  private postorder(node: BSTNode<T> | null, result: T[]) {
    if (!node) return;
    this.postorder(node.left, result);
    this.postorder(node.right, result);
    result.push(node.value);
  }

  postorderArray(node = this.root) {
    let result: T[] = [];
    this.postorder(node, result);
    return result;
  }

  breadthFirst() {}
}

const bst = new BST<number>();
bst.insert(5);
bst.insert(7);
bst.insert(9);
bst.insert(11);
bst.insert(3);
bst.insert(4);
bst.insert(6);
// bst.remove(5);
console.log(bst.inorderArray());
console.log(bst.preorderArray());
console.log(bst.postorderArray());

// console.log(util.inspect(bst, {showHidden: false, depth: null, colors: true}));
