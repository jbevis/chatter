# chatter
Chat app

### Setup

```git clone git@github.com:jbevis/chatter.git```
```cd chatter```

This app makes use of the Knex.js and Postgres for data persistence, so you'll need to have knex.js and postgresql intalled locally.

Once this are installed create a new database called chatter and a test database called chatter_test

In your terminal run ```knex migrate:latest``` and ```knex seed:run``` to setup both dbs and add test data.

```yarn install```

scripts:
```start```
```test```

View the application at localhost:3000 in a few tabs to see chat.


### Reflection

I'm not going to lie, my baby is ugly.

It was relatively straitforward to get the basic chat application spun up using express.js and socket.io to handle the messaging.

I chose to go this route, because at heart I'm a JavaScript developer and I'm comfortable using Node.js with express. I have used socket.io in the past and felt it to be the most familiar way to handle the messaging.

I was hoping to get basic CRUD functionality implemented into this as well, but getting the endpoints and database configured proved to be a bit more troublesome and I ran into quite a few errors. I ultimately settled on trying to persist all messagaes to remain on a page refresh and to add new messages to the db.

Overall though, I did find this to be an enjoyable challenge, one that definiteley could have been approached in several ways. I enjoyed the early stages of really trying to pin down how to approach, but again it's inspirational in a way and I hope to circlur back on my own time to try out a couple of different thoughts that I didn't use for this attempt.

### Known Issues:
- Testing is not terribly robust, the routes are tested, but the POST suite is faililng.
- There may be some idiosyncracies with the knex library depending on version, I wasn't able to do deep dive on it. Could also be worth taking a different approach for data persistence
- As such, the data persistence is not working as intented. Next step would be to seed the db with stubbed messages to see if they are coming back and properly rendering to the dom.
- Probably some UI bugs that haven't been fully fleshed out yet.
- CSS is bad, needs a whole lot of love.

### Aspirational Goals:

Obviously this is super beta, and there are a number of basic core funtionality pieces that would have been nice to implement.

As previously mentioned, I would like to implement the ability to edit and delete messages.
Additionally, it would be ideal to add user login/authorization so that people could maintain multiple chats with varying people.

All in all, it would be great to get this more inline with what major chatting apps/platforms offer.

I also really wanted to try to do this using GraphQL, but with time I opted to go with a more traditioanl REST structure. I think GraphQL would be ideal if this were to continue to grow as additional pieces or data are associated to each user, or conversation/channel it would be great to set up specific queries for the variety of scenarios likely to be encountered.

