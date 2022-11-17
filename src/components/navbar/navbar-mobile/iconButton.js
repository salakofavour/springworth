export default function IconButton({ color, size, Icon, handleClick }) {
  return (
    <div onClick={handleClick}>
      <Icon
        className={`${color && `text-${color}`} ${
          size ? `w-${size}` : "w-8"
        }  text-white`}
      />
    </div>
  );
}
