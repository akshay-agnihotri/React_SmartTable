import { useState } from "react";
import Header from "./components/Header";
import Table from "./components/Table";

export default function App() {
  const [submittedData, setSubmittedData] = useState([]);

  function handleSubmitData(name, gender, age) {
    setSubmittedData((prvData) => {
      return [...prvData, { name: name, gender: gender, age: age }];
    });
  }

  return (
    <>
      <Header
        onSubmitData={(name, gender, age) =>
          handleSubmitData(name, gender, age)
        }
      />
      <Table
        submittedData={submittedData}
        setSubmittedData={setSubmittedData}
      />
    </>
  );
}
