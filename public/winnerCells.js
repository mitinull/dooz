export const winnerCells = (board) => {
  if (
    board[0].textContent &&
    board[0].textContent === board[1].textContent &&
    board[1].textContent === board[2].textContent
  ) {
    return { winner: board[0].textContent, cells: [0, 1, 2] };
  }
  if (
    board[3].textContent &&
    board[3].textContent === board[4].textContent &&
    board[4].textContent === board[5].textContent
  ) {
    return { winner: board[3].textContent, cells: [3, 4, 5] };
  }
  if (
    board[6].textContent &&
    board[6].textContent === board[7].textContent &&
    board[7].textContent === board[8].textContent
  ) {
    return { winner: board[6].textContent, cells: [6, 7, 8] };
  }
  if (
    board[0].textContent &&
    board[0].textContent === board[3].textContent &&
    board[3].textContent === board[6].textContent
  ) {
    return { winner: board[0].textContent, cells: [0, 3, 6] };
  }
  if (
    board[1].textContent &&
    board[1].textContent === board[4].textContent &&
    board[4].textContent === board[7].textContent
  ) {
    return { winner: board[1].textContent, cells: [1, 4, 7] };
  }
  if (
    board[2].textContent &&
    board[2].textContent === board[5].textContent &&
    board[5].textContent === board[8].textContent
  ) {
    return { winner: board[2].textContent, cells: [2, 5, 8] };
  }
  if (
    board[0].textContent &&
    board[0].textContent === board[4].textContent &&
    board[4].textContent === board[8].textContent
  ) {
    return { winner: board[0].textContent, cells: [0, 4, 8] };
  }
  if (
    board[2].textContent &&
    board[2].textContent === board[4].textContent &&
    board[4].textContent === board[6].textContent
  ) {
    return { winner: board[2].textContent, cells: [2, 4, 6] };
  }
  if ([...board].every((cell) => cell.textContent !== ""))
    return "draw";
  return false;
};
