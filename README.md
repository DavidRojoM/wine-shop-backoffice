### TODO

1. - [ ] Add pagination.
2. - [ ] Add seeker
3. - [x] Find out why it is not possible to send same event twice in a row
4. - [ ] Find out why text-overflow: ellipsis won't work in card headers.

### SET-UP

1. Run a mongodb container using `run -d -p 27017:27017 -v <local_directory_path>:/data/db --name wines-mongo mongo:latest`
2. Clone, install dependencies and run using `npm run dev` https://github.com/DavidRojoM/wine-shop-back
3. Serve this project `ng serve -o`
