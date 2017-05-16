#!/usr/bin/env node
const GitHub = require('github')
const github = new GitHub()
const glob = require('glob')

const files = new Promise((resolve, reject) => (
  glob('node_modules/**/package.json', (error, files) => (
      error ? reject(error) : resolve(files)
  ))
))

const repos = files => files.map(file => require(`${process.cwd()}/${file}`).repository)

const urls = repos => repos.map(repo => typeof repo === 'object' ? repo.url : repo)

const githubs = urls => urls.map(url => {
  if (!url) return
  let match
  if (url.includes('://') || url.startsWith('git@')) {
    match = url.match(/github\.com.([^/]+)\/([^/]+)/)
  } else {
    match = url.match(/([^/]+)\/([^/]+)/)
  }
  if (!match) return null
  const [, owner, repo] = match
  return {owner, repo: repo.replace(/\.git$/, '')}
}).filter(Boolean)

const uniquify = githubs => (
  githubs.filter((github, index) => (
    githubs.findIndex(({owner, repo}) => (
      github.owner === owner && github.repo === repo
    )) === index
  ))
)

const issues = ({owner, repo}) => github
  .repos
  .get({owner, repo})
  .then(({data: {open_issues_count: issues}}) => issues)
  .catch(error => console.error(`${error.code} ${owner}/${repo}`))

const sum = numbers => numbers.reduce((previous, current) => (
  (previous | 0) + (current | 0)
))

files
  .then(repos)
  .then(urls)
  .then(githubs)
  .then(uniquify)
  .then(githubs => Promise.all(githubs.map(issues)))
  .then(sum)
  .then(sum => console.log(`you are at the mercy of at least ${sum} open issues`))
