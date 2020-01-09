
import React, { ComponentType, Component } from 'react';


interface Props {
  load: () => Promise<any>,
}

interface State {
  component: ComponentType | null
}

class DynamicImport extends Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      component: null,
    };
  }

  componentDidMount() {
    //
    this.props.load().then((component: any) => {
      console.log('[DynamicImport] Load component', component);
      if (component.ContentHeader) {
        this.setState({ component: component.ContentHeader });
      }
      else {
        this.setState({ component: component.default || component });
      }
    });
  }

  render() {
    //
    const { component: Component } = this.state;

    if (!Component) {
      return null;
    }
    return (
      <Component
        {...this.props}
      />
    );
  }
}


export default DynamicImport;
