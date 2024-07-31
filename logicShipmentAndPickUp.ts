type Trip = {
    from: string;
    to: string;
  };
  
  function areTripsLegit(pickUps: string[], dropPoints: string[], trips: Trip[]): boolean {
    
    const graph = new Map<string, string[]>();
    const dropSet = new Set<string>(dropPoints);
  
    // Build the graph
    for (const trip of trips) {
      if (!graph.has(trip.from)) {
        graph.set(trip.from, []);
      }
      graph.get(trip.from)!.push(trip.to);
    }
  
    // Function to perform DFS to check if a node can reach any drop point
    const canReachDrop = (start: string, visited: Record<string, boolean> = {}): boolean => {
      if (dropSet.has(start)) return true;
      visited[start] = true;
      
      if (!graph.has(start)) return false;
      for (const neighbor of graph.get(start)!) {
        if (!visited[neighbor] && canReachDrop(neighbor, visited)) {
          return true;
        }
      }
      return false;
    };
  
    // Check if all pick-up points can reach any drop point
    for (const pickUp of pickUps) {
      if (!canReachDrop(pickUp)) {
        return false;
      }
    }
    return true;
  }
  
  // Example usage
  const pickUps = ['A', 'B'];
  const dropPoints = ['C', 'D'];
  
  const validTrips: Trip[] = [
    { from: 'A', to: 'W' },
    { from: 'B', to: 'W' },
    { from: 'W', to: 'C' },
    { from: 'W', to: 'D' }
  ];
  
  const invalidTrips: Trip[] = [
    { from: 'A', to: 'W1' },
    { from: 'B', to: 'W2' },
    { from: 'W3', to: 'C' },
    { from: 'W4', to: 'D' }
  ];
  
  console.log(areTripsLegit(pickUps, dropPoints, validTrips)); // true
  console.log(areTripsLegit(pickUps, dropPoints, invalidTrips)); // false
  