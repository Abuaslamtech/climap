import location from "../assets/location.svg";

const Register = () => {
  return (
    <div className="h-screen bg-white flex flex-row justify-center items-center m-auto ">
      <div className="w-1/2 flex flex-col justify-center items-end">
        <div className="w-[80%] bg-neutralGray shadow  rounded-lg text-center border-2">
          <h1 className="text-4xl font-black text-primary">Sign Up</h1>
          <p className="text-gray-600 p-2 pb-4">
            Fill the form to register an account with us
          </p>

          <form className="w-full flex flex-col justify-center items-center gap-4 m-auto">
            <input
              type="text"
              placeholder="Enter Full Name"
              className="p-3 border  rounded-lg"
            />
            <input
              type="text"
              placeholder="Enter Email"
              className="p-3 border  rounded-lg"
            />
            <input
              type="password"
              placeholder="Enter Email"
              className="p-3 border  rounded-lg"
            />
            <input
              type="password"
              placeholder="Re-Enter Password"
              className="p-3 border  rounded-lg"
            />
            <button className="p-3 border  rounded-lg bg-accentGold hover:bg-accentGold/80">
              Register
            </button>
          </form>
          <div></div>
        </div>
      </div>
      <div className="w-1/2">
        <img src={location} alt="" className="w-[80%] border" />
      </div>
    </div>
  );
};

export default Register;
