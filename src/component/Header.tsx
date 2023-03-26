
const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex flex-row px-5 py-4 justify-between items-center fixed w-full z-20 top-0 bg-[#020203]">
      {children}
    </div>
  );
};

export default Header;
