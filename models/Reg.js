//our first model registration 
var mongoose=require('mongoose');
 //creatling our schema to be parsed into our model
var RegisterSchema=mongoose.Schema({
email:{required:true,type:String },
contact:{required:true,type:String },
password:{required:true,type:String },
residence:{required:true,type:String }
});
//create mongoose model and make public by using module.exports
var User=module.exports=mongoose.model("User",RegisterSchema);

