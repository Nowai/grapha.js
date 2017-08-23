module.exports = {
    json: {
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
    },
    dfsJson : {
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
    }
}
