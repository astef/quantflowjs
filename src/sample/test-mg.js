import mongo from "mongodb";

const { MongoClient } = mongo;

const uri =
  "mongodb+srv://astef:vrOHUvgVpgqYIwwq@cluster0.30tip.mongodb.net/sample_weatherdata?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("sample_weatherdata").collection("data");
  // perform actions on the collection object

  collection.findOne(
    (a) => {
      return true;
    },
    (r) => {
      console.log(r);
    }
  );

  // client.close();
});
