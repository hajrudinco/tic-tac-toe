import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Board from './Board';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Board />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('sets X value in the first field', () => {
  const wrapper = shallow(<Board />);
  const spy = jest.spyOn(wrapper.instance(), 'setBoardValue');

  wrapper.find('.Board-cell').at(0).simulate('click');

  expect(wrapper.find('.Board-cell').at(0).text()).toEqual('X');
  expect(spy).toHaveBeenCalled();
});

it('ignores new value if value is already set', () => {
  const wrapper = shallow(<Board />);
  wrapper.find('.Board-cell').at(0).simulate('click');

  expect(wrapper.find('.Board-cell').at(0).text()).toEqual('X');
  expect(wrapper.state('player')).toEqual('O');

  wrapper.find('.Board-cell').at(0).simulate('click');
  expect(wrapper.find('.Board-cell').at(0).text()).toEqual('X');
});

it('sets winIndices after X wins', () => {
  const wrapper = mount(<Board />);
  wrapper.find('.Board-cell').at(0).simulate('click'); // X
  wrapper.find('.Board-cell').at(1).simulate('click'); // O
  wrapper.find('.Board-cell').at(3).simulate('click'); // X
  wrapper.find('.Board-cell').at(2).simulate('click'); // O
  wrapper.find('.Board-cell').at(6).simulate('click'); // X

  expect(wrapper.find('.Board-cell.Board-cell--winner').length).toEqual(3);
  expect(wrapper.state('winIndices')).toEqual([0, 3, 6]);
});

it('resets board on new game index', () => {
  const wrapper = shallow(<Board gameNumber={0} />);
  const spy = jest.spyOn(wrapper.instance(), 'createNewBoard');
  wrapper.setProps({ gameNumber: 0 });
  expect(spy).toHaveBeenCalledTimes(0);

  wrapper.find('.Board-cell').at(0).simulate('click');
  expect(wrapper.find('.Board-cell').at(0).text()).toEqual('X');

  wrapper.setProps({ gameNumber: 1 });

  expect(spy).toHaveBeenCalledTimes(1);
  expect(wrapper.find('.Board-cell').at(0).text()).toEqual('');
  expect(wrapper.state('winIndices')).toEqual(null);
  expect(wrapper.state('board')).toEqual([ null, null, null, null, null, null, null, null, null ]);
});
