# Real-time Bidding Platform API

## Setup

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Configure your `.env` file.
4. Start the server with `npm start`.

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new user.
- `POST /auth/login` - Authenticate a user and return a token.
- `GET /auth/profile` - Get Profile Details.

### Items

- `GET /items` - Retrieve all auction items.
- `GET /items/:id` - Retrieve a single auction item by ID.
- `POST /items/createItem` - Create a new auction item. (Authenticated users)
- `POST /items/search` - Search for a auction item. (Authenticated users)
- `PUT /items/updateItem/:id` - Update an auction item. (Authenticated users)
- `DELETE /items/deleteItem/:id` - Delete an auction item. (Authenticated users)

### Bids

- `POST /bid/:itemId` - Create a new bid. (Authenticated users)
- `GET /bid/:itemId` - Get all bids for an item. (Authenticated users)

### Notifications

- `GET /notification` - Get all notifications. (Authenticated users)
- `POST /notification/markAsRead` - Mark notifications as read. (Authenticated users)
