
import React from 'react';
import classNames from 'classnames';
import {Button, Icon, Image, Label} from 'semantic-ui-react';
import { CategoryModel } from 'shared/model';


interface CubeProps {
  title: string | React.ReactNode,
  cubeType: string,
  learningTime?: string,
  learningState?: string,
  learningPer?: string,
}

export const Cube = ({title, cubeType, learningTime, learningState, learningPer}: CubeProps) => (
  <>
    <div className="tit">
      <span className="ellipsis">{title}</span>
    </div>
    <div className="right">
      <span>{cubeType}</span>
    </div>
  </>
);

