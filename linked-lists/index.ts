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
      return current;
    }
    while (current && current.next !== this.tail) {
      current = current.next;
    }
    //ora current sta uno indietro rispetto a tail
    current!.next = null;
    let lastnode = this.tail;
    this.tail = current;
    this.length = this.length - 1;
    return lastnode;
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
      return current;
    }
    let current = this.head;
    this.head = this.head!.next; // length is >1
    current!.next = null;
    this.length = this.length - 1;
    return current;
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
}

//todo domani: scrivere tutti i test per queste tre funzioni e aggiungere le ultime