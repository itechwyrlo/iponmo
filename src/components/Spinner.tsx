export function Spinner() {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 18,
        height: 18,
        border: '2px solid rgba(15,14,23,0.3)',
        borderTop: '2px solid #0f0e17',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
        verticalAlign: 'middle',
        marginRight: 8,
      }}
    />
  );
}
