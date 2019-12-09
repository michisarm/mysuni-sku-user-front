
import React, { Component } from 'react';
import { reactAutobind } from '@nara.platform/accent';
import {
  Icon,
  Button,
} from 'semantic-ui-react';


interface Props {
}

interface State {
  active: boolean,
}

@reactAutobind
class QuickNav extends Component<Props, State> {
  //
  state = {
    active: false,
  };

  handleClick() {
    //
    this.setState((prevState) => ({
      active: !prevState.active,
    }));
  }

  render() {
    const { active } = this.state;

    return (
      <section className="quick">
        <div className="cont-inner">
          <div className="q-group">
            <a href="#top" className="ui top button">TOP</a>
            <Button className="quick" active={active} onClick={this.handleClick} />

            <div className="quick-menu">
              <Button.Group className="quick-black horizontal">
                <Button icon>
                  <Icon className="learning32" />
                  <Icon className="new16" />
                  <span className="blind">new</span>Learning
                </Button>
                <Button icon>
                  <Icon className="community32" />
                  <Icon className="new16" />
                  <span className="blind">new</span>Community
                </Button>
                <Button icon>
                  <Icon className="support32" />
                  <Icon className="new16" />
                  <span className="blind">new</span>Support
                </Button>
              </Button.Group>

              <Button.Group className="quick-black" vertical>
                <Button>
                  <Icon name="building" />SK University Introduction
                </Button>
                <Button>
                  <Icon name="sitemap" />Site Map
                </Button>
                <Button>
                  <Icon name="search" />Search
                </Button>
                <Button>
                  <Icon className="admin" />SK University Admin Site
                </Button>
              </Button.Group>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default QuickNav;
