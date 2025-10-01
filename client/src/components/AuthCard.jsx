const AuthCard = ({ title, children }) => {
  return (
    <div className=" max-w-md px-6 py-12 bg-white flex flex-col justify-center basis-2/3 rounded-r-2xl ">
      <h2 className="text-xl md:text-2xl font-bold text-black mb-6 text-center">{title}</h2>
      {children}
    </div>
  );
};

export default AuthCard;
