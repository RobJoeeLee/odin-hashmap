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
      hashCode = (hashCode * primeNumber + key.charCodeAt[i]) % this.capacity;
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
