const RadioButton = ({ label, value, checked, onChange }) => {
  return (
    <label className='label  gap-1 cursor-pointer'>
      <input
        name='radio'
        className='w-5 h-5 radio-primary'
        type='radio'
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className='font-sans  text-xl'>{label}</span>
    </label>
  )
}

export default RadioButton
