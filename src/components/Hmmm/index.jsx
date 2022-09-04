const Hmmm = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <h2 style={{ marginBottom: '0.5rem' }}>¯\_(ツ)_/¯</h2>
      <p style={{
        fontSize: '0.875rem',
        color: 'var(--alert-red-dark)',
        margin: 0
      }}>Yikes, you don&apos;t have anything to plot! Click &apos;Upload a New SVG&apos; to get started.</p>
    </div>
  );
};

export default Hmmm;
