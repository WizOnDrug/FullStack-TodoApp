import React from 'react';
import { Form } from '../components/Form';
import { Table } from '../components/Table';

function App() {
  return (
    <section
      className="leading-normal tracking-normal h-screen w-screen text-indigo-400  bg-cover bg-fixed  overflow-scroll"
      style={{ backgroundImage: "url('header.png')" }}
    >
      <div className="container mt-8 px-6 py-12 mx-auto">
        <p style={{ fontSize: 32, padding: 0 }}>WiZ On DruG</p>

        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        <div className="flex flex-col-reverse justify-center  bg-opacity-40 p-4 rounded-lg">
          <Table />
          <Form />
        </div>
      </div>
    </section>
    
  );
}

export default App;
