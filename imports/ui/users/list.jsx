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

  const { search } = props;

  const users = useSelector((state) => state.users.value);

  const [ searchName, setSearchName ] = useState( "" );
  const [ searchSurname, setSearchSurname ] = useState( "" );

  const [ chosenUser, setChosenUser ] = useState( null );

  const searchedUsers = useMemo(() => {
    return users.filter(user =>
      (search.length + searchName.length + searchSurname.length === 0) ||
      (search.length > 0 && user.name.toLowerCase().includes(search.toLowerCase())) ||
      (searchName.length > 0 && user.name.toLowerCase().includes(searchName.toLowerCase())) ||
      (search.length > 0 &&  user.surname.toLowerCase().includes(search.toLowerCase())) ||
      (searchSurname.length > 0 && user.surname.toLowerCase().includes(searchSurname.toLowerCase()))
      );
  }, [users, search, searchName, searchSurname]);

  const yellowMatch = ( string ) => {
    if ( search.length === 0 || !string.toLowerCase().includes( search.toLowerCase() ) ) {
      return string;
    }
    let startIndex = string.toLowerCase().indexOf( search.toLowerCase() );
    let endIndex = startIndex + search.length;
    return <span> {string.substring( 0, startIndex - 1 )} <span style={{ backgroundColor: "yellow" }}> {string.substring( startIndex-1, endIndex )} </span> {string.substring(endIndex )} </span>;
  }

  return (
    <List>
      <h2>Users</h2>
      <AddUser {...props} />
      <table>
        <thead>
          <tr>
            <th>Surname</th>
            <th>Name</th>
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
          </tr>
          {searchedUsers.map(user =>
            <tr key={user._id} onClick={() => setChosenUser(user)}>
              <td>{yellowMatch(user.surname)}</td>
              <td>{yellowMatch(user.name)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </List>
  );
};
