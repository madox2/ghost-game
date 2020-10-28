export function DisabledBackdrop() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(255, 255, 255, .4)',
      }}
    />
  )
}
