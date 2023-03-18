interface ISearchModalProps {
  searchModal: boolean;
  setSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const SearchModal = (modal: ISearchModalProps) => {
  const trending = [
    "what is eclee blairs hackathon all about?",
    "what is eclee blairs hackathon all about?",
    "what is eclee blairs hackathon all about?",
    "what is eclee blairs hackathon all about?",
  ];

  if (!modal.searchModal) {
    return null;
  }

  return (
    <div
      className=" fixed inset-0 grid place-items-center bg-[rgba(0,0,0,0.5)] z-50 overscroll-none backdrop-blur-[2px]"
      onClick={() => modal.setSearchModal(false)}
    >
      <div className=" flex justify-center w-full items-center mt-[-50px]">
        <div
          className=" w-[600px] flex flex-col bg-[#313131] rounded-[20px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className=" flex w-full gap-8 bg-[#272727] py-[20px] px-4 rounded-t-[20px]">
            <img src="/search.svg" alt="" />
            <input
              type="text"
              className=" w-full bg-[#272727] font-light focus:outline-none"
              placeholder="Search crystalrohr for any youtube video you’ll like to watch"
            />
          </div>
          <div className=" p-4 gap-8">
            <p className=" mb-4">Trending</p>
            {trending.map((data, i) => (
              <div
                className=" flex justify-between items-center mb-4 cursor-pointer"
                key={i}
              >
                <p className=" text-[#C2C2C2] font-light">{data}</p>
                <img src="/arrowUp.svg" alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
