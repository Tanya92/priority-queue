class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
			node.parent = this;
		} else if (!this.right) {
			this.right = node;
			node.parent = this;
		} else {
			if (this.left.size() - this.right.size() == 2) {
				this.right.appendChild(node);
			} else {
				this.left.appendChild(node);
			}
		}
	}

	removeChild(node) {
		if (this.left == node) {
			this.left = null;
		} else if (this.right == node) {
			this.right = null;
		} else {
			if (this.left) {
				this.left.removeChild(node);
			} 
			if (this.right) {
				this.right.removeChild(node);
			}
		}
	}

	remove() {
		this.parent.removeChild(this);
	}

	swapWithParent() {
		const parent = this.parent;
		const grandParent = this.parent.parent;
		const parentLeft = this.parent.left;
		const parentRight = this.parent.right;
		const thisLeft = this.left;
		const thisRight = this.right;
		if (this == this.parent.left) {
			parent.left = thisLeft;
			parent.right = thisRight;
			this.left = parent;
			this.right = parentRight;
		} else if (this == this.parent.right) {
			parent.right = thisRight;
			parent.left = thisLeft;
			this.right = parent;
			this.left = parentLeft;
		}
		this.parent = grandParent;
		if (grandParent.left == parent) {
			grandParent.left = this;
		}
		if (grandParent.right == parent) {
			grandParent.right == this;
		}
		
	}
	size() {
		if (this.left && this.right) {
			return 1 + this.left.size() + this.right.size();
		}
		if (this.left) {
			return 1 + this.left.size();
		}
		if (this.right) {
			return 1 + this.right.size();
		}
		return 1;
	}
}

module.exports = Node;
