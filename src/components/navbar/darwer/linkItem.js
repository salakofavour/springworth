import Link from "next/link";
import SimpleLine from "./simpleLine";

export default function LinkItem({ linkItem, fun }) {
  return (
    <div className="flex flex-col">
      {linkItem.map((item, i) => (
        <div key={item.id}>
          <Link href={item.href}>
            <p
              onClick={item?.fun}
              className=" lg:px-8 px-4 py-4 cursor-pointer hover:bg-gray-200"
            >
              {item.name}
            </p>
          </Link>
          {i == 3 && <SimpleLine />}
        </div>
      ))}
    </div>
  );
}
