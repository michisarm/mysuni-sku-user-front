import React, { Component } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';

class FavoriteChannelView extends Component {
  render() {
    return (
      <div className="channel-of-interest">
        <div className="table-css type2">
          <div className="row">
            <div className="cell vtop">
              <div className="tit-set">관심 channel(32)
                <Button icon className="img-icon"><Icon className="setting17" />
                  <span className="blind">setting</span>
                </Button>
              </div>
            </div>
            <div className="cell vtop">
              <div className="item-wrap">{/*  skProfile.favoriteChannel : IdNameList  */}
                <div className="belt">
                  <Label className="channel">AI</Label>
                  <Label className="channel">Design</Label>
                  <Label className="channel">Database</Label>
                  <Label className="channel">Project Managing</Label>
                  <Label className="channel">디자인 방법론</Label>
                  <Label className="channel">Engineering</Label>
                  <Label className="channel">Production Data Analysis</Label>
                  <Label className="channel">DT Basics</Label>
                  <Label className="channel">Value</Label>
                  <Label className="channel">Mindfulness</Label>
                  <Label className="channel">AI</Label>
                  <Label className="channel">Design</Label>
                  <Label className="channel">Database</Label>
                  <Label className="channel">Project Managing</Label>
                  <Label className="channel">디자인 방법론</Label>
                  <Label className="channel">Engineering</Label>
                  <Label className="channel">Production Data Analysis</Label>
                  <Label className="channel">DT Basics</Label>
                  <Label className="channel">Value</Label>
                  <Label className="channel">Mindfulness</Label>
                </div>
              </div>
            </div>
            <div className="cell vtop">
              <div className="toggle-btn">{/*  .active // */}
                <Button icon className="img-icon"><Icon className="sum-open" />
                  <span className="blind"> open </span>
                </Button>
                <Button icon className="img-icon"><Icon className="sum-close" />
                  <span className="blind">close </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FavoriteChannelView;
