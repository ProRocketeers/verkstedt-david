/**
 * @jest-environment jsdom
 */

import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../utils/starRepo";

describe("localStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should initialize with an empty array", () => {
    const { result } = renderHook(() => useLocalStorage());
    expect(result.current.starredRepos).toEqual([]);
  });

  it("should add a repo to the list when starRepo is called", () => {
    const { result } = renderHook(() => useLocalStorage());
    act(() => {
      result.current.starRepo(123);
    });
    expect(result.current.starredRepos).toEqual([{ repoId: 123, star: true }]);
  });

  it("should remove a repo from the list when unstarRepo is called", () => {
    const { result } = renderHook(() => useLocalStorage());
    act(() => {
      result.current.starRepo(123);
      result.current.unstarRepo(123);
    });
    expect(result.current.starredRepos).toEqual([]);
  });

  it("should persist the starred repos in localStorage", () => {
    localStorage.setItem(
      "starredRepos",
      JSON.stringify([{ repoId: 123, star: true }])
    );
    const { result } = renderHook(() => useLocalStorage());
    expect(result.current.starredRepos).toEqual([{ repoId: 123, star: true }]);
  });

  it("should update localStorage when starredRepos changes", () => {
    const { result } = renderHook(() => useLocalStorage());
    act(() => {
      result.current.starRepo(123);
    });
    expect(JSON.parse(localStorage.getItem("starredRepos")!)).toEqual([
      { repoId: 123, star: true },
    ]);
  });
});
