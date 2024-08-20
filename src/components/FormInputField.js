const FormInput = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input
      type={type}
      placeholder={placeholder}
      className="mt-1 block w-full border border-gray-300 rounded p-2 text-black"
      {...register(name, { valueAsNumber })}
    />
    {error && <div className="text-red-500 text-sm">{error.message}</div>}
  </>
);
export default FormInput;
