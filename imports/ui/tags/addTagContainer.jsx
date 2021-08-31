import React, {
  useState
} from 'react';

import {
  TagsCollection
} from '/imports/api/tagsCollection';

import {
  Modal,
  ModalBody
} from 'reactstrap';

import TagForm from './tagForm';

import { PlusIcon } from  "/imports/other/styles/icons";
import {
  LinkButton
} from '/imports/other/styles/styledComponents';

export default function AddTagContainer( props ) {

  const [ addTagModalOpen, showAddTagModal ] = useState( false );

  const toggleAddTagModal = () => showAddTagModal( !addTagModalOpen );

  const addNewTag = ( name, colour ) => {
    TagsCollection.insert( {
      name, colour
    } );
    showAddTagModal( false );
  }

  const closeModal = () => {
    showAddTagModal( false );
  }

  return (
    <div>
        <LinkButton
          onClick={(e) => {e.preventDefault(); toggleAddTagModal();}}
          >
          <img
            className="icon"
            src={PlusIcon}
            alt=""
            />
          Tag
        </LinkButton>
      <Modal isOpen={addTagModalOpen} toggle={toggleAddTagModal}>
        <ModalBody>
          <TagForm onSubmit={addNewTag} onCancel={closeModal}/>
        </ModalBody>
      </Modal>
    </div>
  );
};
