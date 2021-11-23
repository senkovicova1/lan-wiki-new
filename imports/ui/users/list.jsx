import React, {
  useState,
  useMemo,
  useEffect
} from 'react';
import { useSelector } from 'react-redux';
import {
  Modal,
  ModalBody
} from 'reactstrap';

import { DeleteIcon, PencilIcon } from  "/imports/other/styles/icons";

import AddUser from './addUserContainer';
import EditUser from './editUserContainer';

import {
  List,
  Card,
  Input,
  LinkButton
} from "/imports/other/styles/styledComponents";

export default function UserList( props ) {

  const users = useSelector((state) => state.users.value);

  const [ editUserModalOpen, showEditUserModal ] = useState( false );
  const [ chosenUser, setChosenUser ] = useState( null );


  return (
    <List narrow={true}>
      <h2>Users</h2>
      <span className="command-bar">
      <AddUser {...props} />
    </span>
      <Card>
      <table>
        <thead>
          <tr>
            <th width="20%">Name</th>
            <th width="20%">Active</th>
            <th width="20%">Add notebooks</th>
            <th width="20%">Edit users</th>
            <th width="20%">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user._id} onClick={() => setChosenUser(user)}>
              <td>{user.name + " " + user.surname}</td>
              <td>
                <Input
                  disabled
                  type="checkbox"
                  checked={user.active}
                  />
              </td>
              <td>
                <Input
                  disabled
                  type="checkbox"
                  checked={user.rights ? user.rights.addNotebooks : false}
                  />
              </td>
              <td>
                <Input
                  disabled
                  type="checkbox"
                  checked={user.rights ? user.rights.editUsers : false}
                  />
              </td>
              <td style={{display: "flex"}}>
                <LinkButton
                  onClick={(e) => {
                    e.preventDefault();
                    setChosenUser(user);
                  }}
                  >
                  <img
                    className="icon"
                    src={PencilIcon}
                    alt=""
                    />
                </LinkButton>
                <LinkButton
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  >
                  <img
                    className="icon"
                    src={DeleteIcon}
                    alt=""
                    />
                </LinkButton>
              </td>
            </tr>
          )}
        </tbody>
      </table>

    {
      chosenUser &&
       <Modal isOpen={true} toggle={() => setChosenUser(null)}>
         <ModalBody>
           <EditUser userID={chosenUser._id} closeSelf={() => setChosenUser(null)}/>
         </ModalBody>
       </Modal>
     }
   </Card>

    </List>
  );
};
