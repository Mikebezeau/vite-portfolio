import resume from "/resume.jpg";

const CV = () => {
  return (
    <div className="pt-16 text-center flex flex-col items-center w-full">
      <img className="border border-black max-w-[1000px] m-auto" src={resume} />
    </div>
  );
};

export default CV;
