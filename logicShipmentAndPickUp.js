function areTripsLegit(pickUps, dropPoints, trips) {
    var graph = new Map();
    var dropSet = new Set(dropPoints);
    // Build the graph
    for (var _i = 0, trips_1 = trips; _i < trips_1.length; _i++) {
        var trip = trips_1[_i];
        if (!graph.has(trip.from)) {
            graph.set(trip.from, []);
        }
        graph.get(trip.from).push(trip.to);
    }
    // Function to perform DFS to check if a node can reach any drop point
    var canReachDrop = function (start, visited) {
        if (visited === void 0) { visited = {}; }
        if (dropSet.has(start))
            return true;
        visited[start] = true;
        if (!graph.has(start))
            return false;
        for (var _i = 0, _a = graph.get(start); _i < _a.length; _i++) {
            var neighbor = _a[_i];
            if (!visited[neighbor] && canReachDrop(neighbor, visited)) {
                return true;
            }
        }
        return false;
    };
    // Check if all pick-up points can reach any drop point
    for (var _a = 0, pickUps_1 = pickUps; _a < pickUps_1.length; _a++) {
        var pickUp = pickUps_1[_a];
        if (!canReachDrop(pickUp)) {
            return false;
        }
    }
    return true;
}
// Example usage
var pickUps = ['A', 'B'];
var dropPoints = ['C', 'D'];
var validTrips = [
    { from: 'A', to: 'W' },
    { from: 'B', to: 'W' },
    { from: 'W', to: 'C' },
    { from: 'W', to: 'D' }
];
var invalidTrips = [
    { from: 'A', to: 'W1' },
    { from: 'B', to: 'W2' },
    { from: 'W3', to: 'C' },
    { from: 'W4', to: 'D' }
];
console.log(areTripsLegit(pickUps, dropPoints, validTrips)); // true
console.log(areTripsLegit(pickUps, dropPoints, invalidTrips)); // false
