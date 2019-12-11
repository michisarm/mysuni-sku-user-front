import React, { ComponentType } from 'react';

interface State {
  component: ComponentType | null
}

const withSplitting = (getComponent: Function) => {

  class WithSplitting extends React.Component<{}, State> {

    constructor(props: any) {
      super(props);

      this.state = {
        component: null,
      };
    }

    componentDidMount() {
      getComponent().then((component: any) => {
        if (component.ContentHeader) {
          this.setState({ component: component.ContentHeader });
        }
        else {
          this.setState({ component });
        }
      });
    }

    render() {

      const { component: ImportComponent } = this.state;

      if (!ImportComponent) return null;

      return (
        <ImportComponent
          {...this.props}
        />
      );
    }
  }

  return WithSplitting;
};

export default withSplitting;
