describe('Tabs', () => {
  it('shows the first tab on page load', () => {
    browser.url('./#tabs');
    const firstTab = browser.$$('li.nav-item')[0];
    expect(firstTab.$('a').getAttribute('class')).to.contain('active');
  });

  it('shows the first tab content on page load', () => {
    const element = browser.$('div.tab-pane > p');
    const isDisplayed = element.isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it('display black header on the first tab', () => {
    const firstTab = browser.$$('li.nav-item')[0];
    const firstLinkInTab = firstTab.$('a');
    expect(firstLinkInTab.getCSSProperty('color').parsed.hex).to.equal(
      '#495057'
    );
  });

  it('the second tab becomes active when click on fancy tab', () => {
    const secondTab = browser.$('a#fancy-tab');
    secondTab.click();
    expect(secondTab.getAttribute('class')).to.contain('active');
  });
});
