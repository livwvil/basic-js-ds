const { NotImplementedError } = require("../extensions/index.js");
const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

 module.exports = class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data, node = this.treeRoot) {
    if (this.treeRoot === null) {
      this.treeRoot = new Node(data);
    } else {
      if (data < node.data) {
        if (node.left === null) {
          node.left = new Node(data);
        } else {
          this.add(data, node.left);
        }
      } else {
        if (node.right === null) {
          node.right = new Node(data);
        } else {
          this.add(data, node.right);
        }
      }
    }
  }

  has(data, node = this.treeRoot) {
    if (node === null) {
      return false;
    }

    if (data === node.data) {
      return true;
    } else if (data < node.data) {
      return node.left ? this.has(data, node.left) : false;
    } else {
      return node.right ? this.has(data, node.right) : false;
    }
  }

  find(data, node = this.treeRoot) {
    if (node === null) {
      return null;
    }

    if (node.data === data) {
      return node;
    }

    if (data < node.data) {
      return node.left ? this.find(data, node.left) : null;
    } else {
      return node.right ? this.find(data, node.right) : null;
    }
  }

  remove(data) {
    const getParent = (node, parent = this.treeRoot) => {
      if (parent === null) {
        return null;
      }

      if (parent.left === node || parent.right === node) {
        return parent;
      }

      return getParent(node, parent.left) || getParent(node, parent.right);
    };

    const node = this.find(data);
    const parent = getParent(node);

    if (node.left === null && node.right === null) {
      if (node !== this.treeRoot) {
        if (node.data < parent.data) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      } else {
        this.treeRoot = null;
      }
    } else if (node.left != null && node.right != null) {
      const inorderSuccessor = this.find(this.min(node.right))
      this.remove(inorderSuccessor.data)
      node.data = inorderSuccessor.data
    } else {
      const onlyChildNode = node.left ? node.left : node.right;
      if (parent) {
        if (node.data < parent.data) {
          parent.left = onlyChildNode;
        } else {
          parent.right = onlyChildNode;
        }
      } else {
        this.treeRoot = onlyChildNode
      }
    }
  }

  min(node = this.treeRoot) {
    return node === null ? null : node.left ? this.min(node.left) : node.data;
  }

  max(node = this.treeRoot) {
    return node === null ? null : node.right ? this.max(node.right) : node.data;
  }
}