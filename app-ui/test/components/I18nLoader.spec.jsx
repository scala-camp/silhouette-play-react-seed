import React from 'react';
import sinon from 'sinon';
import { I18nProvider } from 'lingui-react';
import { shallow, mount } from 'enzyme';
import I18nLoader from 'components/I18nLoader';

describe('(Component) I18nLoader', () => {
  let wrapper;
  let fetchCatalog;
  const language = 'en';
  const messages = {};

  beforeEach(() => {
    fetchCatalog = sinon.spy();
  });

  it('Should render the content', () => {
    wrapper = shallow(
      <I18nLoader language={language} messages={messages} fetchCatalog={fetchCatalog}><div /></I18nLoader>,
    );

    expect(wrapper.contains(
      <I18nProvider language={language} messages={{ [language]: messages }}><div /></I18nProvider>,
    )).to.be.true();
  });

  it('Should fetch the catalog on mount', () => {
    wrapper = mount(
      <I18nLoader language={language} messages={messages} fetchCatalog={fetchCatalog}><div /></I18nLoader>,
    );

    fetchCatalog.should.have.been.calledOnce();
  });

  it('Should fetch the catalog if the language changes', () => {
    wrapper = mount(
      <I18nLoader language={language} messages={messages} fetchCatalog={fetchCatalog}><div /></I18nLoader>,
    );

    wrapper.setProps({ language: 'de' });

    fetchCatalog.should.have.been.calledTwice();
  });

  it('Should not fetch the catalog if the language keeps the same', () => {
    wrapper = mount(
      <I18nLoader language={language} messages={messages} fetchCatalog={fetchCatalog}><div /></I18nLoader>,
    );

    wrapper.setProps({ language: 'en' });

    fetchCatalog.should.have.been.calledOnce();
  });
});
