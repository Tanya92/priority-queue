const Node = require('./node');

class MaxHeap {
	constructor() {
        this.root = null;
        this.parentNodes = [];
	}

	push(data, priority) {
        const node = new Node(data, priority);
        this.insertNode(node);
        this.shiftNodeUp(node);
	}

	pop() {
        const data = this.root.data;
        this.restoreRootFromLastInsertedNode(
            this.detachRoot()
        );
        return data;
	}

	detachRoot() {
		return this.root;
	}

	restoreRootFromLastInsertedNode(detached) {
        const lastNode = this.lastInsertedNode;
		if (lastNode == lastNode.parent.left) {
            lastNode.parent.left = null;
        } 
        if (lastNode == lastNode.parent.right) {
            lastNode.parent.right = null;
        }
        this.root = lastNode;
        this.root.left = detached.left;
        this.root.right = detached.right;
        this.shiftNodeDown(this.root);
	}

	size() {
        if (!this.root) {
            return 0;
        }
		return this.root.size();
	}

	isEmpty() {
		return !this.root;
	}

	clear() {
		this.root = null;
	}

	insertNode(node) {
        if (!this.root) {
            this.root = node;
        } else {
            this.root.appendChild(node);
            
        }
        this.lastInsertedNode = node;
	}

	shiftNodeUp(node) {
        if (node.parent){
            if (node.priority > node.parent.priority) {
                node.swapWithParent(); 
                this.shiftNodeUp(node);
            }
           
        }
	}

	shiftNodeDown(node) {
		if (node.left){
            if (node.priority < node.left.priority) {
                node.left.swapWithParent();
            }
        }
        if (node.right){
            if (node.priority < node.right.priority) {
                node.right.swapWithParent();
            }
        }   
    }
    
}

module.exports = MaxHeap;
