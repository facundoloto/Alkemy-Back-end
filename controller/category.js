let Querys=require("../database/querys.js")
exports.createCategory=async(req,res)=>{
    //function to create a new category
    try {
        console.log("category send")
    const get=await Querys.records(`select*from category where category='${req.body.name}'`)
    if(get.length<=0){
    let sql=`INSERT INTO category (category) VALUES ("${req.body.name}")` 
    await Querys.records(sql) 
    res.status(200);
    res.send('category create');
    }
    else{
    res.status(204);
    res.send('category has the same name that other,please change name'); 
    }
    } catch (error) {
    console.log(error)
    }
    }

exports.getCategory=async(req,res)=>{
//function that show all category
    try {
    const get=await Querys.records(`select*from category `)
    res.status(200);
    res.send(get);
    } catch (error) {
    console.log(error)
    res.status(204);
    res.send('there is an error,please try again')
    }
    }

