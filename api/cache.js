
module.exports = class Cache {
  constructor(max_size) {
    this.max_size = max_size;
    //first element: gets removed next
    //last element: last added element
    this.elements = [];
  }

  getElement(filters) {
    for (let i = 0; i < this.elements.length; i++) {
      // move element to back and return element
      if (_.isEqual(filters, elements[i].filters)) {
        let tmp = this.elements.splice(i, 1);
        this.elements.push(tmp);
        return tmp.results;
      }
    }
    return null;
  }

  addElement(element) {
    if (this.elements.length >= this.max_size) {
        this.elements.shift();
    }
    this.elements.push(element);
  }
}


