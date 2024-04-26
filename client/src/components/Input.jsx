import "./Input.css";

export default function Input({ value, onChange, placeholder }) {
  return (
    <input
      className="input-textbox"
      type="text"
      name="input"
      id=""
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  );
}
