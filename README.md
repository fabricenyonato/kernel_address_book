# Kernel Address Book

## Setup

```bash
# start containers
$ docker-compose up

# get nodejs container ip, set nodejs container ip to baseUrl variable in /kernel-address-book-frontend/plugins/api.js
$ docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' kernel_address_book_nodejs_1
```

Go to http://localhost:4000/
