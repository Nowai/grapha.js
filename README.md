# Grapha.js 
### A tiny ES6 Graph library

## Installing

You can install this library by either importing the library locally or using `npm`.

To install it locally include the minified ES5 file `lib/grapha.min.js` or the ES6 file `lib/grapha.js`.

To install it using npm, run the following command:

`npm install grapha`

To use it in your code:

```javascript
var Graph = require('grapha'); // ES5
import {Graph} from 'grapha'; // ES6 
```

## Examples

## API

* [Creating a Graph instance](#constructor)
* [Adding and Removing Nodes](#add-remove-nodes)
* [Adding and Removing Edges](#add-remove-edges)
* [Serialization](#serialization)
* [Search](#search)

### Creating a Graph instance

<a name="constructor" href="#constructor">#</a> **Graph**([*config*])

Returns a new instance of a Graph. If no configuration object is provided, the graph will be `directed` and the Edges will be `unweighted`. 

```javascript
const config = {
    'isWeighted': false,
    'isDirected': true
}
let graph = new Graph(config);
```

### Adding and Removing Nodes

<a name="add-nodes" href="#add-nodes">#</a> *graph*.**addNode**(*node*)

Adds a node to the graph. Does nothing if the node is already in the graph. 

<a name="remove-nodes" href="#remove-nodes">#</a> *graph*.**removeNode**(*node*)

Removes a node from the graph. All edges referencing the node will be removed. Does nothing if the node is not in the graph.

### Adding and Removing Edges 

<a name="add-edges" href="#add-edges">#</a> *graph*.**addEdge**(*u*, *v* ,[*weight*])

Adds an edge from node `u` to `v` with an optional `weight` to the graph. If either `u` or `v` are not in the graph, an `Error` will be thrown. If the graph is `undirected` the edge will be between nodes `u` and `v`. 

<a name="remove-edges" href="#remove-edges">#</a> *graph*.**removeNode**(*edge*)

If an edge from `u` to `v` exist, it will be removed from the graph. If the graph is `undirected` the edge between `u` and `v` will be removed. 

### Serialization

<a name="serialization" href="#serialization">#</a> **Graph**.**serialize**(*json*)

A static function returning the graph specified by the `json` object. 

```javascript
const json = {
    "nodes": [
        {"id": "1"},
        {"id": "2"},
        {"id": "3"}
    ],
    "links": [
        {"source": "1", "target": "2"}
        {"source": "3", "target": "1"}
    ]
};
let graph = Graph.serialize(json);
```
<a name="deserialization" href="#deserialization">#</a> *graph*.**deserialize**()

Returns a `json` object representing the graph with its nodes and its edges.

### Search

<a name="dfs" href="dfs">#</a> *graph*.**DFS**(*node*)

Returns all reachable nodes from `node` in the order of depth first search with its respective discovery node. 

## License

**MIT**: Copyright 2017 Florian Marienwald