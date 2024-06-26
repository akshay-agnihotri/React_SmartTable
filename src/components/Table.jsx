import PropTypes from "prop-types";
import Button from "./Button";
import { useState } from "react";

Table.propTypes = {
  submittedData: PropTypes.array.isRequired,
  setSubmittedData: PropTypes.func.isRequired,
};

function Table({ submittedData, setSubmittedData }) {
  const [editUsersData, setEditUsersData] = useState([]);
  const [SearchedUser, setSearchedUser] = useState(null);

  let dataToShow = submittedData;
  if (SearchedUser !== null) dataToShow = SearchedUser;

  function deleteData(userDataIndex) {
    setSubmittedData((prvUserData) => {
      return [
        ...prvUserData.filter((ele, index) => {
          if (index !== userDataIndex) return ele;
        }),
      ];
    });
  }

  function handleEditUsersData(index) {
    setEditUsersData((prvEditUsersData) => {
      return [...prvEditUsersData, index];
    });
  }

  function handleStopEditUsersData(index) {
    setEditUsersData((prvEditUsersData) => {
      return [...prvEditUsersData.filter((ele) => ele !== index)];
    });
  }

  function handleUpdateSubmittedData(index, value, identifier) {
    setSubmittedData((prvSubmittedData) => {
      const userData = prvSubmittedData[index];
      userData[identifier] = value;
      prvSubmittedData[index] = userData;
      return [...prvSubmittedData];
    });
  }

  function handleSearchData(e) {
    e.preventDefault();
    let userName = e.target.elements[0].value;
    e.target.elements[0].value = "";
    setSearchedUser(() => {
      return [...submittedData.filter((ele) => ele.name === userName)];
    });
  }

  return (
    <div className="mx-auto max-w-[600px] w-[80%]">
      <form
        action=""
        onSubmit={(e) => handleSearchData(e)}
        className="flex flex-wrap gap-1 my-2"
      >
        <input
          type="text"
          placeholder="Search"
          className="rounded p-2 focus:outline-none"
        />
        <button type="submit" className="bg-teal-500 px-6 py-2 rounded-sm">
          Search
        </button>
        <button
          onClick={() => setSearchedUser(null)}
          type="button"
          className="bg-teal-500 px-6 py-2 rounded-sm"
        >
          Clear Search
        </button>
      </form>
      <table className="w-full p-2 border-collapse border border-gray-100">
        <thead>
          <tr className="bg-blue-300">
            <th className="border border-gray-100 p-2 text-left w-[26%]">
              Name
            </th>
            <th className="border border-gray-100 p-2 text-left w-[26%]">
              Gender
            </th>
            <th className="border border-gray-100 p-2 text-left w-[13%]">
              Age
            </th>
            <th className="border border-gray-100 p-2 text-left w-[35%]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {dataToShow.map((row, index) => (
            <tr key={index} className="bg-gray-800">
              {editUsersData.some((userIndex) => userIndex === index) ? (
                <>
                  <td className="border border-gray-100 p-2 text-white">
                    <input
                      onChange={(e) =>
                        handleUpdateSubmittedData(index, e.target.value, "name")
                      }
                      type="text"
                      className="focus:outline-none bg-gray-800 text-white w-full"
                      defaultValue={row.name}
                    />
                  </td>
                  <td className="border border-gray-100 p-2 text-white">
                    <input
                      onChange={(e) =>
                        handleUpdateSubmittedData(
                          index,
                          e.target.value,
                          "gender"
                        )
                      }
                      className="focus:outline-none bg-gray-800 text-white w-full"
                      type="text"
                      defaultValue={row.gender}
                    />
                  </td>
                  <td className="focus:outline-none border border-gray-100 p-2 text-white">
                    <input
                      onChange={(e) =>
                        handleUpdateSubmittedData(index, e.target.value, "age")
                      }
                      type="text"
                      defaultValue={row.age}
                      className="focus:outline-none bg-gray-800 text-white w-full"
                    />
                  </td>
                </>
              ) : (
                <>
                  <td className="border border-gray-100 p-2 text-white">
                    {row.name}
                  </td>
                  <td className="border border-gray-100 p-2 text-white">
                    {row.gender}
                  </td>
                  <td className="border border-gray-100 p-2 text-white">
                    {row.age}
                  </td>
                </>
              )}
              <td className="border border-gray-100 p-2 text-white">
                <div className="flex gap-1 flex-wrap w-full justify-center content-center">
                  <button
                    onClick={() => deleteData(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                  <Button
                    index={index}
                    handleEditUsersData={(index) => handleEditUsersData(index)}
                    handleStopEditUsersData={(index) =>
                      handleStopEditUsersData(index)
                    }
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
