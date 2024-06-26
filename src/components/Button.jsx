import { useState } from "react";
import PropTypes from "prop-types";

Button.propTypes = {
  index: PropTypes.any.isRequired,
  handleEditUsersData: PropTypes.func.isRequired,
  handleStopEditUsersData: PropTypes.func.isRequired,
};

function Button({ index, handleEditUsersData, handleStopEditUsersData }) {
  const [state, setState] = useState("Edit");
  function handleSetState() {
    state === "Save"
      ? handleStopEditUsersData(index)
      : handleEditUsersData(index);
    setState((prvState) => {
      return prvState === "Edit" ? "Save" : "Edit";
    });
  }
  return (
    <button
      onClick={handleSetState}
      className="bg-green-500 text-white px-2 py-1 rounded"
    >
      {state}
    </button>
  );
}

export default Button;