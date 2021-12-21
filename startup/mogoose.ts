const mongoose = require("mongoose");
// mongoose.connect('mongodb://127.0.0.1:27017/Asume',{
//     useNewUrlParser:true
// })

mongoose.connect(
  "mongodb://admin:Rap8s_H-uLZ_T5c0@ec2-3-250-125-101.eu-west-1.compute.amazonaws.com:27017/Amuse?authSource=admin",
  {
    useNewUrlParser: true,
  }
);

export default mongoose;
