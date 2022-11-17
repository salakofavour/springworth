export default function Infodesktop({ product }) {
  return (
    <div className="hidden lg:flex flex-col gap-y-4">
      <h5 className="text-3xl ">{product.name}</h5>
      <hr className="" />
      <div className="">
        <p className="text-[15px]">{product.description}</p>
      </div>
    </div>
  );
}
