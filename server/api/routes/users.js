const router = require('express').Router();
const { User, Task, Board, UserBoard} = require('../../database');

/*
User Table

"fname": String
"lname": String
"username": String
"password": String
"email": String
  is: Email
"image": String, Optional
"level": Integer, Optional
*/

/*******************************************************
 * Getting state of user table
********************************************************/

router.get('/', async(req, res, next) =>{
  try{
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch(error){
    console.log(error);
    console.log("Unable to get Users");
  }
});

router.put('/searchUsers', async(req,res,next) =>{
  try{
    //Search user by username
    const Allusers = await User.findOne({
      where: {username: req.body.username},
      attributes: ['id','fname','lname','username','image','level']
    });
    res.send(Allusers);
  }catch(error){
    console.log(error);
  }
});


router.get('/:userId', async(req,res,next) =>{
  try{

    const user = await User.findAll({
      where: {id: req.params.userId},
      attributes: ['id', 'fname', 'lname','image','level'],

      include: [{
        model: Board,
        as: 'boards',
        attributes: ["id", "name",'desc'],
        through: {attributes:[]}
      },{model:Task}],

    });

    console.log("Got User");
    res.send(user);

  } catch(error){
    console.log(error);
  }
});



/*******************************************************
 *  Manipulating the state of the user table
********************************************************/

router.post('/', async(req,res,next) => {
  try{
    const newUser = await User.create(req.body);
    res.send(newUser);
    console.log("User has been successfully created!");
  }catch(error){
    console.log(error);
  }
});

router.put('/:userId', async(req,res,next) =>{
  try{
    const updatedUser = await User.update(req.body, {where: {id: req.params.userId}});
    res.send(updatedUser);
    console.log(`User ${req.params.userId} updated!`);
  } catch(error){
    next(error);
  }
});

router.put('/:userId/add/:boardId', async(req,res,next) =>{
  try{
    const foundUser = await User.findOne({where: {id: req.params.userId}});
    const foundBoard = await Board.findOne({where: {id: req.params.boardId}});
    let smth = foundBoard.addUser(foundUser);
    res.send(smth);
    console.log(`User ${req.params.userId} added to ${req.params.boardId}!`);
  } catch(error){
    next(error);
  }
});

router.delete('/:userId', async(req,res,next) =>{
  try{

    await UserBoard.destroy({
      where:{
        userId: req.params.userId
      }
    });

    await Task.update({
          userId: null
    }, {where: {id: req.params.userId}});

    //In real life application, we would not delete this
    await User.destroy({
      where:{
        id: req.params.userId
      }
    })

    res.send("Have ended this user's life");
    console.log(`Successfully deleted User ${req.params.userId}`);
  } catch(error) {
    console.log(error);
  }
});

module.exports = router;