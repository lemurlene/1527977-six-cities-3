import { selectError } from './error.selector';
import { makeFakeStore } from '../../mocks/mocks';
import { NameSpace } from '../const';

describe('error selector', () => {
  it('should return error string from state', () => {
    const fakeState = makeFakeStore({
      [NameSpace.Error]: { error: 'Message' },
    });

    expect(selectError(fakeState)).toBe('Message');
  });

  it('should return null when error is null', () => {
    const fakeState = makeFakeStore({
      [NameSpace.Error]: { error: null },
    });

    expect(selectError(fakeState)).toBeNull();
  });
});
