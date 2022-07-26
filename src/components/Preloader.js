export default function Preloader({
  height = 'h-2',
  padding = 'p-2',
  width = 'w-2',
  rounded = 'rounded-10',
  mt = 'mt-0',
}) {
  return (
    <div
      data-placeholder
      className={`relative ${width} ${height} ${padding} overflow-hidden ${mt} ${rounded} bg-my-hover-workspace-color`}
    ></div>
  );
}
