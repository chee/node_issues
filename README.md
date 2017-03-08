# node_issues

binary available as node_issues

run it from a dir with a node_modules directory

for repos with more dependencies (react apps) you will need to add

```js
github.authenticate({
	type: 'oauth',
	key: ${CLIENT_KEY},
	secret: `${CLIENT_SECRET}
})
```

example output:

```sh
# this repo
~/projects/node_issues 20s
❯ node_issues
you are at the mercy of at least 221 open issues

# my blog
~/projects/snake.blog master* ⇡
❯ node_issues
404 pumbur/hljs
404 ben-eb/postcss-charset
404 TrySound/postcss-charset
you are at the mercy of at least 12525 open issues
```

## todo

* add config so user doesn't have to edit index.js to add credentials
* make the code good
