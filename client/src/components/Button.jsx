import "./Button.css";

export default function Button({ name, onClick }) {
  return (
    <button className="btn-login" type="submit" name={name} onClick={onClick}>
      {name}
    </button>
  );
}
