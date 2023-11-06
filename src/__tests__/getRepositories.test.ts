/**
 * @jest-environment jsdom
 */

import getRepositories from "../api/getRepositories";
import { Repository } from "../types/";

describe("getRepositories", () => {
  it("should return an array of repositories", async () => {
    const repositories = await getRepositories();
    expect(Array.isArray(repositories)).toBe(true);
  });

  it("should return repositories sorted by stars in descending order", async () => {
    const repositories = await getRepositories();
    const sortedRepositories = [...repositories].sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    );
    expect(repositories).toEqual(sortedRepositories);
  });

  it("should return repositories created after 2017-01-10", async () => {
    const repositories = await getRepositories();
    const createdAfterDate = new Date("2017-01-10T00:00:00Z");
    const filteredRepositories = repositories.filter(
      (repo: Repository) => new Date(repo.created_at) >= createdAfterDate
    );
    expect(repositories).toEqual(filteredRepositories);
  });
});
