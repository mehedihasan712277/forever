const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const TelegramBot = require('node-telegram-bot-api');
const app = express();
const port = process.env.PORT || 5000;
const botToken = '7141000153:AAE4m02ifie3d2EQtzGrjuEaYw0EexDRQfw';
const chatId = '-4171732298';
//middleware
app.use(cors());
app.use(express.json());

// -4171732298
// 7141000153:AAE4m02ifie3d2EQtzGrjuEaYw0EexDRQfw


const bot = new TelegramBot(botToken);


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i0wokhn.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // await client.connect();
        const database = client.db("foreverDB").collection("product");
        const database2 = client.db("foreverDB").collection("cart");
        const database3 = client.db("foreverDB").collection("order");
        const database4 = client.db("foreverDB").collection("address");
        const database5 = client.db("foreverDB").collection("banner");
        const database6 = client.db("foreverDB").collection("blog");

        app.get("/", (req, res) => {
            res.send("server is running ok")
        })
        app.get("/products", async (req, res) => {
            const result = await database.find().toArray();
            res.send(result);
        })
        app.get("/products/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await database.findOne(filter);
            res.send(result);
        })

        //cart ---------------------------------------------------
        app.post("/products", async (req, res) => {
            const data = req.body;
            const result = await database2.insertOne(data);
            res.send(result);
        })
        app.get("/cart", async (req, res) => {
            const query = req.query.uid;
            const filter = { userId: query };
            const data = database2.find(filter);
            const result = await data.toArray();
            res.send(result);
        })
        app.get("/all_cart", async (req, res) => {
            const data = database2.find();
            const result = await data.toArray();
            res.send(result);
        })
        app.get("/cartL/:id", async (req, res) => {
            const id = req.params.id;
            const query = { userId: id }
            const data = database2.find(query);
            const result = await data.toArray();
            res.send(result);
        })

        app.delete("/cart/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await database2.deleteOne(filter);
            res.send(result);
        })

        app.put("/cart/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const data = req.body;
            const options = { upsert: true };
            const updatedData = {
                $set: {
                    quantity: data.quantity
                }
            }
            const result = await database2.updateOne(filter, updatedData, options);
            res.send(result);
        })
        //profile------------------------------------------------
        app.post("/userAddress", async (req, res) => {
            const data = req.body;
            const result = await database4.insertOne(data);
            res.send(result);
        })
        app.get("/userAddress/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { userId: id }
            const result = await database4.findOne(filter);
            res.send(result);
        })
        app.put("/userAddress/:id", async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { userId: id };
            const options = { upsert: true };
            const updatedData = {
                $set: {
                    userId: data.userId,
                    house: data.house,
                    policeStation: data.policeStation,
                    district: data.district,
                    division: data.division,
                    phone: data.phone
                }
            }
            const result = await database4.updateOne(filter, updatedData, options);
            res.send(result);
        })
        //order---------------------------------------------------
        app.post("/order", async (req, res) => {
            const data = req.body;
            const options = { ordered: true };
            const result = await database3.insertMany(data, options)
            res.send(result);
            const message = `New order received for ${data.length} product(s)\n${data.map(ele => `${ele.productName}`).join("\n")}`;
            await bot.sendMessage(chatId, message);
        })
        app.get("/order", async (req, res) => {
            const query = req.query.uid;
            const filter = { userId: query };
            const data = database3.find(filter);
            const result = await data.toArray();
            res.send(result);
        })
        app.get("/order/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await database3.findOne(filter);
            res.send(result);
        })
        app.get("/orders/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { tuid: id };
            const cursor = database3.find(filter);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.delete(`/order/:id`, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await database3.deleteOne(filter);
            res.send(result);
        })


        // control panel------------------------------------------------------------------------------------
        app.post("/control", async (req, res) => {
            const data = req.body;
            const result = await database.insertOne(data)
            res.send(result);
        })
        app.delete("/control/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await database.deleteOne(filter);
            res.send(result);
        })
        app.put("/control/:id", async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedData = {
                $set: {
                    productName: data.productName,
                    regularPrice: data.regularPrice,
                    reducedPrice: data.reducedPrice,
                    img1: data.img1,
                    img2: data.img2,
                    img3: data.img3,
                    img4: data.img4,
                    description: data.description,
                    sold: data.sold,
                    category: data.category
                }
            }
            const result = await database.updateOne(filter, updatedData, options);
            res.send(result);
        })
        app.put("/control_status/:id", async (req, res) => {
            const data = req.body;
            const id = req.params.id;
            const filter = { tuid: id };
            const updatedData = {
                $set: {
                    status: data.status
                }
            }
            const result = await database3.updateMany(filter, updatedData);
            res.send(result);

        })
        app.put("/banner", async (req, res) => {
            const data = req.body;
            const filter = { name: "link" };
            const options = { upsert: true };
            const updatedData = {
                $set: {
                    links: data.links
                }
            }
            const result = await database5.updateOne(filter, updatedData, options);
            res.send(result);
        })
        app.get("/banner", async (req, res) => {
            const result = await database5.find().toArray();
            res.send(result);
        })
        app.get("/control_cart", async (req, res) => {
            const result = await database2.find().toArray();
            res.send(result);
        })
        app.get("/control_order", async (req, res) => {
            const result = await database3.find().toArray();
            res.send(result);
        })
        //blog-----------------------------------------------------------------------------------------------
        app.post("/blog", async (req, res) => {
            const data = req.body;
            const result = await database6.insertOne(data)
            res.send(result);
        })
        app.get("/blog", async (req, res) => {
            const result = await database6.find().toArray();
            res.send(result);
        })
        app.get("/blog/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const result = await database6.findOne(filter);
            res.send(result);
        })
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`the app is running on port ${port}`);
})