export default function Error({ message }: { message: string }) {
  return (
    <p className="error">
      <span>🚨</span>
      {message}
    </p>
  );
}
