/**
 * @jest-environment jsdom
 */

import { renderHook, act } from '@testing-library/react-hooks'
import { useLocalStorage } from '../utils/starRepo'

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('should initialize with an empty array', () => {
    const { result } = renderHook(() => useLocalStorage())
    expect(result.current.starredRepos).toEqual([])
  })

  it('should add a repo to the list when starRepo is called', () => {
    const { result } = renderHook(() => useLocalStorage())
    act(() => {
      result.current.starRepo(123)
    })
    expect(result.current.starredRepos).toEqual([{ repoId: 123, star: true }])
  })

  it('should toggle the star value when starRepo is called twice with the same id', () => {
    const { result } = renderHook(() => useLocalStorage())
    act(() => {
      result.current.starRepo(123)
      result.current.starRepo(123)
    })
    expect(result.current.starredRepos).toEqual([{ repoId: 123, star: false }])
  })

  it('should remove a repo from the list when unstarRepo is called', () => {
    const { result } = renderHook(() => useLocalStorage())
    act(() => {
      result.current.starRepo(123)
      result.current.unstarRepo(123)
    })
    expect(result.current.starredRepos).toEqual([])
  })

  it('should persist the starred repos in localStorage', () => {
    window.localStorage.setItem('starredRepos', JSON.stringify([{ repoId: 123, star: true }]))
    const { result } = renderHook(() => useLocalStorage())
    expect(result.current.starredRepos).toEqual([{ repoId: 123, star: true }])
  })

  it('should update localStorage when starredRepos changes', () => {
    const { result } = renderHook(() => useLocalStorage())
    act(() => {
      result.current.starRepo(123)
    })
    expect(JSON.parse(window.localStorage.getItem('starredRepos')!)).toEqual([{ repoId: 123, star: true }])
  })
})