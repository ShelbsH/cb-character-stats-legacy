import React from 'react';
import { shallow } from 'enzyme';
import { Main } from '../components/main';

describe('Main component', () => {
  const component = shallow(<Main message="TypeScript" />);

  it('should render the `Main` component', () => {
    expect(component.find('.app-root').length).toEqual(1);
  });

  describe('when the `Main` component is rendered', () => {
    it('should have the message props value displayed', () => {
      expect(component.find('span').text()).toEqual('TypeScript');
    });
  });
});
