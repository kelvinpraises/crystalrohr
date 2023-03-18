const NewCard = () => {
  return (
    <div className=" w-full p-6 bg-gray-400 mb-4 rounded-2xl flex flex-col gap-3">
      <input
        type="text"
        className=" w-full p-2 bg-gray-400 focus:outline-none text-white font-bold placeholder:text-[#e0e0e0] placeholder:font-normal"
        placeholder="Title"
      />
      <textarea
        className=" w-full p-2 bg-gray-400 focus:outline-none text-white font-bold placeholder:text-[#e0e0e0] placeholder:font-normal"
        placeholder="Note body"
      />
      <div className=" flex justify-end">
        <button className=" py-2 px-4 bg-black rounded-lg">save</button>
      </div>
    </div>
  );
};

export default NewCard;
