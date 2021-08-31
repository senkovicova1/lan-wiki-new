import React, {
  useState,
  useEffect
} from 'react';

import {
  TagsCollection
} from '/imports/api/tagsCollection';

import {
  Modal,
  ModalBody
} from 'reactstrap';

import TagForm from './tagForm';

export default function EditTagContainer( props ) {

  const {
    tag,
    closeSelf,
  } = props;

  const editTag = ( name, colour ) => {
    let data = {
      name,
      colour
    };
    TagsCollection.update( tag._id, {
      $set: {
      ...data
      }
    } )
    closeSelf();
  };

  const removeTag = () => {
    if ( window.confirm( "Are you sure you want to permanently remove this tag?" ) ) {
      TagsCollection.remove( {
        _id: tag._id
      }, (error) => {
        if (error) console.log(error);
      } );
      closeSelf();
    }
  }

  const closeModal = () => {
  closeSelf();
  }

  return (
        <TagForm {...tag} onSubmit={editTag} onCancel={closeModal} onRemove={removeTag}/>
  );
};
