import chai from 'chai';
import {Graph} from '../lib/grapha.js';

chai.expect();

const expect = chai.expect;

let lib = [];
const json = {
  "nodes": [
    {"id": 'A'},
    {"id": 'B'},
    {"id": 'C'},
    {"id": 'D'},
    {"id": 'E'},
    {"id": 'F'}
  ],
  "links": [
    {"source": 'A', "target": 'B'},
    {"source": 'B', "target": 'C'},
    {"source": 'C', "target": 'D'},
    {"source": 'D', "target": 'E'},
    {"source": 'E', "target": 'F'},
    {"source": 'A', "target": 'F'},
  ]
};
const dfsJson = {
    "nodes": [
        {"id": 1},
        {"id": 2},
        {"id": 3},
        {"id": 4},
        {"id": 5},
        {"id": 6},
        {"id": 7},
        {"id": 8},
        {"id": 9},
        {"id": 10},
        {"id": 11},
        {"id": 12},
    ],
    "links": [
        {"source": 1, "target": 2 },
        {"source": 1, "target": 7 },
        {"source": 1, "target": 8 },
        {"source": 2, "target": 6 },
        {"source": 2, "target": 3 },
        {"source": 3, "target": 5 },
        {"source": 3, "target": 4 },
        {"source": 8, "target": 12 },
        {"source": 8, "target": 9 },
        {"source": 9, "target": 10 },
        {"source": 9, "target": 11 },
    ]
};
describe('graphy.js - ES6 Graph library - tests:', () => {
  before(() => {
    lib[0] = new Graph({isDirected: false, isWeighted: false});
    lib[1] = new Graph({isDirected: true, isWeighted: false});
    lib[2] = new Graph({isDirected: false, isWeighted: true});
    lib[3] = new Graph({isDirected: true, isWeighted: true});
    lib[4] = new Graph();
  });
  describe('Instantiation', () => {
    it('should create a new graph with edgeSize and nodeSize zero and should contain no node and no edge', () => {
      lib.forEach( l => {
        expect(l.nodeSize).to.be.equal(0);
        expect(l.edgeSize).to.be.equal(0);
        expect(Object.keys(l.nodes).length).to.be.equal(0);
      });
    });
  });
  describe('addNode', () => {
    it('should have nodeSize 1 after one addNode call', () => {
      lib.forEach(l => {
        expect(l).to.exist;
        l.addNode('A');
        expect(l.nodeSize).to.be.equal(1);
        expect(Object.keys(l.nodes).length).to.be.equal(1);
      });
    });
    it('should have nodeSize 4 after three more calls', () => {
      lib.forEach(l => {
        l.addNode('B');
        l.addNode('C');
        l.addNode('D');
        expect(l.nodeSize).to.be.equal(4);
        expect(Object.keys(l.nodes).length).to.be.equal(4);
      });
    }),
    it('should have nodeSize 4 after inserting an already existing node', () => {
      lib.forEach(l => {
        l.addNode('D');
        expect(l.nodeSize).to.be.equal(4);
        expect(Object.keys(l.nodes).length).to.be.equal(4);
      });
    });
  });
  describe('hasNode', () => {
    let graph = new Graph();
    graph.addNode('A');
    graph.addNode('B');
    it('should only return true if the given node exists in the graph', () => {
      expect(graph.hasNode('A')).to.equal(true);
      expect(graph.hasNode('B')).to.equal(true);
      expect(graph.hasNode('C')).to.equal(false);
    });
  });
  describe('addEdge', () => {
    it('should throw error if either of the nodes don\'t exist', () => {
      lib.forEach(l => {
        expect(() => l.addEdge('A', 'E') ).to.throw();
        expect(() => l.addEdge('test', 'A') ).to.throw();
        expect(() => l.addEdge('bar', 'foo') ).to.throw();
      });
    });
    it('should add an Edge if both nodes exist', () => {
      lib.forEach(l => {
        if(l.isWeighted)
          l.addEdge('A', 'B', 5);
        else
          l.addEdge('A', 'B');
      });
    });
    it('should only add out to A and in to B with directed graphs', () => {
      // for all directed graphs, node.out should only be set by A
      lib
        .filter(l => l.isDirected)
        .forEach(l => {
          Object.keys(l.nodes)
            .filter(n => n !== 'A')
            .map(n => l.nodes[n])
            .forEach(n => {
              expect(Object.keys(n.out).length).to.equal(0);
          });
          expect(Object.keys(l.nodes['A'].out).length).to.equal(1);
      });
      // and node.in should only be set by B
      lib
        .filter(l => l.isDirected)
        .forEach(l => {
          Object.keys(l.nodes)
            .filter(n => n !== 'B')
            .map(n => l.nodes[n])
            .forEach(n => {
              expect(Object.keys(n.in).length).to.equal(0);
          });
          expect(Object.keys(l.nodes['B'].in).length).to.equal(1);
      });
    });
    it('should add out and in to A and B with undirected graphs', () => {
      lib
        .filter(l => !l.isDirected)
        .forEach(l => {
          Object.keys(l.nodes)
            .filter(n => n === 'A' || n === 'B')
            .map(n => l.nodes[n])
            .forEach(n => {
              expect(Object.keys(n.in).length).to.equal(1);
              expect(Object.keys(n.out).length).to.equal(1);
            })
        });
      lib
        .filter(l => !l.isDirected)
        .forEach(l => {
          Object.keys(l.nodes)
            .filter(n => n !== 'A' && n !== 'B')
            .map(n => l.nodes[n])
            .forEach(n => {
              expect(Object.keys(n.in).length).to.equal(0);
              expect(Object.keys(n.out).length).to.equal(0);
            });
        });
    });
  });
  describe('hasEdge', () => {
    it('should return the edge weight with weighted graphs', () =>{
      lib
        .filter(l => l.isWeighted)
        .forEach(l => {
          expect(l.getWeight('A','B')).to.equal(5);
        });
    });
    it('should return true if the edge exists with unweighted graphs', () => {
      lib
        .filter(l => !l.isWeighted)
        .forEach(l => {
          expect(l.hasEdge('A','B')).to.equal(true);
        });
    });
    it('should return false for every call to hasEdge if the edge doesn\'t exist', () => {
      lib
        .forEach(l => {
          Object.keys(l.nodes).forEach(u => {
            Object.keys(l.nodes).forEach(v => {
              if(!((u === 'A' && v === 'B') || (u === 'B' && v === 'A'))) {
                expect(l.hasEdge(u,v)).to.equal(false);
              }
            });
          })
        })
    });
    it('should return false for non existing nodes', () => {
      lib.forEach(l => {
        expect(l.hasEdge('A', 'foo')).to.equal(false);
        expect(l.hasEdge('bar', 'foo')).to.equal(false);
        expect(l.hasEdge('1234', 'A')).to.equal(false);
      })
    })
  });
  describe('removeEdge', () => {
    it('should remove only the specified edge', () => {
      lib.forEach(l => {
        l.addEdge('B', 'C');
        l.addEdge('C', 'A');
        l.addEdge('A', 'D');
        expect(l.hasEdge('B', 'C')).to.equal(true);
        expect(l.hasEdge('C', 'A')).to.equal(true);
        expect(l.hasEdge('A', 'D')).to.equal(true);
        l.removeEdge('C', 'A');
        expect(l.hasEdge('B', 'C')).to.equal(true);
        expect(l.hasEdge('C', 'A')).to.equal(false);
        expect(l.hasEdge('A', 'D')).to.equal(true);
        l.removeEdge('B', 'C');
        expect(l.hasEdge('B', 'C')).to.equal(false);
        expect(l.hasEdge('C', 'A')).to.equal(false);
        expect(l.hasEdge('A', 'D')).to.equal(true);
      });
    });
  });
  describe('removeNode', () => {

  });
  describe('serialize', () => {
    it('should properly instatiate graph based on json structure', () => {
      let g = Graph.serialize(json);
      expect(g.isDirected).to.equal(true);
      expect(g.isWeighted).to.equal(false);
      // check all nodes
      expect(g.hasNode('A')).to.equal(true); 
      expect(g.hasNode('B')).to.equal(true); 
      expect(g.hasNode('C')).to.equal(true); 
      expect(g.hasNode('D')).to.equal(true); 
      expect(g.hasNode('E')).to.equal(true); 
      expect(g.hasNode('F')).to.equal(true); 
      // check all edges
      expect(g.hasEdge('A','B')).to.equal(true);
      expect(g.hasEdge('B','C')).to.equal(true);
      expect(g.hasEdge('C','D')).to.equal(true);
      expect(g.hasEdge('D','E')).to.equal(true);
      expect(g.hasEdge('E','F')).to.equal(true);
      expect(g.hasEdge('A','F')).to.equal(true);
      // check not exististing stuff
      expect(g.hasNode('foo')).to.equal(false); 
      expect(g.hasNode('bar')).to.equal(false); 
      expect(g.hasNode('1234')).to.equal(false); 
      expect(g.hasNode('a')).to.equal(false); 
      expect(g.hasEdge('foo','B')).to.equal(false);
      expect(g.hasEdge('A','1234')).to.equal(false);
      expect(g.hasEdge('F','E')).to.equal(false);
      expect(g.hasEdge('D','A')).to.equal(false);
    });
  });
  describe('deserialize', () => {
      let g = Graph.serialize(json);
      const jsonDeserialized = g.deserialize();
      let gDeserialized = Graph.serialize(jsonDeserialized);
      // check if all is the same
      expect(gDeserialized.isDirected).to.equal(true);
      expect(gDeserialized.isWeighted).to.equal(false);
      // check all nodes
      expect(gDeserialized.hasNode('A')).to.equal(true); 
      expect(gDeserialized.hasNode('B')).to.equal(true); 
      expect(gDeserialized.hasNode('C')).to.equal(true); 
      expect(gDeserialized.hasNode('D')).to.equal(true); 
      expect(gDeserialized.hasNode('E')).to.equal(true); 
      expect(gDeserialized.hasNode('F')).to.equal(true); 
      // check all edges
      expect(gDeserialized.hasEdge('A','B')).to.equal(true);
      expect(gDeserialized.hasEdge('B','C')).to.equal(true);
      expect(gDeserialized.hasEdge('C','D')).to.equal(true);
      expect(gDeserialized.hasEdge('D','E')).to.equal(true);
      expect(gDeserialized.hasEdge('E','F')).to.equal(true);
      expect(gDeserialized.hasEdge('A','F')).to.equal(true);
      // check not exististing stuff
      expect(gDeserialized.hasNode('foo')).to.equal(false); 
      expect(gDeserialized.hasNode('bar')).to.equal(false); 
      expect(gDeserialized.hasNode('1234')).to.equal(false); 
      expect(gDeserialized.hasNode('a')).to.equal(false); 
      expect(gDeserialized.hasEdge('foo','B')).to.equal(false);
      expect(gDeserialized.hasEdge('A','1234')).to.equal(false);
      expect(gDeserialized.hasEdge('F','E')).to.equal(false);
      expect(gDeserialized.hasEdge('D','A')).to.equal(false);
  });
  describe('DFS', () => {
    it('should discover nodes in the right order', () => {
      let g = Graph.serialize(dfsJson);
      const dfs = g.DFS('1');
      let c = 2;
      Object.keys(dfs).forEach(n => {
        expect(n).to.equal(c.toString());
        c++;
      });
    });
  });
});
