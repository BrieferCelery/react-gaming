import React from 'react'
import ReactDOM from 'react-dom'
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import App from './App'
import CookieBar from './CookieBar'
import Auth from './Auth'
import Navbar from './Navbar';
import Search from './Search';

Enzyme.configure({ adapter: new EnzymeAdapter() });

test('Renders App', () => {
    const wrapper = shallow(<App />);
    console.log(wrapper.debug());
});

it('renders App without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders CookieBar without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CookieBar />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders Auth without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Auth />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders Navbar without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Navbar />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders Search without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Search />, div)
  ReactDOM.unmountComponentAtNode(div)
})

