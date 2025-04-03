class NoahMap {
    contructor() {
        this.count = 0;
    }
add(newElement) {
    if(this.head == null) {
        this.head = new Node(newElement);
        this.tail = this.head;
        this.count = 1;
    }
    else{
        let newTail = new Node(newElement);
        this.tail.next = newTail;
        newTail.prev = this.tail;
        this.tail = newTail;
        this.count += 1;
    }
}
remove(s) {
    let node = this.head;
    while(node!==null) {
        if(node.value==s) {
            if(node.prev!=null) {
                node.prev.next = node.next;
            } else {
                this.head = node.next;
            }
            if(node.next!=null) {
                node.next.prev = node.prev;
            } else {
                this.tail = node.prev;
            }
        this.count -= 1;
        }
        node = node.next
    }
}
[Symbol.iterator]() {
  // store the linked-list head in a local variable
  let current = this.head;

  return {
    // next() can be a normal function or arrow function; just make sure it closes over current
    next() {
      if (!current) {
        return { done: true };
      }
      const value = current.value;
      current = current.next;
      return {
        value,
        done: false
      };
    }
  };
}
toString() {
    
    let currentNode = this.head;
    let s = '';
    while(currentNode!=null){
        s += currentNode;
        s += ', '
        currentNode = currentNode.next;
    }
    return s.slice(0, -2);
    
}
}

class Node {
  toString() {
      return this.value;
  }
  constructor(value,next,prev) {
  this.value=value;
  this.next=next || null;
  this.prev=prev || null;
  }
}

var noahMap1 = new NoahMap();
noahMap1.add("Hello");
noahMap1.add("world!");
noahMap1.add("Blah")
noahMap1.add("Blah")
noahMap1.add("Blah")
noahMap1.remove("Blah")
console.log(noahMap1+'');
noahMap1.add(" omg ")
noahMap1.add(" it ")
noahMap1.add(" works ")
for(let i of noahMap1) {
console.log(i)
}
console.log(noahMap1.count)