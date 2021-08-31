import React, {
  useEffect
} from 'react';
import {
getLink
} from "/imports/other/navigationLinks";

export default function Reroute( props ) {

  useEffect(() => {
    if (props.match.path === "/" ){
      props.history.push(getLink(props.match.path, {}));
    }
  }, [props.match.path]);

  return (<div style={{display: "none"}}></div>);
};
