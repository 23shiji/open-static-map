publish:
	git add .
	git commit -m autosave
	git push origin master
	git checkout -b static
	yarn build
	git add .
	git commit -m 'auto build'
	git push origin static
	git checkout master
	rm -rf dist