export default function Input({ onChange, placeholder }) {
  return (
    <input
      type="text"
      name="input"
      id=""
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
