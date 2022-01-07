import React, {
  useState,
  useMemo,
  useEffect,
} from 'react';

import Select from 'react-select';

import {
  selectStyle
} from '/imports/other/styles/selectStyles';

import { BackIcon, PencilIcon, DeleteIcon, UserIcon } from  "/imports/other/styles/icons";

import {
  uint8ArrayToImg
} from '/imports/other/helperFunctions';

import { useSelector } from 'react-redux';

import {
  Form,
  Card,
  BorderedLinkButton,
  Input,
  Textarea,
  ButtonCol,
  LinkButton,
  FullButton,
  UserEntry
} from "/imports/other/styles/styledComponents";

export default function NotebookForm( props ) {

  const {
    title,
    _id: notebookId,
    name: notebookName,
    archived: notebookArchived,
    description: notebookDescription,
    users: notebookUsers,
    onSubmit,
    onRemove,
    onCancel,
    match,
    location
  } = props;

const dbUsers = useSelector((state) => state.users.value);

const userId = Meteor.userId();

  const [ name, setName ] = useState( "" );
  const [ archived, setArchived ] = useState( false );
  const [ description, setDescription ] = useState( "" );
  const [ users, setUsers ] = useState( [] );

  useEffect( () => {
    if ( notebookName ) {
      setName( notebookName );
    } else {
      setName( "" );
    }
    if ( notebookArchived ) {
      setArchived( notebookArchived );
    } else {
      setArchived( false );
    }
    if ( notebookDescription ) {
      setDescription( notebookDescription );
    } else {
      setDescription( "" );
    }
    if ( notebookUsers ) {
      setUsers( notebookUsers );
    } else {
      setUsers( [{_id: userId, active: true, viewItems: true, editItems: true, manageUsers: true}] );
    }
  }, [ notebookName, notebookArchived, notebookUsers, notebookDescription ] );

  const usersWithRights = useMemo(() => {
   return users.map(user =>
        {
        let newUser = {...dbUsers.find(u => u._id === user._id), ...user};
        return newUser;
      });
  }, [users, dbUsers]);

  const usersToSelect = useMemo(() => {
    return dbUsers.filter(user => !users.find(u => u._id === user._id));
  }, [dbUsers, users]);

  document.onkeydown = function (e) {
    e = e || window.event;
    switch (e.which || e.keyCode) {
      case 13 :
      if (name.length > 0){
        onSubmit(
           name,
           archived,
           users
        );
      }
      break;
    }
  }

  const userCanManageUsers = !notebookId || notebookUsers.find(user => user._id === userId).manageUsers;

  return (
    <Form>

          <span style={{display: "flex", padding: "0px", marginTop: "1em", marginBottom: "1em"}}>
              <BorderedLinkButton
                fit={true}
                onClick={(e) => {
                  e.preventDefault();
                  onCancel();
                }}
                >
                <img
                  className="icon"
                  style={{marginRight: "0.6em"}}
                  src={BackIcon}
                  alt=""
                  />
                <span>
                  Cancel
                </span>
              </BorderedLinkButton>
              {
                onRemove &&
                <BorderedLinkButton
                  fit={true}
                  onClick={(e) => {
                    e.preventDefault();
                    onRemove();
                  }}
                  >
                  <img
                    className="icon"
                    style={{marginRight: "0.6em"}}
                    src={DeleteIcon}
                    alt=""
                    />
                  <span>
                    Delete
                  </span>
                </BorderedLinkButton>
              }
              <BorderedLinkButton
                fit={true}
                disabled={name.length === 0}
                onClick={(e) => {
                  e.preventDefault();
                  onSubmit(
                     name,
                     archived,
                     description,
                     users
                  );
                }}
                >
                <img
                  className="icon"
                  style={{marginRight: "0.6em"}}
                  src={PencilIcon}
                  alt=""
                  />
                <span>
                  Save
                </span>
              </BorderedLinkButton>
            </span>

      <Card>
      <h2>{title}</h2>

      <section>
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
      </section>

      <section>
        <Input
          id="archived"
          name="archived"
          type="checkbox"
          style={{marginRight: "0.6em"}}
          checked={archived}
          onChange={(e) =>  setArchived(!archived)}
          />
        <label htmlFor="archived">Archived</label>
      </section>

      <section>
        <label htmlFor="description">Description</label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          />
      </section>

      {
        userCanManageUsers &&
      <section>
        <label htmlFor="users">Users</label>
        <Select
          styles={selectStyle}
          value={{label: "Choose another user", value: 0}}
          onChange={(e) => {
            setUsers([...users, {_id: e._id, active: true, viewItems: true, editItems: false, manageUsers: false}]);
          }}
          options={usersToSelect}
          />
      </section>
}
      {
        userCanManageUsers &&
      <section>
        <table width="100%">
          <thead>
            <tr>
              <th width="16%"> Name </th>
              <th width="16%">Active</th>
              <th width="16%">View items</th>
              <th width="16%">Edit items</th>
              <th width="16%">Manage users</th>
              <th width="16%">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              usersWithRights.map((user) => (
              <tr key={user._id}>
                <td>{user.label}</td>
                  <td>
                    <Input
                      id="active"
                      name="active"
                      type="checkbox"
                      checked={user.active}
                      onChange={(e) =>  {
                        const newUsers = users.map(u => {
                          if (u._id === user._id){
                            return {...u, active: !u.active};
                          }
                          return u;
                        });
                        setUsers(newUsers);
                      }}
                      />
                  </td>
                    <td>
                      <Input
                        id="read"
                        name="read"
                        type="checkbox"
                        checked={user.viewItems}
                        onChange={(e) =>  {
                          const newUsers = users.map(u => {
                            if (u._id === user._id){
                              return {...u, viewItems: !u.viewItems};
                            }
                            return u;
                          });
                          setUsers(newUsers);
                        }}
                        />
                    </td>
                    <td>
                      <Input
                        id="read"
                        name="read"
                        type="checkbox"
                        checked={user.editItems}
                        onChange={(e) =>  {
                          const newUsers = users.map(u => {
                            if (u._id === user._id){
                              return {...u, editItems: !u.editItems};
                            }
                            return u;
                          });
                          setUsers(newUsers);
                        }}
                        />
                    </td>
                    <td>
                      <Input
                        id="read"
                        name="read"
                        type="checkbox"
                        checked={user.manageUsers}
                        onChange={(e) =>  {
                          const newUsers = users.map(u => {
                            if (u._id === user._id){
                              return {...u, manageUsers: !u.manageUsers};
                            }
                            return u;
                          });
                          setUsers(newUsers);
                        }}
                        />
                    </td>
                    <td>
                      <LinkButton
                        onClick={(e) => {
                          e.preventDefault();
                          const newUsers = users.filter(u => u._id !== user._id);
                          setUsers(newUsers);
                        }}
                        >
                        <img
                          className="icon"
                          style={{marginRight: "0.6em"}}
                          src={DeleteIcon}
                          alt=""
                          />
                      </LinkButton>
                    </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </section>
    }
  </Card>

    </Form>
  );
};
