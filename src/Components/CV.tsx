import resume from "/resume.jpg";

const CV = () => {
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 bg-white overflow-auto w-[100vw] md:w-full">
      <img
        className="mt-24 border border-black max-w-[1000px] m-auto"
        src={resume}
      />
    </div>
  );
};

export default CV;
