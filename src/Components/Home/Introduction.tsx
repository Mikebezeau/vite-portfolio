import avatar from "/avatar.jpg";

function Introduction() {
  return (
    <div className="flex justify-center flex-col items-center">
      <div className="h-[60px] border-r-[1px] mt-[-20px]" />
      <div className="w-[5px] h-[5px] bg-blue-600 rounded-full"></div>
      <h2
        className="mt-5 text-black font-medium text-[13px]
        tracking-widest w-full text-center"
      >
        HELLO! MY NAME IS
      </h2>
      <h2
        className="text-5xl md:text-[70px] font-bold text-black tracking-widest
        mt-5 mb-3 text-center"
      >
        MICHAEL <br></br>BEZEAU
      </h2>
      <img
        src={avatar}
        className="w-[160px] h-[160xp] bg-gray-200 p-7 rounded-full"
      />
    </div>
  );
}

export default Introduction;
