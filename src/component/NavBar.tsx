import Link from "next/link";

const NavBar = () => {
  const navItem = [
    { src: "/home.svg", nav: "home", link: "/" },
    { src: "/history.svg", nav: "history", link: "/history" },
    { src: "/note.svg", nav: "notes", link: "/notes" },
  ];
  return (
    <div className=" flex flex-col gap-5 p-5 max-w-[200px] w-full border-r border-[#272727] h-[calc(100vh-5rem)]">
      {navItem.map((item, i) => (
        <NavItem {...item} key={i} />
      ))}
    </div>
  );
};

export default NavBar;

const NavItem = ({
  src,
  nav,
  link,
}: {
  src: string;
  nav: string;
  link: string;
}) => {
  return (
    <Link href={link}>
      <div className=" w-full py-[5px] rounded-lg px-[10px] flex gap-[10px] items-center hover:bg-[#272727]">
        <img src={src} alt="" className=" w-6" />
        <p className=" text-sm capitalize">{nav}</p>
      </div>
    </Link>
  );
};
