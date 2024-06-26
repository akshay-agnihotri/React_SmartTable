import { useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

Header.propTypes = {
  onSubmitData: PropTypes.func.isRequired,
};

function Header({ onSubmitData }) {
  const name = useRef();
  const gender = useRef();
  const age = useRef();
  const modal = useRef();

  function handleSubmitData() {
    if (name.current.value && gender.current.value && age.current.value) {
      onSubmitData(name.current.value, gender.current.value, age.current.value);
      name.current.value = "";
      gender.current.value = "";
      age.current.value = "";
    } else {
      modal.current.showModal();
    }
  }
  return (
    <>
      {createPortal(
        <dialog
          ref={modal}
          className="p-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        >
          <p>Wrong Credentials!!!</p>
          <form method="dialog">
            <button>OK</button>
          </form>
        </dialog>,
        document.querySelector("body")
      )}
      <header className="flex flex-col mx-auto max-w-[700px] w-[90%] p-2 gap-6 items-center">
        <div className="flex justify-between w-full">
          <input
            ref={name}
            type="text"
            placeholder="Name"
            className="p-2 focus:outline-none w-[30%] rounded-sm"
          />
          <input
            ref={gender}
            type="text"
            placeholder="Gender"
            className="p-2 focus:outline-none w-[30%] rounded-sm"
          />
          <input
            ref={age}
            type="text"
            placeholder="Age"
            className="p-2 focus:outline-none w-[30%] rounded-sm"
          />
        </div>
        <button
          className="bg-green-300 p-2 w-[60px] rounded-sm"
          onClick={handleSubmitData}
        >
          Add
        </button>
      </header>
    </>
  );
}

export default Header;
