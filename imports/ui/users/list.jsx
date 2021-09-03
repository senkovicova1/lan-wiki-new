import React, {
  useState,
  useMemo,
  useEffect
} from 'react';
import { useSelector } from 'react-redux';

import AddUser from './addUserContainer';

import {
  List,
  Input
} from "/imports/other/styles/styledComponents";

export default function UserList( props ) {

  const users = useSelector((state) => state.users.value);

  const [ search, setSearch ] = useState( "" );
  const [ searchName, setSearchName ] = useState( "" );
  const [ searchSurname, setSearchSurname ] = useState( "" );
  const [ searchEmail, setSearchEmail ] = useState( "" );

  const [ chosenUser, setChosenUser ] = useState( null );

  return (
    <List>
      <h2>Users</h2>
      <AddUser {...props} />
      <table>
        <thead>
          <tr>
            <th>Surname</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <Input value={searchSurname} onChange={(e) => setSearchSurname(e.target.value)} />
            </th>
            <th>
              <Input value={searchName} onChange={(e) => setSearchName(e.target.value)} />
            </th>
            <th>
              <Input value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} />
            </th>
          </tr>
          {users.map(user =>
            <tr key={user._id} onClick={() => setChosenUser(user)}>
              <td>{user.surname}</td>
              <td>{user.name}</td>
              <td>{user.emails ? user.emails[0].address : "Cannot access email"}</td>
            </tr>
          )}
        </tbody>
      </table>
    </List>
  );
};
