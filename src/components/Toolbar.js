import Button from "./Button";

const Toolbar = () => {
  return (
    <div className="bg-emerald-400 p-2 flex justify-between	items-center">
      <div className="font-bold">Car Rentals</div>
      <div id="controls" className="flex flex-row gap-2">
        <Button>Register</Button>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default Toolbar;
