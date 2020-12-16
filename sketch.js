//Create variables here
var  dog, happyDog, database, foodS, foodStock,dogImg1,dogImg2;
var feed,addFood,fedTime,lastFed,foodObj;
function preload()
{
  //load images here
  dogImg1=loadImage("images/dogImg.png")
  dogImg2=loadImage("images/dogImg1.png")
}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);
  
  dog=createSprite(250,250,20,20)
  dog.addImage(dogImg2)
  dog.scale=0.3
  foodObj=new Food()
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)
  feed=createButton("Feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)
  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
  lastFed=data.val()
})
}

function draw() {  
background(46,139,87);

foodObj.display()
  drawSprites();
  fill(255,255,255)
  textSize(15)
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM ",350,30)
  }else if(lastFed=0){
    text("Last Feed : 12 AM",350,30)
  }else {
    text("Last Feed : "+ lastFed + " AM ",350,30)
  }

}
function readStock(data){
foodS=data.val()
foodObj.updateFoodStock(foodS)
}



function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}
function feedDog(){
  dog.addImage(dogImg1)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
