import React from "react";
import { Form } from "../components/Form";
import { Table } from "../components/Table";

function App() {
  return (
    <section
      className="leading-normal tracking-normal h-screen w-screen text-indigo-400  bg-cover bg-fixed  overflow-scroll"
      style={{ backgroundImage: "url('header.png')" }}
    >
      <div className="container mt-8 px-6 py-12 mx-auto opacity-80">
        <div className="flex h-40 w-full flex-row items-center justify-center">
          <button className="animate-border inline-block rounded-md bg-white bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-1">
            <span className="block rounded-md bg-slate-900 px-5 py-3 font-bold text-white">
              {" "}
              FullStack TodoApp [Django,React-TypeScript,ReduxToolkit]{" "}
            </span>
          </button>
        </div>
        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        <div className="flex flex-col-reverse justify-center  bg-opacity-40 p-4 rounded-lg">
          <Table />
          <Form />
        </div>
      </div>
      <div className="flex h-40 w-full flex-row items-center justify-center">
        <button className="animate-border inline-block rounded-md bg-white bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-[length:400%_400%] p-1">
          <span className="block rounded-md  px-5 py-3  font-bold text-white">
            {" "}
            DEVELOPED BY WiZ On DruG{" "}
            <a
              href="https://github.com/WizOnDrug"
              className="text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </span>
        </button>
      </div>
    </section>
  );
}

export default App;
