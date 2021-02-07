# Firestore Composite Index Generator
### In progress, do not use now.


<!-- ABOUT THE PROJECT -->
## About The Project

Firestore requires the use of composite index to apply a combination of sorts and filters. While creating apps, this could mean creating a composite index of every possible combination of sorts and filters available.

For example, if you have a table showing different cars at a warehouse. The schema would be something like:

```
Cars (collection) {
    Car-ASKDN234MD (document) {
        Name: String,
        Color: String,
        Delivery: Timestamp,
        Location: String
    }
}
```

If you want to get all cars of red colors being delivered to a specific location, you would need a composite index for the query. Now, if you want to sort it by delivery time (ascending), you need to build another composite query, and yet another query if you want to sort it descending instead.

This utility automatically creates composite queries on the basis of what you want to sort and/or filter by, and adds them to your firestore.indexes.json.
