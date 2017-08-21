//our first model registration 
var mongoose=require('mongoose');
 //creatling our schema to be parsed into our model
var PaymentSchema=mongoose.Schema({
accountnumber:{required:true,type:String },
amount:{required:true,type:String },
month:{required:true,type:String },
day:{required:true,type:String },
email:{required:true,type:String },

});
//create mongoose model and make public by using module.exports
var User=module.exports=mongoose.model("Payment",PaymentSchema);

