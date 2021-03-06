const mongoose = require("mongoose");
const log = require('./logger');
const fs = require('fs');

const username = 'admin';
//const passwordOld = process.env.MONGODB_PW || '';
databaseName = 'ChefmateDB'
//databaseName = 'ChefmateDB_Alt';
const host = '18.219.145.177'; //NEW DB
//host = 'localhost'
//host = '18.222.251.5' //OLD DB
const port = 27017;
var password = ' '

fs.readFile('../../Chefmate_auth/pw.txt', "utf8", (err, data) => {
  if(err) {
    console.log("Error getting Mongo password. Make sure Chefmate_auth/pw.txt exists and is populated.");
  } else {
    //Do *NOT* hardcode password, ever
    password = data

    const mongoUri = 'mongodb://' + username + ":" + password.replace(/\n$/, "") + "@" + host + ":" + port + "/" + databaseName;

    mongoose
      .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: databaseName })
      .then(() => {
        log('info', "Connected to database");
      })
      .catch(err => {
        log('error', "Error: Not connected to database.");
    });
  }
});

const CrawlerSchema = new mongoose.Schema(
  {
    _id: { type: String, required: [true, "URL is required "] },
    title: { type: String, required: [true, "Web Page title is required"] },
    body: { type: String, required: [true, "Body of web page is required"] },
    description: { type: String, required: [true, "Description is required."]},
    hub: { type: Number, required: [true, "Hub is required"], default: 1 },
    authority: {
      type: Number,
      required: [true, "Authority is required"],
      default: 1
    },
    pageRank: { type: Number, required: [true, "PageRank is required"], default: 1 },
    tfidf: {
      type: {}, 
      required: [true, 'Initial TFIDF is required. Default is {}'], 
      default: {}
    }
  },
  { timestamps: true }
);
mongoose.model("Crawler", CrawlerSchema);
const Crawler = mongoose.model("Crawler");

const UserSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: [true, "Identifier is required for user"],
    },
    password: {
      type: String,
      // required: [true, "Password is required. Make sure it is hashed."]
    },
    likes: {
      type: {},
      required: [true, "Likes are required. Resort to default {}"],
      default: {}
    },
    dislikes: {
      type: {},
      required: [true, "Dislikes are required. Resort to default {}"],
      default: {}
    },
    history: {
      type: [String],
      required: [true, "History required. Resort to default {}"],
      default: []
    },
    recent_queries: {
      type: [String],
      required: [true, "Recent Queries required. Resort to default {}"],
      default: []
    }
  },
  { timestamps: true }
);
mongoose.model("User", UserSchema);
const User = mongoose.model("User");

const InvertedIndexSchema = new mongoose.Schema(
  {
    term: {
      type: String,
      required: [true, "Term is required for InvertedIndex table"]
    },
    doc_info: {
      type: [{ url: String, termCount: Number, pos: [Number] }],
      required: [
        true,
        "Doc Info is required, resort to default [] if needed. {}"
      ],
      default: []
    },
    idf: {
      type: Number,
      default: 1,
      required: [true, "IDF is required, resort to default (1) if needed."]
    },
  },
  { timestamps: true }
);
mongoose.model("InvertedIndex", InvertedIndexSchema);
const InvertedIndex = mongoose.model("InvertedIndex");

const QuerySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Query is required for Query object."],
    },
    count: {
      type: Number,
      required: [
        true, "Count is required for query term. Default is 1"
      ],
      default: 1
    }
  }, 
  { timestamps: true }
);
mongoose.model("Query", QuerySchema);
const Query = mongoose.model("Query")

module.exports = { mongoose, Crawler, User, InvertedIndex, Query };
