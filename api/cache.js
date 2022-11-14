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
      if (compareFilters(filters, this.elements[i].filters)) {
        let tmp = this.elements[i];
        this.elements.splice(i, 1);
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
};

const compareFilters = (filterA, filterB) => {
  for (let key in filterA) {
    if (key === "destination") {
      continue;
    } else if (key === "timeFrom" || key === "timeTo") {
      if (
        new Date(filterA[key]).getTime() !== new Date(filterB[key]).getTime()
      ) {
        return false;
      }
    } else if (!filterB.hasOwnProperty(key) || filterB[key] !== filterA[key]) {
      return false;
    }
  }
  return true;
};
