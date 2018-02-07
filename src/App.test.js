import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('creates new game', () => {
  const wrapper = shallow(<App />);
  const spy = jest.spyOn(wrapper.instance(), 'renderBoard');

  wrapper.find('button').simulate('click');

  expect(wrapper.state('gameNumber')).toEqual(1);
  expect(spy).toHaveBeenCalled();
});
