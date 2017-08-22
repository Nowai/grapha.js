export default class Graph {
  constructor(config) {
    this._config = config || {}; 
    let defaultConf = {
      isWeighted: false,
      isDirected: true 
    };
    Object.keys(defaultConf).forEach(k => { this._config[k] = this._config[k] || defaultConf[k] });
    this._nodes = {};
    this._nodeSize = 0;
    this._edgeSize = 0;
  }

  // Creates and returns a new graph given the json object
  static serialize(json) {
    let graph = new Graph();
    json['nodes'].forEach(n => {
      graph.addNode(n.id);
    });
    json['links'].forEach(l => {
      graph.addEdge(l.source, l.target);
    });
    return graph;
  }

  deserialize() {
    let json = {};
    json.nodes = [];
    json.links = [];
    Object.keys(this._nodes).forEach(n => {
      Object.keys(this._nodes[n].out).forEach(l => {
        json.links.push({"source": n,"target":l});
      });
      json.nodes.push({"id": n});
    });
    return json;
  }

  // Adds a node to the Graph if it is not already in it
  addNode(node) {
    if(!(node in this._nodes))
      this._nodeSize++;
    this._nodes[node] = this.nodeOrEmpty(node);
  }

  // Removes the node from the graph if it exists
  // Will also remove all edges connected to the node
  removeNode(node) {
    if(!(node in this._nodes)) 
      return;
    Object.keys(this._nodes[node].in)
      .forEach(u => {
        this.removeEdge(u, node);
    });
    Object.keys(this._nodes[node].out)
      .forEach(v => {
        this.removeEdge(node, v);
    });
  }

  hasNode(node) {
    if(node in this._nodes)
      return true;
    return false;
  }

  // Adds an edge between node u and v
  // If the graph is directed, then the edge will go from node u to node v
  // If the graph is undirected, the edge will both go from u and v to v and u
  // If the graph is weighted, the weight of the edge will be updated if the edge already exists
  // Throws error if either u or v is not a node
  addEdge(u, v, weight = 1) {
    if(!(u in this._nodes && v in this._nodes))
      throw new Error("Can't add edge when one or more nodes don't exist");
    if(!this._config.isWeighted)
      weight = 1;
    if(!this.hasEdge(u,v))
      this._edgeSize++;
    if(this.isDirected) {
      this._nodes[u].out[v] = weight;
      this._nodes[v].in[u] = weight;
    } else {
      this._nodes[u].out[v] = weight;
      this._nodes[v].in[u] = weight;
      this._nodes[v].out[u] = weight;
      this._nodes[u].in[v] = weight;
    }
  }

  // Returns whether or not an edge exists between node u and v
  hasEdge(u, v) {
    if(!(u in this._nodes && v in this._nodes))
      return false;
    if(v in this._nodes[u].out && u in this._nodes[v].in)
      return true;
    return false;
  }

  // Returns the weight of the edge between node u and v if it exists
  // and false if it doesn't exist
  getWeight(u, v) {
    if(this.hasEdge(u, v)) {
      return this._nodes[u].out[v];
    }
    return false;
  }

  // Removes an edge if it exists
  removeEdge(u, v) {
    if(this.hasEdge(u, v)) {
      if(this.isDirected) {
        delete this._nodes[u].out[v];
        delete this._nodes[v].in[u];
      }
      else {
        delete this._nodes[u].out[v];
        delete this._nodes[v].in[u];
        delete this._nodes[v].out[u];
        delete this._nodes[u].in[v];
      }
      return true;
    }
    return false;
  }

  // Depth first search
  // Returns a list of reachable nodes and the discovery node
  DFS(u) {
    if(!this.hasNode(u)) 
      return {};
    let discovery = {};
    let visited = {};
    let dfs = (o, v) => {
      if(!(this.hasNode(v)))
        return;
      if(v in visited)
        return;
      visited[v] = true;
      discovery[v] = o;
      Object.keys(this._nodes[v].out).forEach(e => {
          dfs(v, e);
      });
    };
    Object.keys(this._nodes[u].out).forEach(e => {
      dfs(u, e);
    });
    return discovery;
  }

  // returns the node object if it exists or a new one
  nodeOrEmpty(node) {
    return (node in this._nodes) ? this._nodes[node] : {in: {}, out: {}};
  }

  // returns a count of nodes in the graph
  get nodeSize() {
    return this._nodeSize;
  }

  // returns a count of edges
  // If the graph is undirected each edge will only be counted once
  get edgeSize() {
    return this._edgeSize;
  }

  // returns an object containing all nodes in the graph
  get nodes() {
    return this._nodes;
  }

  // returns whether the graph is directed or not
  get isDirected() {
    return this._config.isDirected;
  }

  // returns whether the edges are weighted or not
  get isWeighted() {
    return this._config.isWeighted;
  }
}
