import Link from "next/link";
import LoginButton from "./button/LoginButton";

interface ISearchProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = (props: ISearchProps) => {
  return (
    <div className=" flex flex-row px-5 py-4 justify-between items-center border-b border-[#272727] font-extrabold fixed w-full z-10 top-0">
      <Link href={"/"}>
        <p>Crystalrohr</p>
      </Link>
      <div className=" flex gap-40 items-center">
        <div
          className=" w-[250px] h-10 bg-[#292621] rounded-lg p-3 flex justify-between items-center font-extralight text-[#AAAAAA] text-sm cursor-text select-none"
          onClick={() => props.setOpenModal(true)}
        >
          <p>Search Crystalrohr</p>
          <img src="/search.svg" className=" w-5" alt="" />
        </div>
        <LoginButton />
      </div>
    </div>
  );
};

export default Header;
