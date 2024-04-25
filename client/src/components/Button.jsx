export default function Button({ name, onClick }) {
  return (
    <button type="submit" name={name} onClick={onClick}>
      {name}
    </button>
  );
}
