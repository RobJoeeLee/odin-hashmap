class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode * primeNumber + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [storedKey, _] = bucket[i];
      if (storedKey === key) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
    }
  }

  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  get(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [storedKey, storedValue] = bucket[i];
      if (storedKey === key) {
        return storedValue;
      }
    }

    return null;
  }

  has(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [storedKey, _] = bucket[i];
      if (storedKey === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [storedKey, _] = bucket[i];
      if (storedKey === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }

  keys() {
    const keysArray = [];

    for (const bucket of this.buckets) {
      for (const [key, _] of bucket) {
        keysArray.push(key);
      }
    }

    return keysArray;
  }

  values() {
    const valuesArray = [];

    for (const bucket of this.buckets) {
      for (const [_, value] of bucket) {
        valuesArray.push(value);
      }
    }

    return valuesArray;
  }

  entries() {
    const entriesArray = [];

    for (const bucket of this.buckets) {
      for (const pair of bucket) {
        entriesArray.push(pair);
      }
    }

    return entriesArray;
  }
}

const map = new HashMap();

// Set values
map.set("apple", "red");
map.set("banana", "yellow");
map.set("grape", "purple");
map.set("lemon", "yellow");

// Get values
console.log(map.get("apple")); // "red"
console.log(map.get("banana")); // "yellow"
console.log(map.get("grape")); // "purple"
console.log(map.get("lemon")); // "yellow"
console.log(map.get("pear")); // null (not found)

// Check existence
console.log(map.has("apple")); // true
console.log(map.has("pear")); // false

// Remove
console.log(map.remove("banana")); // true
console.log(map.get("banana")); // null
console.log(map.length()); // 3

// Keys, values, entries
console.log(map.keys()); // ['apple', 'grape', 'lemon']
console.log(map.values()); // ['red', 'purple', 'yellow']
console.log(map.entries()); // [['apple','red'], ['grape','purple'], ['lemon','yellow']]

// Resize test
for (let i = 0; i < 20; i++) {
  map.set("key" + i, "value" + i);
}
console.log(map.capacity); // Should be doubled at least once (e.g. 32 or 64)
console.log(map.length()); // Should match number of items
console.log(map.get("key5")); // Should return "value5"

// Clear
map.clear();
console.log(map.length()); // 0
console.log(map.get("apple")); // null
