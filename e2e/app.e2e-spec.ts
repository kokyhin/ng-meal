import { NgMealPage } from './app.po';

describe('ng-meal App', () => {
  let page: NgMealPage;

  beforeEach(() => {
    page = new NgMealPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
