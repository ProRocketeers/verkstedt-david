import { useEffect, useState } from 'react'

export type StarredRepoStorageType = { repoId: number; star: boolean }[]

export const getStarredRepos = (): StarredRepoStorageType => {
  const starredRepos = JSON.parse(localStorage.getItem('starredRepos') || '[]')
  return starredRepos
}

const saveStarredRepos = (starredRepos: StarredRepoStorageType) => {
  localStorage.setItem('starredRepos', JSON.stringify(starredRepos))
}

export const useLocalStorage = () => {
  const [starredRepos, setStarredRepos] = useState<StarredRepoStorageType>(
    getStarredRepos(),
  )

  useEffect (() => {
    saveStarredRepos (starredRepos)
  }, [starredRepos])

  const starRepo = (id: number) => {
    const repoExists = starredRepos.find((repo) => repo.repoId === id)

    if (repoExists) {
     setStarredRepos(
      starredRepos.map( (repo) =>
        repo.repoId === id ? { ...repo, star: !repo.star } : repo,
      ),
     )
    } else {
      setStarredRepos([... starredRepos, { repoId: id, star: true }])
    }
  }

  const unstarRepo = (id: number) => {
    setStarredRepos(
      starredRepos.filter((repo) => repo.repoId !== id),
    )
  }
  
  return { starredRepos, starRepo, unstarRepo }
}