import navigationMenu from "../../data/menu";
import Link from "next/link";

const MenuList = () => {
  return (
    <div>
      {navigationMenu.map((item) => (
        <Link key={item.id} href={item.href}>
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default MenuList;
