import React, {Component} from 'react';

interface Props {
  title : string
}

class CubeTitle extends Component<Props>  {

  render(){

    const { title } = this.props;

    return(
      <div className="tit">
        <a href="#" className="ellipsis">{this.props.title}</a>
      </div>
  )
  }
}

export default CubeTitle;
