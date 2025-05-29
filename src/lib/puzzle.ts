function generateSolvablePuzzle(size: number): (number | null)[] {
  const arr: (number | null)[] = [...Array(size * size - 1)].map(
    (_, i) => i + 1
  );
  arr.push(null);

  let isSolvable = false;
  while (!isSolvable) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const invCount = shuffled.reduce<number>((acc, val, i) => {
      if (val === null) return acc;
      for (let j = i + 1; j < shuffled.length; j++) {
        if (shuffled[j] !== null && shuffled[j]! < val) acc++;
      }
      return acc;
    }, 0);

    if (size % 2 === 1) {
      isSolvable = invCount % 2 === 0;
    } else {
      const emptyRow = Math.floor(shuffled.indexOf(null) / size);
      isSolvable = (invCount + emptyRow) % 2 === 1;
    }

    if (isSolvable) return shuffled;
  }
  return arr;
}

function moveTile(
  tiles: (number | null)[],
  index: number,
  size: number
): (number | null)[] | null {
  const newTiles = [...tiles];
  const emptyIndex = tiles.indexOf(null);

  const rowI = Math.floor(index / size);
  const colI = index % size;
  const rowE = Math.floor(emptyIndex / size);
  const colE = emptyIndex % size;

  let moved = false;

  if (colI === colE && rowI !== rowE) {
    const step = rowI < rowE ? 1 : -1;
    for (let r = rowE - step; r !== rowI - step; r -= step) {
      const from = r * size + colE;
      const to = (r + step) * size + colE;
      [newTiles[to], newTiles[from]] = [newTiles[from], newTiles[to]];
    }
    moved = true;
  } else if (rowI === rowE && colI !== colE) {
    const step = colI < colE ? 1 : -1;
    for (let c = colE - step; c !== colI - step; c -= step) {
      const from = rowE * size + c;
      const to = rowE * size + (c + step);
      [newTiles[to], newTiles[from]] = [newTiles[from], newTiles[to]];
    }
    moved = true;
  }

  return moved ? newTiles : null;
}

export { generateSolvablePuzzle, moveTile };
