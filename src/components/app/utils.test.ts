import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { useAppSelector } from '../../hooks';
import IsAppLoading from './utils';
import { AuthorizationStatus } from '../../const/enum';

vi.mock('../../hooks', () => ({
  useAppSelector: vi.fn(),
}));

describe('IsAppLoading', () => {
  const mockUseAppSelector = useAppSelector as Mock;

  it('returns true when offers are loading', () => {
    mockUseAppSelector
      .mockReturnValueOnce(AuthorizationStatus.Auth)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false);

    const { result } = renderHook(() => IsAppLoading());
    expect(result.current).toBe(true);
  });

  it('returns true when favorite offers are loading', () => {
    mockUseAppSelector
      .mockReturnValueOnce(AuthorizationStatus.Auth)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    const { result } = renderHook(() => IsAppLoading());
    expect(result.current).toBe(true);
  });

  it('returns true when logout is loading', () => {
    mockUseAppSelector
      .mockReturnValueOnce(AuthorizationStatus.Auth)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);

    const { result } = renderHook(() => IsAppLoading());
    expect(result.current).toBe(true);
  });

  it('returns true when authorization status is unknown', () => {
    mockUseAppSelector
      .mockReturnValueOnce(AuthorizationStatus.Unknown)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false);

    const { result } = renderHook(() => IsAppLoading());
    expect(result.current).toBe(true);
  });

  it('returns false when nothing is loading', () => {
    mockUseAppSelector
      .mockReturnValueOnce(AuthorizationStatus.Auth)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false);

    const { result } = renderHook(() => IsAppLoading());
    expect(result.current).toBe(false);
  });
});
