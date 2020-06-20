describe('Google page', () => {
  it('should have the right title', () => {
    browser.url('https://google.com');
    const title = browser.getTitle();
    expect(title).to.equal('Googl');
  });
});
