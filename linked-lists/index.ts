class ListNode<T> {
  next: ListNode<T> | null = null;
  constructor(public val: T) {}
}
//TODO :

/* 

a -> b -> c -> d -> e -> null
^                   ^
|                   |
head               tail

*/

class LinkedList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;
  length: number = 0;
  constructor() {}

  push(value: T) {
    const newNode = new ListNode(value);
    this.length += 1;

    if (this.tail === null) {
      this.tail = newNode;
      this.head = this.tail;
      return this;
    }

    if (this.tail !== null) {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    return this;
  }

  pop() {
    if (this.length === 0) {
      return null;
    }
    let current = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
      this.length = 0;
      return current?.val;
    }
    while (current && current.next !== this.tail) {
      current = current.next;
    }
    //ora current sta uno indietro rispetto a tail
    current!.next = null;
    let lastnode = this.tail;
    this.tail = current;
    this.length = this.length - 1;
    return lastnode?.val;
  }

  shift() {
    if (this.length === 0) {
      return null;
    }
    if (this.length === 1) {
      let current = this.head;
      this.head = null;
      this.tail = null;
      this.length = 0;
      return current?.val;
    }
    let current = this.head;
    this.head = this.head!.next; // length is >1
    current!.next = null;
    this.length = this.length - 1;
    return current?.val;
  }

  unshift(value: T) {
    const newNode = new ListNode(value);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = this.head;
      this.length = this.length + 1;
      return this;
    }
    newNode.next = this.head;
    this.head = newNode;
    this.length = this.length + 1;
    return this;
  }

  /* 
0    1    2    3    4    
a -> b -> c -> d -> e -> null
^                   ^
|                   |
head               tail

*/
  get(index: number) {
    if (index >= this.length) {
      return null;
    }
    let current: number = 0;
    let node = this.head;
    while (current < index) {
      node = node!.next;
      current = current + 1;
    }
    return node;
  }

  set(index: number, value: T) {
    if (!value) return null;
    const node = this.get(index);
    if (node === null) {
      return null;
    }
    node.val = value;
    return value; //
  }
  insert(index: number, value: T) {
    if (index == this.length) {
      //va bene anche per il caso i=0 perche ho lunghezza 0
      this.push(value);
      return this;
    }

    if (index > this.length || index < 0) {
      throw new Error("out of range");
    }

    const prevnode = this.get(index - 1);
    const newnode = new ListNode(value);
    newnode.next = prevnode!.next;
    prevnode!.next = newnode;
    this.length = this.length + 1;
    return this;
  }

  remove(index: number) {
    if (index == 0) {
      return this.shift();
    }
    if (index == this.length - 1) {
      return this.pop();
    }

    if (index >= this.length - 1 || index < 0) {
      return null; // ho gia valutato per length-1
    }
    const prevNode = this.get(index - 1);
    const nodetoremove = prevNode!.next;
    const nextNode = nodetoremove!.next;
    prevNode!.next = nextNode;
    nodetoremove!.next = null;
    this.length = this.length - 1;
    return nodetoremove;
  }

  reverse() {
    let previous = null;
    let current = this.head;
    let temp = null;
    if (this.length <= 1) {
      return;
    }
    while (current) {
      temp = current.next;
      current.next = previous;
      previous = current;
      current = temp;
    }
    //scambia head con tail
    temp = this.head;
    this.head = this.tail;
    this.tail = temp;
    return this;
  }

  toArray() {
    if (this.length == 0) {
      return [];
    }
    let i = 0,
      res = [];
    while (i < this.length) {
      res.push(this.get(i)?.val);
      i++;
    }
    return res;
  }
}

//todo domani: scrivere tutti i test per queste tre funzioni e aggiungere le ultime

const linkedList = new LinkedList<string>();
const list = linkedList.push("a").push("b").push("c").toArray();
// console.log(linkedList.get(0))
// console.log(linkedList.get(1))
// console.log(linkedList.get(2))
// console.log(linkedList.pop())
// console.log(linkedList.pop())
// console.log(linkedList.pop())
// console.log(linkedList.pop())
// console.log(linkedList.shift())
// console.log(linkedList.shift())
// console.log(linkedList.shift())
// console.log(linkedList.shift())
// console.log(linkedList.shift())
// linkedList.unshift("-b");
// linkedList.unshift("-c");
// linkedList.unshift("-d");
// linkedList.reverse();
// console.log(linkedList.toArray());
// linkedList.reverse();
// linkedList.remove(100);
// linkedList.remove(-5);
// linkedList.remove(0);
// linkedList.remove(0);
// linkedList.remove(0);
// linkedList.set(2,'cipotle')
// console.log(linkedList.toArray());
