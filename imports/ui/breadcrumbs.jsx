import React, {
  useMemo
} from 'react';
import {
  Meteor
} from 'meteor/meteor';

import {
  Breadcrumbs as StyledBreadcrumbs
} from '/imports/other/styles/styledComponents';

export default function Breadcrumbs( props ) {

  const {match, history, location} = props;
  const {notebookId, tagID} = match.params;

  console.log(props);

  const breadcrumbs = useMemo(() => {
    return <span>HI</span>
  }, [location]);

  return (
    <StyledBreadcrumbs>
      {breadcrumbs}
    </StyledBreadcrumbs>
  );
};
