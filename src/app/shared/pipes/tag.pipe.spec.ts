import { TagPipe } from './tag.pipe';

xdescribe('TagPipe', () => {
  it('create an instance', () => {
    const pipe = new TagPipe();
    expect(pipe).toBeTruthy();
  });
});
