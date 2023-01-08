
# Developer notes

## Configuration

This repo is a fork of `@verida/client-ts`. It uses git subtree's to merge the latest changes as required (see below).

This was inspired from https://gist.github.com/alfredringstad/ac0f7a1e081e9ee485e653b6a8351212

## Merging from `verida-js`

Switch to the `verida-js` monorepo and create a subtree branch for the current version

```
git subtree split -P packages/client-ts -b subtree/<version>
```

Switch back to this repo and merge:

```
git subtree pull -P client-rn client-ts-source subtree/<version> --squash
```

Update all dependencies to the latest versions (assuming there's been a new protocol release):

```
yarn remove @verida/xxx
yarn add @verida/xxx
```

Switch to `verida-js` and delete the newly created branch

```
git branch -D subtree/<version>
```

# Creating a release

```
yarn publish --tag next
```

Use the tag `next` for an upcoming releaes (ie: RC) and `latest` for the latest release