https://gist.github.com/alfredringstad/ac0f7a1e081e9ee485e653b6a8351212

Things to do:

- Document how I setup this repo and linked the subtree
- Remove react native branches from the verida-js repo
- (D) Upgrade verida-js lerna to be using yarn, clean up that mess

## Merging from `verida-js`

Switch to the `verida-js` monorepo and create a subtree branch for the current version

```
git subtree split -P packages/client-ts -b subtree/<version>
```

Switch back to this repo and merge:

```
git subtree pull -P client-rn client-ts-source subtree/<version> --squash
```

Switch to `verida-js` and delete the newly created branch

```
git branch -D subtree/<version>
```