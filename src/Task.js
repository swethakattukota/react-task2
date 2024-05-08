import React, { useState } from 'react';
//import 'react-crud-icons/dist/react-crud-icons.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

const Task = () => {
  const [showNew, setshowNew] = useState(true);
  const [showForm, setshowForm] = useState(false);
  const [showDelete, setshowDelete] = useState(true);
  const [toggleSubmit, settoggleSubmit] = useState(true);
  const [isEditItem, setisEditItem] = useState(null);
  const [showList, setshowList] = useState(true);
  const [editMessage, seteditMessage] = useState(false);
  const [deleteMessage, setdeleteMessage] = useState(false);
  const [deleteMessagesuccess, setdeleteMessagesuccess] = useState(false);
  const [inputtitle, setinputtitle] = useState('');
  const [inputdesc, setinputdesc] = useState('');
  const [selectstatus, setselectstatus] = useState('');
  const [items, setitems] = useState([
    {
      id: '001',
      name: 'Task1',
      desc: 'ReactApp',
      status: 'Open',
    },
  ]);
  const [filterdata, setfilterdata] = useState(items);

  const handleadd = () => {
    setshowForm(true);
    setshowList(true);
    setshowNew(false);
  };
  const handlesubmit = (e) => {
    setshowList(true);
    setshowNew(true);
    e.preventDefault();
    if (!inputtitle || !inputdesc) {
      alert('Enter Some Text');
      setshowNew(false);
      //setshowList(false);
    } else if (inputtitle && !toggleSubmit) {
      setitems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputtitle, desc: inputdesc };
          }
          return elem;
        })
      );
      setinputdesc('');
      setinputtitle('');
      settoggleSubmit(true);
      setshowForm(false);
      setshowDelete(true);
    } else {
      const allinputtitle = {
        id: new Date().getTime().toString(),
        name: inputtitle,
        desc: inputdesc,
      };
      setitems([allinputtitle, ...items]);
      setinputtitle('');
      setinputdesc('');
      setshowForm(false);
    }
  };
  const handleinput = (e) => {
    setinputtitle(e.target.value);
  };
  const handleinputdesc = (e) => {
    setinputdesc(e.target.value);
  };
  const handleEdit = (id) => {
    setshowList(false);
    setshowDelete(false);
    setshowNew(false);
    setshowForm(true);
    settoggleSubmit(false);
    let edititem = items.find((elem) => {
      return elem.id === id;
    });
    setinputtitle(edititem.name);
    setinputdesc(edititem.desc);
    setisEditItem(id);
  };
  const handleDelete = (index) => {
    const updateitems = items.filter((elem) => {
      return index !== elem.id;
    });
    setdeleteMessage(true);
    setTimeout(() => {
      setitems(updateitems);
      setdeleteMessage(false);
    }, 2000);
    setdeleteMessagesuccess(false);
  };
  const filterchange = (e) => {
    const data = e.target.value;
    const fitdata = items.filter((i) => i.name.includes(data));
    setfilterdata(fitdata);
  };
  const selectinput = (
    <select
      value={selectstatus}
      onChange={(e) => setselectstatus(e.target.value)}
    >
      <option value="progress">Open</option>
      <option value="pending">In Progress</option>
      <option value="done">Done</option>
    </select>
  );
  return (
    <>
      <h4 className="h4-align">Task Management App</h4>
      <span className="square border border-primary"></span>
      {showNew ? (
        <div className="container">
          <div className="col-12 text-end">
            <button className="btn-newtask" onClick={handleadd}>
              Add New Task
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
      {showForm ? (
        <>
          <div className="container border rounded d-flex justify-content-center shadow p-3 mb-5 bg-white rounded">
            <div className="row">
              <div className="text-center">
                <h2 className="h4-align">
                  {toggleSubmit ? 'Add Task' : 'Edit Task'}
                </h2>
              </div>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    value={inputtitle}
                    onChange={handleinput}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={inputdesc}
                    onChange={handleinputdesc}
                  />
                </Form.Group>
              </Form>
              {toggleSubmit ? (
                <Button variant="primary" onClick={handlesubmit}>
                  Save
                </Button>
              ) : (
                <Button variant="primary" onClick={handlesubmit}>
                  Update
                </Button>
              )}
              {/* </form> */}
            </div>
          </div>
        </>
      ) : (
        ''
      )}
      {showList ? (
        <div classname="container py-2">
          {deleteMessage ? (
            <p className="deletetext">Item Deleted Successfully.</p>
          ) : (
            ''
          )}
          &nbsp;
          <div class="table-responsive">
            <input type="text" placeholder="filter" onChange={filterchange} />
            <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filterdata.map((elem, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{elem.name}</td>
                      <td>{elem.desc}</td>
                      <td>{selectinput}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleEdit(elem.id)}
                        >
                          Edit
                        </Button>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(elem.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        ''
      )}
      <span className="square border border-primary"></span>
    </>
  );
};
export default Task;
