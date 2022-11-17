import react from "react";

export default function SelectInputField({
  defaultValue,
  label,
  values,
  setValue,
}) {
  return (
    <div className="w-full">
      <label className="font-semibold">{label}</label>
      <select
        value={defaultValue}
        onChange={(e) => setValue(e.target.value)}
        className="border w-full py-1 px-2 shadow-md bg-gray-100 rounded-md outline-myYellow"
      >
        {values.map((item, i) => (
          <option key={i}>{item.name}</option>
        ))}
      </select>
    </div>
  );
}
