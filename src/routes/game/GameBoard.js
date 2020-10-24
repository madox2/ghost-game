function BoardContainer({ children }) {
  return <div style={{ flex: 1 }}>{children}</div>
}
export default function GameBoard({ state, doAction }) {
  if (state?.board?.type === 'countdown') {
    return <BoardContainer>{state.board.value}</BoardContainer>
  }
  if (state?.board?.type === 'round') {
    return <BoardContainer>round</BoardContainer>
  }
  return <BoardContainer>Not started</BoardContainer>
}
