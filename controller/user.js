const Post = require("../module/PostModule");
const User = require("../module/UserModule");
const bcrypt = require("bcryptjs");
const Order = require("../module/OrderModule")

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.log(error);
    }
}

exports.newPost = async (req, res) => {
    try {
        await Post.create(req.body);
        res.json({ messageSUC: "محصول جدید شما با موفقیت ثبت شد" });
    } catch (error) {
        console.log(error);
    }
}

exports.getUser = async (req, res) => {
    try {
        res.json(await User.find());
    } catch (error) {
        console.log(error);
    }
}

exports.newUser = async (req, res) => {
    console.log(req.body);
    const { email, fullname, password } = req.body;
    try {
        const userValid = await User.findOne({ email });
        if (userValid) {
            res.json({ message: "کاربری با این مشخصات موجود است" })
        }
        const hash = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            password: hash
        });
        res.json({ messageSUC: "با موفقیت به خانواده ما پیوستید!" })
        console.log(req.body);
    } catch (error) {
        console.log(error);
    }
}

exports.login = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.json({ message: "کاربری با این ایمیل یافت نشد" });
            return;
        }
        const isEqual = await bcrypt.compare(password, user.password)
        if (isEqual) {
            res.json(user)
        } else {
            res.json({ message: "گذرواژه یا نام کاربری اشتباه است" })
        }
    } catch (error) {
        console.log(error);
    }
}

exports.buyProducts = async (req, res) => {
    console.log(req.body);
    const { id, product } = req.body;
    try {
        const user = await User.findById({ _id: id });
        user.buys.push(product);
        user.save()
        console.log(user);
    } catch (error) {
        console.log(error);
    }
}

exports.deleteProducs = async (req, res) => {

    const { id } = req.body;

    try {
        await Post.deleteOne({ _id: id });
        res.json({ messageSUC: "محصول مورد نظر شما با موفقیت خذف شد" })
    } catch (error) {
        console.log(error);
    }
}

exports.getSinglePost = async (req, res) => {
    const { id } = req.body;
    try {
        res.json(await Post.findOne({ _id: id }));
    } catch (error) {
        console.log(error);
    }
}

exports.updatePost = async (req, res) => {
    const {id} = req.body;
    try {
        const post = await Post.updateOne(
            { _id: req.body.id },
            { $set: req.body }
          );
        res.json({ messageSUC: "محصول مورد نظر شما با موفقیت بروز شد" })
        console.log(post);
    } catch (error) {
        console.log(error);
    }
}

exports.getOrders = async (req, res) => {
    try {
        res.json(await Order.find());
    } catch (error) {
        console.log(error);
    }
}

exports.setOrders = async (req, res) => {
    console.log(req.body);
    const {userId} = req.body;
    try {
        const user = await User.findOne({_id: userId})
        // console.log(user);
        await Order.create(req.body);
        user.buys = []
        user.save();
        res.json({ messageSUC: "سفارش شما ثبت شد. کارشناسان ما در سریع ترین زمان ممکن با شما تماس میگیرند" });
    } catch (error) {
        console.log(error);
    }
}

exports.deleteOrder = async (req, res) => {
    const {userId, orderId} = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({_id: userId});
      const upUser = user.buys.filter(item => item != orderId)
      user.buys = upUser;
       user.save()
        console.log(user.buys);
    } catch (error) {
        
    }
}

exports.deleteOrderInDasgboard = async (req, res) => {
    console.log(req.body);
    const {id} = req.body
    try {
    const orders = await Order.findOne({products: id});
    console.log(orders);
    // console.log(orders.map(item => item.products));
    // const order = orders.map(item => item.products)
    //     order.filter(item => item != req.body.id)
    //     orders.save()
    } catch (error) {
        console.log(error);
    }
}