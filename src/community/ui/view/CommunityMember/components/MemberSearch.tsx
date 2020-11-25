import React, { useState }  from 'react';
import classNames from "classnames";
import {Icon} from "semantic-ui-react";

const MemberSearch:React.FC = () => {

  const [focus, setFocus] = useState<boolean>(false);
  const [write, setWrite] = useState<any>('');

  return (
    <div className={classNames("ui h38 search input")}>
      <input type="text"
        placeholder="닉네임 입력"
        value={write}
        onClick={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => setWrite(e.target.value)}
      />
      <Icon className="search link top"/>
    </div>
  )
}

export default MemberSearch;