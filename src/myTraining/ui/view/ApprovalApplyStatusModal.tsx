import React, {Component} from 'react';
import { Modal, Button, Select, Icon, Table } from 'semantic-ui-react';

const classOptions = [
  { key: 'val01', value: 'val01', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?AI와 Block chain과의 상관관계는 어떻게 되는가?' },
  { key: 'val02', value: 'val02', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?' },
  { key: 'val03', value: 'val03', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?' },
  { key: 'val04', value: 'val04', text: 'AI와 Block chain과의 상관관계는 어떻게 되는가?' }
];

class ApplyStatusModal extends Component {

  state = { open : false };

  handleOpen = () => this.setState({ open : true });

  close = () => this.setState( { open : false });

  render(){

    const { open } = this.state;

    return(
      <Modal
        trigger={<Button icon className="left post status" onClick={this.handleOpen}><Icon className="list24" /> 신청현황</Button>}
        open={open}
        className="base w700"
      >
        <Modal.Header className="res size2">신청현황</Modal.Header>
        <Modal.Content className="my-03-01-p03">
          <div className="sel_wrap">
            <span className="class-name">과정명</span>
            <Select
              className="small-border dropdown selection list-title-sel"
              defaultValue={classOptions[1].value}
              options={classOptions}
            />
            <Button icon className="clear">
              <Icon className="reset" />
            </Button>
          </div>
          <div className="scrolling-457px">
            <div className="table-wrap">
              {/*목록*/}
              <Table celled className="head-fix my-03-01-p03 border-color2">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>차수</Table.HeaderCell>
                    <Table.HeaderCell>정원정보(승인/정원)</Table.HeaderCell>
                    <Table.HeaderCell>시작일 및 종료일</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>1</Table.Cell>
                    <Table.Cell>00/00</Table.Cell>
                    <Table.Cell>2020.01.01 ~ 2020.02.01</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>2</Table.Cell>
                    <Table.Cell>00/00</Table.Cell>
                    <Table.Cell>2020.01.01 ~ 2020.02.01</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>3</Table.Cell>
                    <Table.Cell>00/00</Table.Cell>
                    <Table.Cell>2020.01.01 ~ 2020.02.01</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>4</Table.Cell>
                    <Table.Cell>00/00</Table.Cell>
                    <Table.Cell>2020.01.01 ~ 2020.02.01</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>5</Table.Cell>
                    <Table.Cell>00/00</Table.Cell>
                    <Table.Cell>2020.01.01 ~ 2020.02.01</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>6</Table.Cell>
                    <Table.Cell>00/00</Table.Cell>
                    <Table.Cell>2020.01.01 ~ 2020.02.01</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>7</Table.Cell>
                    <Table.Cell>00/00</Table.Cell>
                    <Table.Cell>2020.01.01 ~ 2020.02.01</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>8</Table.Cell>
                    <Table.Cell>00/00</Table.Cell>
                    <Table.Cell>2020.01.01 ~ 2020.02.01</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>9</Table.Cell>
                    <Table.Cell>00/00</Table.Cell>
                    <Table.Cell>2020.01.01 ~ 2020.02.01</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>10</Table.Cell>
                    <Table.Cell>00/00</Table.Cell>
                    <Table.Cell>2020.01.01 ~ 2020.02.01</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>11</Table.Cell>
                    <Table.Cell>00/00</Table.Cell>
                    <Table.Cell>2020.01.01 ~ 2020.02.01</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>12</Table.Cell>
                    <Table.Cell>00/00</Table.Cell>
                    <Table.Cell>2020.01.01 ~ 2020.02.01</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>13</Table.Cell>
                    <Table.Cell>00/00</Table.Cell>
                    <Table.Cell>2020.01.01 ~ 2020.02.01</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>14</Table.Cell>
                    <Table.Cell>00/00</Table.Cell>
                    <Table.Cell>2020.01.01 ~ 2020.02.01</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>15</Table.Cell>
                    <Table.Cell>00/00</Table.Cell>
                    <Table.Cell>2020.01.01 ~ 2020.02.01</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions className="actions2">
          <Button className="pop2 p" onClick={this.close}>OK</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
export default ApplyStatusModal;
